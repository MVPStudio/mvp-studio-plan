import { throttle, range } from 'lodash';
import config from '../config';
import socket from './socket';
import Phaser from './Phaser';

const width = 1182;
const height = 664;

const center = {x: width / 2, y: height / 2};

export default function startGame() {
  return new Phaser.Game({
    width, height,
    type: Phaser.AUTO,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 },
      },
    },
    scene: { preload, create },
  });
}

function preload() {
  this.load.setBaseURL(config.server);
  this.load.image('background', require('./assets/background-02.png'));
  this.load.image('log', require('./assets/log_small.png'));
  this.load.image('fire', require('./assets/fire.png'));
}

function create() {
  const game = this;
  const playerLogs = new Map();
  const logStartPosition = center;
  let currentPlayerId;
  let draggableLog;

  const background = game.add.image(center.x, center.y, 'background');
  const fire = game.add.image(325, 500, 'fire');

  socket.on('init', init);
  socket.on('moveLog', moveLog);
  socket.on('removePlayer', removePlayer);
  socket.on('destroyLog', destroyPlayerLog);
  socket.emit('ready');

  function init(state) {
    currentPlayerId = state.currentPlayerId;
    createDraggableLog();
  }

  function moveLog({ playerId, x, y }) {
    if(!playerLogs.has(playerId)) {
      playerLogs.set(playerId, createLog(playerId, x, y, false));
    }
    const log = playerLogs.get(playerId);
    log.x = log.sprite.x = x;
    log.y = log.sprite.y = y;
  }

  function removePlayer({ playerId }) {
    destroyPlayerLog({ playerId });
  }

  function remove(array, value) {
    const index = array.indexOf(value);
    if(index !== -1) {
      array.splice(index, 1);
    }
  }

  function createLog(playerId, startX, startY, draggable) {
    const sprite = game.add.image(startX, startY, 'log');
    const log = {
      playerId,
      sprite,
      x: startX,
      y: startY,
    };

    if(draggable) {
      sprite.setInteractive();

      sprite.on('drag', (pointer, x, y) => {
        sprite.x = log.x = x;
        sprite.y = log.y = y;
        socket.emit('moveLog', {x, y});
      });

      sprite.on('dragend', async (pointer, x, y) => {
        console.log(x, y, fire);
        if(isOverlapping(sprite, fire)) {
          socket.emit('feedFire');
          await burnLog(draggableLog);
          createDraggableLog();
        } else {
          socket.emit('destroyLog');
          sprite.x = log.x = startX;
          sprite.y = log.y = startY;
        }
      });

      game.input.setDraggable(sprite);
    }

    return log;
  }

  function burnLog(log) {
    return new Promise(resolve => {
      const duration = 300;
      game.tweens.add({
        targets: [log.sprite],
        x: fire.x,
        y: fire.y + (fire.height * 0.2),
        duration: 300,
        repeat: 1,
      });
      setTimeout(() => {
        destroyLog(log);
        resolve();
      }, 300);
    });
  }

  function otherPlayerFeedFire({ playerId }) {
    const log = playerLogs.get(playerId);
    if(log) burnLog(log);
  }

  function destroyPlayerLog({ playerId }) {
    destroyLog(playerLogs.get(playerId));
  }

  function destroyLog(log) {
    if(log) {
      log.sprite.destroy();
      playerLogs.delete(log.playerId);
    }
  }

  function isOverlapping(spriteA, spriteB) {
    const topLeft = {
      x: spriteB.x - (spriteB.width / 2),
      y: spriteB.y - (spriteB.height / 2),
    };
    return spriteA.x >= topLeft.x &&
      spriteA.y >= topLeft.y &&
      spriteA.x < (topLeft.x + spriteB.width) &&
      spriteA.y < (topLeft.y + spriteB.height);
  }

  function createDraggableLog() {
    draggableLog = createLog(currentPlayerId, logStartPosition.x, logStartPosition.y, true)
  }
}

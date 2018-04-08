const nanoid = require('nanoid');

const maxFireLevel = 20;
const minFireLevel = 1;
const foxCooldown = 5000;
let foxVisible = false;
let lastFoxAppearence;
let fireTimeout = null;
let fireLevel = 1;

module.exports = function startGameServer(io) {
  io.on('connection', socket => onConnect(socket, io));
};

function onConnect(socket, io) {
  const player = {
    id: nanoid(),
    x: Math.random() * 800,
    y: Math.random() * 600,
  };
  const playerId = player.id;

  socket.on('ready', () => {
    socket.emit('init', {
      yourId: player.id,
      fireLevel,
      foxVisible,
    });
    socket.broadcast.emit('addPlayer', player);
  });

  socket.on('feedFire', () => {
    if(fireLevel < maxFireLevel) {
      fireLevel += 1;
      io.emit('fireLevel', { fireLevel });
      resetFireTimer();
    }
  });

  socket.on('grabLog', log => socket.broadcast.emit('grabLog', log));
  socket.on('moveLog', log => socket.broadcast.emit('moveLog', log));
  socket.on('dropLog', log => socket.broadcast.emit('dropLog', log));

  socket.on('grabStick', stick => socket.broadcast.emit('grabStick', stick));
  socket.on('moveStick', stick => socket.broadcast.emit('moveStick', stick));
  socket.on('dropStick', stick => socket.broadcast.emit('dropStick', stick));
  socket.on('cook', stick => {
    socket.broadcast.emit('cook', stick);
    if(stick.cookLevel === 3) {
      const now = Date.now();
      if(!foxVisible && (!lastFoxAppearence || now - lastFoxAppearence >= foxCooldown)) {
        console.log('showingFox');
        foxVisible = true;
        lastFoxAppearence = now;
        io.emit('showFox', {
          message: 'That looks tasty!',
        });
      }
    }
  });

  socket.on('feedFox', stick => {
    if(foxVisible) {
      console.log('Feeding fox');
      foxVisible = false;
      lastFoxAppearence = Date.now();
      io.emit('foxFed');
    }
  });

  socket.on('disconnect', () => {});

  function resetFireTimer() {
    if(fireTimeout) clearTimeout(fireTimeout);
    fireTimeout = setTimeout(() => {
      if(fireLevel > 1) {
        fireLevel -= 1;
        io.emit('fireLevel', { fireLevel });
        resetFireTimer();
      }
    }, 10000);
  }
}

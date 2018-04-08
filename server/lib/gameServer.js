const nanoid = require('nanoid');

module.exports = function startGameServer(io) {
  io.on('connection', socket => onConnect(socket, io));
};

function onConnect(socket, io) {
  const maxFireLevel = 20;
  const minFireLevel = 1;
  let fireLevel = 1;

  const player = {
    id: nanoid(),
    x: Math.random() * 800,
    y: Math.random() * 600,
  };
  const playerId = player.id;

  socket.on('ready', () => {
    socket.emit('init', {
      yourId: player.id,
      fireLevel
    });
    socket.broadcast.emit('addPlayer', player);
  });

  socket.on('feedFire', () => {
    if(fireLevel < maxFireLevel) {
      fireLevel += 1;
      io.emit('fireLevel', { fireLevel });
    }
  });

  socket.on('grabLog', log => socket.broadcast.emit('grabLog', log));
  socket.on('moveLog', log => socket.broadcast.emit('moveLog', log));
  socket.on('dropLog', log => socket.broadcast.emit('dropLog', log));

  socket.on('grabStick', stick => socket.broadcast.emit('grabStick', stick));
  socket.on('moveStick', stick => socket.broadcast.emit('moveStick', stick));
  socket.on('dropStick', stick => socket.broadcast.emit('dropStick', stick));
  socket.on('cook', stick => socket.broadcast.emit('cook', stick));

  socket.on('disconnect', () => {

  });

  setInterval(() => {
    if(fireLevel > minFireLevel) {
      fireLevel -= 1;
      io.emit('fireLevel', { fireLevel });
    }
  }, 10000);
}

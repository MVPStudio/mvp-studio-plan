const Loki = require('lokijs');
const nanoid = require('nanoid');

module.exports = function startGameServer(io) {
  const db = new Loki();
  const players = db.addCollection('players');

  io.on('connection', socket => {
    const player = {
      id: nanoid(),
      x: Math.random() * 800,
      y: Math.random() * 600,
    };
    const playerId = player.id;
    players.insert(player);

    socket.on('ready', () => {
      socket.emit('init', {
        yourId: player.id,
        players: players.find(),
      });
      socket.broadcast.emit('addPlayer', player);
    });

    socket.on('moveLog', ({x, y}) => {
      socket.broadcast.emit('moveLog', {
        playerId,
        x, y,
      });
    });

    socket.on('destroyLog', () => {
      console.log('destroyLog', playerId);
      socket.broadcast.emit('destroyLog', { playerId });
    });

    socket.on('disconnect', () => {
      players.findAndRemove({id: playerId});
      socket.broadcast.emit('removePlayer', { playerId });
    });
  });
};

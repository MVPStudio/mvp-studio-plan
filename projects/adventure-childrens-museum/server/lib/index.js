const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const nanoid = require('nanoid');
const port = 8080;

app.use(require('cors')());
app.use(express.static('public'));

require('./gameServer')(io);

http.listen(port, error => {
  console.log(error || `listening on *:${port}`);
});

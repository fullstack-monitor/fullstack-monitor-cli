const express = require('express');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

module.exports = {
  serverPort: 3861,
  app,
  http,
  io
};

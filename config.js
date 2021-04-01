const express = require('express');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*'
  }
});
const { serverPort } = require('./configConstants');

module.exports = {
  serverPort,
  app,
  http,
  io
};

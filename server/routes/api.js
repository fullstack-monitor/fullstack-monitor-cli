const express = require('express');
const { io } = require('../../config');

const loggerController = require('../controllers/loggerController');

const router = express.Router();

const webSocketMiddleware = (req, res, next) => {
  io.emit('chat message', res.locals.logs);
  next();
};

// route to retrieve all logs
router.get('/logs',
  loggerController.getLogs,
  (req, res) => res.status(200).json(res.locals.logs));

// route to post all types of logs: client, sever, requests
router.post('/logs/:type',
  loggerController.checkLogFile,
  loggerController.addLogs,
  loggerController.getLogs,
  webSocketMiddleware,
  (req, res) => res.status(200).json(`Added ${req.params}logs`));

// route to delete logs
router.delete('/logs/delete',
  loggerController.deleteLogs,
  (req, res) => res.status(200).json('deleted Request.json'));

module.exports = router;

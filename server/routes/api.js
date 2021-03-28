const express = require('express');
const { io } = require('../../config');

const loggerController = require('../controllers/loggerController');

const router = express.Router();

const webSocketMiddleware = (req, res, next) => {
  io.emit('chat message', res.locals.logs);
  next();
};

router.get('/logs',
  loggerController.getLogs,
  (req, res) => res.status(200).json(res.locals.logs));

router.post('/logs/:type',
  loggerController.addLogs,
  loggerController.getLogs,
  webSocketMiddleware,
  (req, res) => res.status(200).json(`Added ${req.params.type} logs`));

router.post('/requests',
  loggerController.addRequests,
  loggerController.getLogs,
  webSocketMiddleware,
  (req, res) => res.status(200).json('Requests added!'));

module.exports = router;

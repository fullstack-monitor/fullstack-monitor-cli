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

// route to retrieve specific log type
router.get('/logs/:type',
  loggerController.getSpecificLog,
  (req, res) => res.status(200).json(res.locals.logs));

// route to post console log coming from client and sever type
router.post('/logs/:type',
  loggerController.checkLogFiles,
  loggerController.addLogs,
  loggerController.getLogs,
  webSocketMiddleware,
  (req, res) => res.status(200).json(`Added ${req.params.type} logs`));

// route to post request/respond data
router.post('/requests',
  loggerController.checkRequestFile,
  loggerController.addRequests,
  loggerController.getLogs,
  webSocketMiddleware,
  (req, res) => res.status(200).json('Requests added!'));

// route to delete logs
router.delete('/logs/delete',
  loggerController.deleteLogs,
  (req, res) => res.status(200).json('deleted Request.json'));

module.exports = router;

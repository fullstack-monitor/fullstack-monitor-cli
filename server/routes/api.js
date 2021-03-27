const express = require('express');
const { io } = require('../index');

const loggerController = require('../controllers/loggerController');

const router = express.Router();

const webSocketMiddleware = () => {
  io.emit('chat message', 'sending databack');
};

router.get('/logs',
  loggerController.getLogs,
  (req, res) => res.status(200).json(res.locals.logs));

router.post('/logs/:type',
  loggerController.addLogs,
  (req, res) => res.status(200).json(`Added ${req.params.type} logs`));

router.post('/requests',
  loggerController.addRequests,
  (req, res) => res.status(200).json('Requests added!'));

module.exports = router;

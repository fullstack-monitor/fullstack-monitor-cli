const express = require('express');

const loggerController = require('../controllers/loggerController');

const router = express.Router();

router.get('/logs',
  loggerController.getLogs,
  (req, res) => res.status(200).json(res.locals.logs));

router.get('/:type',
  loggerController.getSingleRequest,
  (req, res) => res.status(200).json(res.locals.logs));

router.post('/logs/:type',
  loggerController.addLogs,
  (req, res) => res.status(200).json(`Added ${req.params.type} logs`));

router.post('/requests',
  loggerController.addRequests,
  (req, res) => res.status(200).json('Requests added!'));

module.exports = router;

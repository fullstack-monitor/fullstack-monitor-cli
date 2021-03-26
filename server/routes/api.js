const express = require('express');

const loggerController = require('../controllers/loggerController');

const router = express.Router();

router.get('/',
  loggerController.getLogs,
  (req, res) => res.status(200).json(res.locals.logs));

module.exports = router;

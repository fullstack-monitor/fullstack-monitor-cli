const express = require('express');
const { io } = require('../../config');

const loggerController = require('../controllers/loggerController');

const router = express.Router();

// route to delete logs
router.delete('/logs/delete',
  loggerController.deleteLogs,
  (req, res) => res.status(200).json('deleted Request.json'));

module.exports = router;

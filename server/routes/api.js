const express = require('express');
const path = require('path');


const exampleController = require('../controllers/exampleController');

const router = express.Router();


router.get('/',
  exampleController.getExample,    
  (req,res) => res.status(200).json('hello world')
);

module.exports = router;
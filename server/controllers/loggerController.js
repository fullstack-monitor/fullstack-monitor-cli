const fs = require('fs');
const path = require('path');
const { getAllLogs, storeLogs } = require('../helpers/helpers');

let data;

const loggerController = {};

// middleware to delete json files
loggerController.deleteLogs = (req, res, next) => {
  fs.writeFileSync(path.resolve(__dirname, '../data/allLogs.json'), JSON.stringify([]), 'utf8');
  return next();
};

// middleware to check alllLogs.json file is existed
loggerController.checkLogFile = (req, res, next) => {
  // check the file already exist
  fs.access(path.resolve(__dirname, '../data/allLogs.json'), (err) => {
    // if there's error write the file
    if (err) {
      fs.writeFileSync(path.resolve(__dirname, '../data/allLogs.json'), JSON.stringify([]), 'utf8');
      return next();
    }

    // if there's no error
    return next();
  });
};

module.exports = loggerController;

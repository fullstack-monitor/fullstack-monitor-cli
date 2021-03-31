const fs = require('fs');
const path = require('path');
const { getAllLogs, storeLogs } = require('../helpers/helpers');

let data;

const loggerController = {};

// middleware to get all type of logs
loggerController.getLogs = async (req, res, next) => {
  // read all logs from saved files
  const logs = await getAllLogs();

  if (!logs) {
    return next({
      log: 'loggerController.getLogs:  ERROR: Error getting logs data from allLogs.json file',
      message: { err: 'Error occurred in loggerController.getLogs. Check server logs for more details.' },
    });
  }

  // assign logs into res.locals.logs
  res.locals.logs = { allLogs: logs };

  return next();
};

// middleware to add client and server console log to files
loggerController.addLogs = (req, res, next) => {
  // assign incoming req.body to logs variable
  const logs = req.body;

  storeLogs(logs);
  return next();
};

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

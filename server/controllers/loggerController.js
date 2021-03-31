const fs = require('fs');
const path = require('path');

let data;

const loggerController = {};

// middleware to get all type of logs
loggerController.getLogs = async (req, res, next) => {
  // read all logs from saved files
  const logs = await JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/allLogs.json'), 'utf8'));

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

  // error handling for if there's no data in req.body
  if (!logs) {
    return next({
      log: 'loggerController.addSeverLogs:  ERROR: Error receiving  data from Application',
      message: { err: 'Error occurred in loggerController.addLogs. Check server logs for more details.' },
    });
  }

  // error handling just in case json file reset
  try {
    // eslint-disable-next-line global-require
    data = require('../data/allLogs.json');
  } catch (e) {
    data = [];
  }

  // check if incoming logs are in array format
  if (Array.isArray(logs)) {
    // push individual array element into existing data
    logs.forEach((log) => data.push(log));
  } else {
  // if incoming logs are not in array format, push directly into existing data
    data.push(logs);
  }

  // write data that holds existing requests and new request to request.json
  fs.writeFileSync(path.resolve(__dirname, '../data/allLogs.json'), JSON.stringify(data, null, 2), 'utf8');
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

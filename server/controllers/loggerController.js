const fs = require('fs');
const path = require('path');

const loggerController = {};

// middleware to get all type of logs
loggerController.getLogs = (req, res, next) => {
  // read all logs from saved files
  // eslint-disable-next-line global-require
  const logs = require('../data/allLogs.json');

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

// middleware to get spefic type of log
loggerController.getSpecificLog = (req, res, next) => {
  const { type } = req.params;
  console.log(req.params.type);
  let logFile = {};
  res.locals.logs = [];

  // if type is client or server
  if (type === 'server' || type === 'client') {
    // read log file and assigned to logFile
    logFile = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../data/${type}Logs.json`), 'UTF-8'));
    console.log(logFile);
    // error handling
    if (!logFile) {
      return next({
        log: `loggerController.getLogs:  ERROR: Error getting logs data from ${type}Logs.json and/or serverLog.json file`,
        message: { err: 'Error occurred in loggerController.getSpecificLog. Check server logs for more details.' },
      });
    }

    // for client/server , filter logs for each key/values pair and push into the res.locals.log
    logFile.filter((el) => res.locals.logs.push({
      class: `${type}`,
      type: el.type,
      timestamp: el.timestamp,
      log: el.arguments[0],
    }));
  }

  // if type is request or respond
  if (type === 'respond' || type === 'request') {
    // read log file and assigned to logFile
    logFile = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../data/request.json`), 'UTF-8'));

    // error handling
    if (!logFile) {
      return next({
        log: `loggerController.getLogs:  ERROR: Error getting logs data from ${type}Logs.json and/or serverLog.json file`,
        message: { err: 'Error occurred in loggerController.getSpecificLog. Check server logs for more details.' },
      });
    }

    if (type === 'request') {
      // for request type, filter logs for each key/values pair and push into the res.locals.log
      logFile.filter((el) => res.locals.logs.push({
        class: `${type}`,
        timestamp: el.timestamp,
        method: el.method,
        originalUri: el.originalUri,
        uri: el.uri,
        requestData: el.requestData,
        referer: el.referer,
      }));
    } else {
      // for response type, filter logs for each key/values pair and push into the res.locals.log
      logFile.filter((el) => res.locals.logs.push({
        class: `${type}`,
        timestamp: el.timestamp,
        fromIP: el.fromIP,
        responseData: el.responseData,
        responseStatus: el.responseStatus,
      }));
    }
  }

  return next();
};

// middleware to add client and server console log to files
loggerController.addLogs = (req, res, next) => {
  // assign request type from req.params to type
  console.log(req.params);
  const { type } = req.params;

  // assign incoming req.body to logs variable
  const logs = req.body;

  // error handling for if there's no data in req.body
  if (!logs) {
    return next({
      log: `loggerController.addSeverLogs:  ERROR: Error receiving  ${type} data from Application`,
      message: { err: 'Error occurred in loggerController.addLogs. Check server logs for more details.' },
    });
  }

  // read the existing request_respose json file
  // eslint-disable-next-line global-require
  const data = require('../data/allLogs.json');

  // push new requests into data
  data.push(logs);

  // write data that holds existing requests and new request to request.json
  fs.writeFileSync(path.resolve(__dirname, '../data/allLogs.json'), JSON.stringify(data, null, 2), 'UTF-8');

  return next();
};

// middleware to delete json files
loggerController.deleteLogs = (req, res, next) => {
  fs.writeFileSync(path.resolve(__dirname, '../data/allLogs.json'), JSON.stringify([]), 'UTF-8');
  return next();
};

// middleware to check client/serverLogs.json files are existed
loggerController.checkLogFiles = (req, res, next) => {
  const { type } = req.params;

  // check the file already exist
  fs.access(path.resolve(__dirname, '../data/allLogs.json'), (err) => {
    // if there's error write the file
    if (err) {
      fs.writeFileSync(path.resolve(__dirname, `../data/${type}Logs.json`), JSON.stringify([]), 'UTF-8');
      return next();
    }

    // if there's no error
    return next();
  });
};

// middleware to check request.json file is existed
loggerController.checkRequestFile = (req, res, next) => {
  // check the file already exist
  fs.access(path.resolve(__dirname, '../data/request.json'), (err) => {
    // if there's error write the file
    if (err) {
      fs.writeFileSync(path.resolve(__dirname, '../data/request.json'), JSON.stringify([]), 'UTF-8');
      return next();
    }

    // if there's no error
    return next();
  });
};

module.exports = loggerController;

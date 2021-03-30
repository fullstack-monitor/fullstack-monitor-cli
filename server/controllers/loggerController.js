const fs = require('fs');
const path = require('path');

const loggerController = {};

// middleware to get all type of logs
loggerController.getLogs = (req, res, next) => {
  // read all logs from saved files
  const clientLogs = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/clientLogs.json'), 'UTF-8'));
  const serverLogs = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/serverLogs.json'), 'UTF-8'));
  const requests = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/request.json'), 'UTF-8'));

  if (!clientLogs || !serverLogs) {
    return next({
      log: 'loggerController.getLogs:  ERROR: Error getting logs data from clientLogs.json and/or serverLog.json file',
      message: { err: 'Error occurred in loggerController.getLogs. Check server logs for more details.' },
    });
  }

  res.locals.logs = {
    allLogs: []
  };

  clientLogs.filter((el) => res.locals.logs.allLogs.push({
    class: 'client',
    type: el.type,
    timestamp: el.timestamp,
    log: el.arguments[0],
  }));

  serverLogs.filter((el) => res.locals.logs.allLogs.push({
    class: 'server',
    type: el.type,
    timestamp: el.timestamp,
    log: el.arguments[0],
  }));

  requests.filter((el) => res.locals.logs.allLogs.push({
    class: 'request',
    timestamp: el.timestamp,
    method: el.method,
    originalUri: el.originalUri,
    uri: el.uri,
    requestData: el.requestData,
    referer: el.referer,
  }));

  requests.filter((el) => res.locals.logs.allLogs.push({
    class: 'response',
    timestamp: el.timestamp,
    fromIP: el.fromIP,
    responseData: el.responseData,
    responseStatus: el.responseStatus,
  }));

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
  const { type } = req.params;

  // assign incoming req.body to logs variable
  const logs = req.body;

  // create an emtpy object to hold all the existing json elements
  let obj = {
    table: [],
  };

  // error handling for if there's no data in req.body
  if (!logs) {
    return next({
      log: 'loggerController.addSeverLogs:  ERROR: Error receiving severLogs data from Application',
      message: { err: 'Error occurred in loggerController.addSeverLogs. Check server logs for more details.' },
    });
  }

  // read the existing logs from  json file
  fs.readFile(path.resolve(__dirname, `../data/${type}Logs.json`), 'utf-8', (err, data) => {
    // error handling for reading  the existing file
    if (err) {
      obj = [];
    } else {
      // save all the existing data to exmpty obj
      obj = JSON.parse(data);
    }

    // push the new incoming request data to obj
    obj.push(logs);

    // write object obj that hold all existing data and new requests to request_response json file
    fs.writeFileSync(path.resolve(__dirname, `../data/${type}Logs.json`), JSON.stringify(obj, null, 2), 'UTF-8');
    return next();
  });
  return next();
};

// middleware to add request/respond logs to file
loggerController.addRequests = (req, res, next) => {
  // assign incoming req.body to request variable
  const requests = req.body;

  // create an emtpy object to hold all the existing json elements
  const obj = {
    table: [],
  };

  // if incoming request body is null value, return an error
  if (!requests) {
    return next({
      log: 'loggerController.addRequests: ERROR: Error receiving Requests data from Application',
      message: { err: 'Error occurred in loggerController.addRequests. Check server logs for more details.' },
    });
  }

  // read the existing request_respose json file
  // eslint-disable-next-line global-require
  const data = require('../data/request.json');

  // push new requests into data
  data.push(requests);

  // write data that holds existing requests and new request to request.json
  fs.writeFileSync(path.resolve(__dirname, '../data/request.json'), JSON.stringify(data, null, 2), 'UTF-8');
  return next();
};

// middleware to delete json files
loggerController.deleteLogs = (req, res, next) => {
  fs.writeFileSync(path.resolve(__dirname, '../data/request.json'), JSON.stringify([]), 'UTF-8');
  fs.writeFileSync(path.resolve(__dirname, '../data/serverLogs.json'), JSON.stringify([]), 'UTF-8');
  fs.writeFileSync(path.resolve(__dirname, '../data/clientLogs.json'), JSON.stringify([]), 'UTF-8');
  return next();
};

// middleware to check client/serverLogs.json files are existed
loggerController.checkLogFiles = (req, res, next) => {
  const { type } = req.params;

  // check the file already exist
  fs.access(path.resolve(__dirname, `../data/${type}Logs.json`), (err) => {
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

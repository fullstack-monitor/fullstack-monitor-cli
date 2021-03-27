const fs = require('fs');
const path = require('path');

const loggerController = {};

loggerController.getLogs = (req, res, next) => {
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
    fromIP: el.fromIP,
    responseData: el.responseData,
    responseStatus: el.responseStatus,
  }));

  return next();
};

loggerController.addLogs = (req, res, next) => {
  const { type } = req.params;
  const logs = req.body;
  let obj = {
    table: [],
  };
  if (!logs) {
    return next({
      log: 'loggerController.addSeverLogs:  ERROR: Error receiving severLogs data from Application',
      message: { err: 'Error occurred in loggerController.addSeverLogs. Check server logs for more details.' },
    });
  }
  fs.readFile(path.resolve(__dirname, `../data/${type}Logs.json`), 'utf8', (err, data) => {
    if (err) {
      return next({
        log: 'loggerController.addSeverLogs:  ERROR: Error reading existing severLogs data from serverLogs.json file',
        message: { err: 'Error occurred in loggerController.addSeverLogs. Check server logs for more details.' },
      });
    }
    obj = JSON.parse(data);
    obj.push(logs);
    fs.writeFileSync(path.resolve(__dirname, `../data/${type}Logs.json`), JSON.stringify(obj), 'UTF-8');
    return next();
  });
  return next();
};

loggerController.addRequests = (req, res, next) => {
  // assign incoming req.body to request variable
  const requests = req.body;

  // create an emtpy object to hold all the existing json elements
  let obj = {
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
  fs.readFile(path.resolve(__dirname, '../data/request.json'), 'utf8', (err, data) => {
    if (err) {
      return next({
        log: 'loggerController.addSeverLogs: ERROR: Error reading existing severLogs data from serverLogs.json file',
        message: { err: 'Error occurred in loggerController.addSeverLogs. Check server logs for more details.' },
      });
    }

    // save all the existing data to exmpty obj
    obj = JSON.parse(data);

    // push the new incoming request data to obj
    obj.push(requests);

    // write object obj that hold all existing data and new requests to request_response json file
    fs.writeFileSync(path.resolve(__dirname, '../data/request.json'), JSON.stringify(obj), 'UTF-8');
    return next();
  });
  return next();
};
module.exports = loggerController;

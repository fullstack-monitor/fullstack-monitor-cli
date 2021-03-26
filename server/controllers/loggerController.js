const fs = require('fs');
const path = require('path');

const loggerController = {};

loggerController.getLogs = (req, res, next) => {
  const clientLogs = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/clientLogs.json'), 'UTF-8'));
  const serverLogs = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/serverLogs.json'), 'UTF-8'));

  if (!clientLogs || !serverLogs) {
    return next({
      log: 'loggerController.getLogs:  ERROR: Error getting logs data from clientLogs.json and/or serverLog.json file',
      message: { err: 'Error occurred in loggerController.getLogs. Check server logs for more details.' },
    });
  }

  res.locals.logs = { serverLogs: [], clientLogs: [] };

  clientLogs.filter((el) => res.locals.logs.clientLogs.push({
    type: el.type,
    timestamp: el.timestamp,
    log: el.arguments[0],
  }));

  serverLogs.filter((el) => res.locals.logs.serverLogs.push({
    type: el.type,
    timestamp: el.timestamp,
    log: el.arguments[0],
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

module.exports = loggerController;

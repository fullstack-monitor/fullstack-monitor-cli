const fs = require('fs');
const path = require('path');

const loggerController = {};

loggerController.getLogs = (req, res, next) => {
  const logs = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/logs.json'), 'UTF-8'));

  if (!logs) {
    return next({
      log: 'loggerController.getLogs:  ERROR: Error getting logs data from log.json file',
      message: { err: 'Error occurred in loggerController.getLogs. Check server logs for more details.' },
    });
  }

  res.locals.logs = [];

  logs.filter((el) => res.locals.logs.push({
    type: el.type, log: el.arguments[0], timestamp: el.timestamp,
  }));

  return next();
};

module.exports = loggerController;

const { getAllLogs, storeLogs, deleteLogs } = require('../helpers/helpers');
const { io } = require("../../config");

const loggerController = {};

loggerController.getAllLogs = async () => {
  // Get all the logs
  const data = { allLogs: await getAllLogs() };
  // Send them to the FE
  io.emit('display-logs', data);
};

loggerController.storeLogs = async (logs) => {
  // Store the new logs
  const data = { allLogs: await storeLogs(logs) };
  // Send the new logs to the FE
  io.emit('display-logs', data);
  // Send the new logs to the cmd app
  io.emit('print-logs', logs);
  // Let users project know logs have been successfully stored
  io.emit('store-logs', 'success');
};

loggerController.deleteLogs = async () => {
  // Delete the logs
  const data = { allLogs: await deleteLogs() };
  // Update the FE accordingly
  io.emit('display-logs', data);
};

module.exports = loggerController;

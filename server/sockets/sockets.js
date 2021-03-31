const {
  serverPort, app, http, io,
} = require("../../config");
const { getAllLogs, storeLogs, deleteLogs } = require('../helpers/helpers');

function handleSockets() {
  io.on("connection", (socket) => {
    console.log("connected");

    // Send logs to FE on initial page load
    socket.on('get initial logs', async () => {
      // Get the logs
      const data = { allLogs: await getAllLogs() };
      // Send them to the FE
      io.emit('display-logs', data);
    });

    // Store logs
    socket.on('store-logs', async (logs) => {
      // Store the new logs
      const data = { allLogs: await storeLogs(logs) };
      // Send the new logs to the FE
      io.emit('display-logs', data);
      // Let users project know logs have been stored
      io.emit('store-logs', 'success');
    });

    // Delete logs
    socket.on('delete-logs', async () => {
      // Delete the logs
      const data = { allLogs: await deleteLogs() };
      // Update the FE accordingly
      io.emit('display-logs', data);
    });
  });
}

module.exports = { handleSockets };

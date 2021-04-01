const { io } = require("../../config");
const loggerController = require('../controllers/loggerController');

function socketRouter() {
  // Setup socket routes on initial connection with client
  io.on("connection", (socket) => {
    // Send logs to FE on first page load
    socket.on('get-initial-logs', loggerController.getAllLogs);

    // Store logs
    socket.on('store-logs', loggerController.storeLogs);

    // Delete logs
    socket.on('delete-logs', loggerController.deleteLogs);
  });
}

module.exports = socketRouter;

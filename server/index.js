/* eslint-disable import/order */
const express = require("express");
const path = require("path");
const cors = require('cors');
const socketRouter = require('./routes/api');

const {
  serverPort, app, http,
} = require("../config");

const port = process.env.port || serverPort;

// Setup sockets router
socketRouter();

app.use(express.json());

const DIST_DIR = path.join(__dirname, "../dist"); // NEW
const HTML_FILE = path.join(DIST_DIR, "index.html"); // NEW

// // statically serve everything in the dist folder on the route '/dist'
app.use(express.static(DIST_DIR)); // NEW
app.use(cors());

// serve index.html on the route '/'
app.get("/", (req, res) => res.status(200).sendFile(HTML_FILE));

// global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = { ...defaultErr, ...err };
  return res.status(errorObj.status).json(errorObj.message);
});

// listens on port -> http://localhost:${port}/
http.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port: ${port}`);
});

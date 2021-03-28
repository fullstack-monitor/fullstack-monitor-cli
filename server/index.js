/* eslint-disable import/order */
const express = require("express");
const path = require("path");
const cors = require('cors');

const {
  serverPort, app, http, io,
} = require("../config");

const apiRouter = require("./routes/api");

const port = process.env.port || serverPort;

app.use(express.json());

const DIST_DIR = path.join(__dirname, "../dist"); // NEW
const HTML_FILE = path.join(DIST_DIR, "index.html"); // NEW

// // statically serve everything in the build folder on the route '/build'
// // app.use('/build', express.static(path.join(__dirname, '../build')));
// app.use('/build', express.static(path.join(__dirname, DIST_DIR)));
app.use(express.static(DIST_DIR)); // NEW
app.use(cors());

app.use("/api", apiRouter);

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

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("chat message", (msg) => {
    console.log("received from client: ", msg);
    // io.emit('chat message', msg);
    // io.emit("chat message", "hi from server");
  });
});

// listens on port 3000 -> http://localhost:3000/
http.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port: ${port}`);
});

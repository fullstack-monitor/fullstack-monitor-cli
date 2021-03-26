const express = require('express');
const path = require('path');
const apiRouter = require('./routes/api');

const app = express();
const port = process.env.port || 5555;

app.use(express.json());

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

app.use('/api', apiRouter);

// serve index.html on the route '/'
app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../index.html')));

// global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  return res.status(errorObj.status).json(errorObj.message);
});

// listens on port 3000 -> http://localhost:3000/
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port: ${port}`);
});

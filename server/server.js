const express = require('express');
const app = express();
const path = require('path');
// const port = process.env.port || 3000;
const port = process.env.port || 5555;
const apiRouter = require('./routes/api');


app.use(express.json());



// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

app.use('/api', apiRouter);


// serve index.html on the route '/'
// if (process.env.NODE_ENV === 'production') {
app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../index.html')));

/* GET React App */
// app.use(function(req, res, next) {
//   res.sendFile(path.join(__dirname, '../index.html'));
//  });

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
}); //listens on port 3000 -> http://localhost:3000/


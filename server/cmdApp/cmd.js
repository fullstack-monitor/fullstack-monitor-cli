const readline = require('readline');

const client = require('socket.io-client');
const { serverPort } = require('../../configConstants');

const socket = client.connect(`http://localhost:${serverPort}/`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

socket.on('print-logs', (data) => {
  if (Array.isArray(data)) {
    console.log(data[0].class);
    console.log(data[1].class);
  } else {
    console.log(data.log);
  }
});

rl.on('line', (line) => {
  if (line === 'exit') process.exit();
});

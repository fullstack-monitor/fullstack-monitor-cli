const readline = require("readline");
const ansi = require("ansi");

const client = require("socket.io-client");
const { serverPort } = require("../../configConstants");

const cursor = ansi(process.stdout);

const socket = client.connect(`http://localhost:${serverPort}/`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

socket.on("print-logs", (data) => {
  if (Array.isArray(data)) {
    if (data[0]) {
      const {
        method,
        timestamp,
        class: classType,
        originalUri,
        requestData,
        fromIP
      } = data[0];

      cursor.fg
        .green()
        .underline()
        .write(`[${timestamp}]`)
        .resetUnderline()
        .write(" \n")
        .write(`${capitalize(classType)}: `)
        .bold()
        .write(`${method} `)
        .resetBold()
        .write(" \n")
        .write(`Route: `)
        .bold()
        .write(`${originalUri} `)
        .resetBold()
        .write(" \n")
        .write(`Response Data: `)
        .bold()
        .write(`${requestData || 'none'}`)
        .resetBold()
        .write(" \n")
        .write(`From IP: `)
        .bold()
        .write(`${fromIP} `)
        .resetBold()
        .write(" \n")
        .fg.reset();
    }

    if (data[1]) {
      const {
        responseData,
        timestamp,
        class: classType,
        responseStatus,
        referer
      } = data[1];

      cursor.fg
        .brightMagenta()
        .underline()
        .write(`[${timestamp}]`)
        .resetUnderline()
        .write(" \n")
        .write(`${capitalize(classType)}: `)
        .bold()
        .write(`${responseStatus} `)
        .resetBold()
        .write(" \n")
        .write(`Referer: `)
        .bold()
        .write(`${referer} `)
        .resetBold()
        .write(" \n")
        .write(`Response Data: `)
        .bold()
        .write(`${responseData || 'none'}`)
        .resetBold()
        .write(" \n")
        .fg.reset();
    }
  } else {
    // cursor.fg
    //   .brightMagenta()
    //   .underline()
    //   .write(`[${timestamp}]`)
    //   .resetUnderline()
    //   .write(`: ${capitalize(classType)}: `)
    //   .bold()
    //   .write(`${responseStatus} `)
    //   .resetBold()
    //   .write(" \n")
    //   .write(`Referer: `)
    //   .write(`${referer} `)
    //   .write(" \n")
    //   .write(`Response Data: `)
    //   .bold()
    //   .write(`${responseData}`)
    //   .resetBold()
    //   .write(" \n")
    //   .fg.reset();
    console.log(data.log);
  }
});

rl.on("line", (line) => {
  if (line === "exit") process.exit();
});

#!/usr/bin/env node

const args = process.argv.slice(2);

if (args[0] === '--listen') {
  const cmdApp = require('../Server/cmdApp/cmd');
} else {
  const server = require('../Server/index');
}

// pkill -f fullstack-monitor-cli

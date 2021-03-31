const fs = require('fs');
const path = require('path');

async function getAllLogs() {
  const logs = await JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/allLogs.json'), 'utf8'));
  if (!logs) throw Error('./server/helpers/helpers: getAllLogs: No logs found.');
  return logs;
}

module.exports = { getAllLogs };

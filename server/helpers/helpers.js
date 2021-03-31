const fs = require('fs');
const path = require('path');

async function getAllLogs() {
  const logs = await JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/allLogs.json'), 'utf8'));
  if (!logs) throw Error('./server/helpers/helpers: getAllLogs: No logs found.');
  return logs;
}

async function storeLogs(logs) {
  let data;

  try {
    data = await getAllLogs();
  } catch (e) {
    data = [];
  }

  if (!logs) throw Error('./server/helpers/helpers: storeLogs: No logs found.');

  // check if incoming logs are in array format
  if (Array.isArray(logs)) {
    // push individual array element into existing data
    logs.forEach((log) => data.push(log));
  } else {
  // if incoming logs are not in array format, push directly into existing data
    data.push(logs);
  }

  // write data that holds existing requests and new request to request.json
  fs.writeFileSync(path.resolve(__dirname, '../data/allLogs.json'), JSON.stringify(data, null, 2), 'utf8');

  return data;
}

module.exports = { getAllLogs, storeLogs };

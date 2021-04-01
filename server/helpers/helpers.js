const fs = require("fs");
const path = require("path");

// set the current file limit to split
// 1000 for 1k byte
const FILE_LIMIT = 10000000; // 10MB
const STARTING_NUM = 100;

const helpers = {};

const getHeadFileNum = async () => {
  const num = await fs.readFileSync(path.resolve(__dirname, "../data/headFileNum.json"), "utf8");
  return num;
};

const updateHeadFileNum = async (num) => {
  fs.writeFileSync(path.resolve(__dirname, '../data/headFileNum.json'), JSON.parse(num), 'utf8');
};

const incrementFileNum = async () => {
  const currentFileNum = await getHeadFileNum();
  updateHeadFileNum(parseInt(currentFileNum, 10) + 1);
};

helpers.getFileSize = async () => {
  // get the current size of the file and save in res.locals.stats
  const fileStats = await fs.statSync(path.resolve(__dirname, '../data/allLogs.json'));
  return fileStats.size;
};
// middlware to rename allLogs.json file to allLogs{fileTracker} format
helpers.splitFile = async (size) => {
  let fileSplit = false;
  const currentFileNum = await getHeadFileNum();
  // if the current file size is bigger than fileLimit value
  if (size > FILE_LIMIT) {
    // set the res.locals.fileSplit to true
    fileSplit = true;
    // rename the current allLogs.json file to allLogs{fileTracker} format
    await fs.rename(path.resolve(__dirname, '../data/allLogs.json'), path.resolve(__dirname, `../data/allLogs${currentFileNum}.json`), () => {
      console.log('new file created');
    });

    await fs.writeFileSync(path.resolve(__dirname, '../data/allLogs.json'), JSON.stringify([]), 'utf8');
    // increment the fileTracker by one
    incrementFileNum();
  }
  return fileSplit;
};

// middleware to delete all old logs
helpers.deleteOldLogs = async () => {
  const headFile = await getHeadFileNum();
  for (let i = STARTING_NUM; i < headFile; i++) {
    try {
      fs.unlinkSync(path.resolve(__dirname, `../data/allLogs${i}.json`));
    } catch (e) {
      console.log(e);
    }
  }
  updateHeadFileNum(STARTING_NUM);
};

helpers.getAllLogs = async () => {
  const logs = await JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/allLogs.json"), "utf8")
  );
  if (!logs) throw Error("./server/helpers/helpers: getAllLogs: No logs found.");
  return logs;
};

helpers.storeLogs = async (logs) => {
  // get the current size of allLogs.json file
  const fileSize = await helpers.getFileSize();

  // split the log file and return the fileFlag value
  await helpers.splitFile(fileSize);

  let data;

  try {
    data = await helpers.getAllLogs();
  } catch (e) {
    data = [];
  }

  if (!logs) throw Error("./server/helpers/helpers: storeLogs: No logs found.");

  // check if incoming logs are in array format
  if (Array.isArray(logs)) {
    // push individual array element into existing data
    logs.forEach((log) => data.push(log));
  } else {
    // if incoming logs are not in array format, push directly into existing data
    data.push(logs);
  }

  // write data that holds existing requests and new request to request.json
  fs.writeFileSync(
    path.resolve(__dirname, "../data/allLogs.json"),
    JSON.stringify(data, null, 2),
    "utf8"
  );

  return data;
};

helpers.deleteLogs = async () => {
  helpers.deleteOldLogs();
  const res = await fs.writeFileSync(
    path.resolve(__dirname, "../data/allLogs.json"),
    JSON.stringify([]),
    "utf8"
  );
  return [];
};

helpers.checkLogFile = async () => {
  fs.access(path.resolve(__dirname, "../data/allLogs.json"), (err) => {
    // if there's error write the file
    if (err) {
      fs.writeFileSync(
        path.resolve(__dirname, "../data/allLogs.json"),
        JSON.stringify([]),
        "utf8"
      );
      return "log file created";
    }

    // if there's no error
    return "log file exist";
  });
};

// middleware to get size of the allLogs.json file

module.exports = helpers;

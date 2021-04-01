const fs = require("fs");
const path = require("path");

// set the current file limit to split
const FILE_LIMIT = 500000;
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
  updateHeadFileNum(currentFileNum + 1);
};

helpers.getAllLogs = async () => {
  const logs = await JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/allLogs.json"), "utf8")
  );
  if (!logs) throw Error("./server/helpers/helpers: getAllLogs: No logs found.");
  return logs;
};

helpers.storeLogs = async (logs) => {
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
helpers.getFileSize = async () => {
  // get the current size of the file and save in res.locals.stats
  const fileSize = await fs.statSync(path.resolve(__dirname, '../data/allLogs.json'));
  return fileSize;
};
// middlware to rename allLogs.json file to allLogs{fileTracker} format
helpers.splitFile = async (size) => {
  let fileFlag;
  const currentFileNum = await getHeadFileNum();
  // if the current file size is bigger than fileLimit value
  if (size > FILE_LIMIT) {
    // set the res.locals.fileFlag to true
    fileFlag = true;
    // rename the current allLogs.json file to allLogs{fileTracker} format
    fs.rename(path.resolve(__dirname, '../data/allLogs.json'), path.resolve(__dirname, `../data/allLogs${currentFileNum}.json`), () => {
      console.log('new file created');
    });
  }
  return fileFlag;
};
// middleware to reset the value of allLogs.json to empty array
helpers.resetFile = async (fileFlag) => {
  // if the res.locals.fileFlag value is true
  if (fileFlag) {
    // overwirte the value of allLogs.json file to empty array
    await fs.writeFileSync(path.resolve(__dirname, '../data/allLogs.json'), JSON.stringify([]), 'utf8');
    // increment the fileTracker by one
    incrementFileNum();
  }
};

// middleware to delete all old logs
helpers.deleteOldLogs = () => {
  const headFile = getHeadFileNum();
  for (let i = STARTING_NUM; i < headFile + 1; i++) {
    try {
      fs.unlinkSync(path.resolve(__dirname, `../data/allLogs${i}.json`));
    } catch (e) {
      console.log(e);
    }
  }
  updateHeadFileNum(STARTING_NUM);
};

module.exports = helpers;

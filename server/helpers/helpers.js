const fs = require("fs");
const path = require("path");

// set the current file limit to split
// 1000 for 1k byte
const FILE_LIMIT = 10000000; // 10MB

// starting number of the allLogs files after splitter Eg. allLogs100.json
const STARTING_NUM = 100;

const helpers = {};

// method to get current HeadFile Number
const getHeadFileNum = async () => {
  // read current headFileNum from headFileNum.json file
  const currentHeadFileNum = await fs.readFileSync(path.resolve(__dirname, "../data/headFileNum.json"), "utf8");

  return currentHeadFileNum;
};

// method to update headFileNum back to headFileNum.json
const updateHeadFileNum = async (fileNum) => {
  // write file Number to headFileNum.json file
  fs.writeFileSync(path.resolve(__dirname, '../data/headFileNum.json'), JSON.parse(fileNum), 'utf8');
};

// method increment currentHeadFileNum by one
const incrementFileNum = async () => {
  // get current headFileNum
  const currentFileNum = await getHeadFileNum();

  // increment headFileNum by one
  updateHeadFileNum(parseInt(currentFileNum, 10) + 1);
};

// method to get the current size of allLogs.json file
helpers.getFileSize = async () => {
  // get the stats of the allLogs.json
  const fileStats = await fs.statSync(path.resolve(__dirname, '../data/allLogs.json'));

  // return the size of the file
  return fileStats.size;
};

// method rename allLogs.json file to allLogs{headFileNum}.json format
helpers.splitFile = async (size) => {
  let fileSplit = false;
  const currentFileNum = await getHeadFileNum();

  // if the current file size is bigger than fileLimit value
  if (size > FILE_LIMIT) {
    // set the fileSplit to true
    fileSplit = true;

    // rename the current allLogs.json file to allLogs{fheadFileNum}.json format
    await fs.rename(path.resolve(__dirname, '../data/allLogs.json'), path.resolve(__dirname, `../data/allLogs${currentFileNum}.json`), () => {
      console.log('new file created');
    });

    // overwrite the allLogs.json file with empty array
    await fs.writeFileSync(path.resolve(__dirname, '../data/allLogs.json'), JSON.stringify([]), 'utf8');

    // increment the fileTracker by one
    incrementFileNum();
  }
  return fileSplit;
};

// method to delete all old logs
helpers.deleteOldLogs = async () => {
  // read the current value of headFileNum
  const headFile = await getHeadFileNum();

  // iterate through the STARTING_NUM to headFile
  for (let i = STARTING_NUM; i < headFile; i++) {
    try {
      // remove the allLogs.json file
      fs.unlinkSync(path.resolve(__dirname, `../data/allLogs${i}.json`));
    } catch (e) {
      console.log(e);
    }
  }
  // update the headFileNum value with STARTING_NUM
  updateHeadFileNum(STARTING_NUM);
};

// method to read all logs from allLogs.json file
helpers.getAllLogs = async () => {
  // read allLogs.json file and parse JSON data
  const logs = await JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/allLogs.json"), "utf8")
  );

  // error handling
  if (!logs) throw Error("./server/helpers/helpers: getAllLogs: No logs found.");

  return logs;
};

// method to store all incoming logs
helpers.storeLogs = async (logs) => {
  // get the current size of allLogs.json file
  const fileSize = await helpers.getFileSize();

  // split the log file and return the fileFlag value
  await helpers.splitFile(fileSize);

  let data;

  // error handling if reading allLogs.json file throws an error
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

  function replaceGlobally(original, searchTxt, replaceTxt) {
    const regex = new RegExp(searchTxt, 'g');
    return original.replace(regex, replaceTxt);
  }

  // Sort the data by timestamp
  // Currently this is based on hour, minute, second and milli-second
  // This needs updating to sort based on month-day-year as well.
  data.sort((a, b) => {
    const hourA = replaceGlobally(a.timestamp.slice(-12), ':', '');
    const hourB = replaceGlobally(b.timestamp.slice(-12), ':', '');
    return hourA - hourB;
  });

  // write data that holds existing requests and new request to request.json
  fs.writeFileSync(
    path.resolve(__dirname, "../data/allLogs.json"),
    JSON.stringify(data, null, 2),
    "utf8"
  );

  return data;
};

// method to delete allLog.json file
helpers.deleteLogs = async () => {
  // invoke function to delete all old logs. Example: allLogs1xx.json
  helpers.deleteOldLogs();

  // overwrite allLogs.json file with empty array
  const res = await fs.writeFileSync(
    path.resolve(__dirname, "../data/allLogs.json"),
    JSON.stringify([]),
    "utf8"
  );
  return [];
};

// method to create allLogs.json file if the file is not present
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

module.exports = helpers;

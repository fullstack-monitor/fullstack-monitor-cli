const NO_DATA_RESPONSE = 'No data.';
const MAX_STRING_LENGTH = 50;

export const sanitizeAndShortenRequestResponseData = (data) => {
  let dataString = JSON.stringify(data);
  dataString = dataString === "{}" ? NO_DATA_RESPONSE : dataString;
  if (dataString.length > MAX_STRING_LENGTH) dataString = `${dataString.slice(0, MAX_STRING_LENGTH)}...`;
  return dataString;
};

export const sanitizeAndShortenLogData = (data) => {
  let dataString = JSON.stringify(data);
  dataString = dataString === "" ? NO_DATA_RESPONSE : dataString;
  if (dataString.length > MAX_STRING_LENGTH) dataString = `${dataString.slice(0, MAX_STRING_LENGTH)}...`;
  return dataString;
};

export const sanitizeRequestResponseData = (data) => {
  let dataString = JSON.stringify(data);
  dataString = dataString === "{}" ? NO_DATA_RESPONSE : dataString;
  return dataString;
};

export const sanitizeLogData = (data) => {
  let dataString = JSON.stringify(data);
  dataString = dataString === "" ? NO_DATA_RESPONSE : dataString;
  return dataString;
};

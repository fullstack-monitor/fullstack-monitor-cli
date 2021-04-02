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

export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const getHeaderTitles = (logTypes) => {
  const titles = ['Timestamp', 'Type', 'Class / Endpoint / Referer', 'Log / Data'];
  let title3 = '';
  let title4 = '';
  if (logTypes.client || logTypes.server) {
    if (title3.length) title3 += ' / Class';
    else title3 += 'Class';

    if (title4.length) title4 += ' / Log';
    else title4 += 'Log';
  }
  if (logTypes.request) {
    if (title3.length) title3 += ' / Endpoint';
    else title3 += 'Endpoint';

    if (title4.length) title4 += ' / Data';
    else title4 += 'Data';
  }
  if (logTypes.response) {
    if (title3.length) title3 += ' / Referer';
    else title3 += 'Referer';
    if (!title4.includes('Data')) {
      if (title4.length) title4 += ' / Data';
      else title4 += 'Data';
    }
  }
  return ['Timestamp', 'Type', title3, title4];
};

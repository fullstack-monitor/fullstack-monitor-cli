import React from "react";
import { Tr, Td } from "@chakra-ui/react";

const MAX_RESPONSE_DATA_LENGTH = 50;

export default function Request({ response, splitView, showMoreLogInfo }) {
  const {
    timestamp, class: classType, responseStatus, referer
  } = response;
  let { responseData } = response;
  if (responseData) {
    if (responseData.length > 50) responseData = `${response.responseData.slice(0, MAX_RESPONSE_DATA_LENGTH)}...`;
  } else {
    responseData = "No data.";
  }
  return (
    <Tr onClick={splitView}>
      <Td>{timestamp}</Td>
      <Td>{`${responseStatus} ${classType}`}</Td>
      <Td>{referer}</Td>
      <Td>{responseData}</Td>
    </Tr>
  );
}

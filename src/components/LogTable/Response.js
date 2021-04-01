import React from "react";
import { Tr, Td } from "@chakra-ui/react";

const MAX_RESPONSE_DATA_LENGTH = 50;

export default function Request({ response, splitView, showMoreLogInfo }) {
  let { responseData } = response;
  if (responseData) {
    responseData = responseData.length > 50
      ? `${response.responseData.slice(0, MAX_RESPONSE_DATA_LENGTH)}...`
      : responseData;
  } else {
    responseData = "No data.";
  }
  return (
    <Tr onClick={splitView}>
      <Td>{response.timestamp}</Td>
      <Td>{response.class}</Td>
      <Td>{response.responseStatus}</Td>
      <Td>{responseData}</Td>
    </Tr>
  );
}

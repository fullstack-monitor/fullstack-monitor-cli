import React from "react";
import {
  Tr,
  Td,
} from "@chakra-ui/react";

export default function Request({ response, showMoreLogInfo }) {
  console.log("showing response", response);
  return (
    <Tr>
      <Td onClick={showMoreLogInfo}>
        Log Class:
        <br />
        <br />
        {response.class}
      </Td>
      <Td>
        {' '}
        Log Date:
        <br />
        <br />
        {' '}
        {response.timestamp}
      </Td>
      {/* <Td>{response.responseStatus}</Td>
      <Td>{response.responseData ? response.responseData : 'no data'}</Td> */}
    </Tr>
  );
}

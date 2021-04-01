import React from "react";
import {
  Tr,
  Td,
} from "@chakra-ui/react";

export default function Request({ request, showMoreLogInfo }) {
  return (
    <Tr>
      <Td onClick={showMoreLogInfo}>
        Log Class:
        {' '}
        <br />
        {' '}
        <br />
        {request.class}
      </Td>
      <Td>
        Log Date:
        <br />
        {' '}
        <br />
        {' '}
        {request.timestamp}
      </Td>
      {/* <Td>{request.method}</Td>
      <Td>{request.originalUri}</Td> */}
    </Tr>
  );
}

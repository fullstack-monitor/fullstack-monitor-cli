import React from "react";
import {
  Tr,
  Td,
} from "@chakra-ui/react";

export default function Log({ log, showMoreLogInfo }) {
  return (
    <Tr>
      <Td onClick={showMoreLogInfo}>
        {" "}
        Log Class:
        <br />
        {' '}
        <br />
        {log.class}
      </Td>
      <Td>
        {" "}
        Log Date:
        {' '}
        <br />
        <br />
        {log.timestamp}
      </Td>
      {/* <Td>{log.log}</Td>
      <Td>{log.id}</Td> */}
    </Tr>
  );
}

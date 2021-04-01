import React from "react";
import {
  Tr,
  Td,
} from "@chakra-ui/react";

export default function Log({ log, splitView, showMoreLogInfo }) {
  return (
    <Tr onClick={splitView}>
      <Td>{log.timestamp}</Td>
      <Td>{log.class}</Td>
      { !showMoreLogInfo
        && (
        <>
          <Td>{log.type}</Td>
          <Td>{log.log}</Td>
        </>
        )}
    </Tr>
  );
}

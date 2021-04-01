import React from "react";
import {
  Tr,
  Td,
} from "@chakra-ui/react";

export default function Log({ log, splitView }) {
  return (
    <Tr onClick={splitView}>
      <Td>{log.class}</Td>
      <Td>{log.timestamp}</Td>
      <Td>{log.type}</Td>
      <Td>{log.log}</Td>
    </Tr>
  );
}

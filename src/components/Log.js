import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
} from "@chakra-ui/react";

export default function Log({ log }) {
  return (
    <Tr>
      <Td>{log.class}</Td>
      <Td>{log.timestamp}</Td>
      <Td>{log.type}</Td>
      <Td>{log.log}</Td>
    </Tr>
  );
}

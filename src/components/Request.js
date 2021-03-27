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

export default function Request({ request }) {
  return (
    <Tr>
      <Td>{request.class}</Td>
      <Td>{request.timestamp}</Td>
      <Td>{request.method}</Td>
      <Td>{request.originalUri}</Td>
    </Tr>
  );
}

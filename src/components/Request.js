import React from "react";
import {
  Tr,
  Td,
} from "@chakra-ui/react";

export default function Request({ request, splitView }) {
  return (
    <Tr onClick={splitView}>
      <Td>{request.class}</Td>
      <Td>{request.timestamp}</Td>
      <Td>{request.method}</Td>
      <Td>{request.originalUri}</Td>
    </Tr>
  );
}

import React from "react";
import {
  Tr,
  Td,
} from "@chakra-ui/react";

export default function Request({ request, splitView, showMoreLogInfo }) {
  return (
    <Tr onClick={splitView}>
      <Td>{request.timestamp}</Td>
      <Td>{request.class}</Td>
      <Td>{request.method}</Td>
      <Td>{request.originalUri}</Td>
    </Tr>
  );
}

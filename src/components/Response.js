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

export default function Request({ response }) {
  return (
    <Tr>
      <Td>{response.class}</Td>
      <Td>{response.timestamp}</Td>
      <Td>{response.responseStatus}</Td>
      <Td>{response.responseData ? response.responseData : 'no data'}</Td>
    </Tr>
  );
}

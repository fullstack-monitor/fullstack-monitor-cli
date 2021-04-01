import React from "react";
import {
  Tr,
  Td,
} from "@chakra-ui/react";

export default function Request({ response, splitView }) {
  return (
    <Tr onClick={splitView}>
      <Td>{response.class}</Td>
      <Td>{response.timestamp}</Td>
      <Td>{response.responseStatus}</Td>
      <Td>{response.responseData ? response.responseData : 'no data'}</Td>
    </Tr>
  );
}

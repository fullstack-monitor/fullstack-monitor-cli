import React from "react";
import {
  Tr,
  Td,
} from "@chakra-ui/react";

export default function Request({ response, splitView, showMoreLogInfo }) {
  return (
    <Tr onClick={splitView}>
      <Td>{response.timestamp}</Td>
      <Td>{response.class}</Td>
      <Td>{response.responseStatus}</Td>
      <Td>{response.responseData ? response.responseData : 'no data'}</Td>
    </Tr>
  );
}

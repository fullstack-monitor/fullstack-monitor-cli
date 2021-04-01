import React from "react";
import { Tr, Td } from "@chakra-ui/react";

export default function Request({ request, splitView, showMoreLogInfo }) {
  const {
    timestamp, class: classType, method, originalUri
  } = request;
  let requestData = JSON.stringify(request.requestData);
  requestData = requestData === "{}" ? 'no data' : requestData;
  if (requestData.length > 50) requestData = `${requestData.slice(0, 50)}...`;
  return (
    <Tr onClick={splitView}>
      <Td>{timestamp}</Td>
      <Td>{`${method} ${classType}`}</Td>
      <Td>{originalUri}</Td>
      <Td>{requestData}</Td>
    </Tr>
  );
}

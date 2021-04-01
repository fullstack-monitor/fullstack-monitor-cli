import React from "react";
import { Tr, Td } from "@chakra-ui/react";
import { sanitizeAndShortenRequestResponseData } from "../../helpers/helpers";

export default function Request({ request, splitView, showMoreLogInfo }) {
  const {
    timestamp, class: classType, method, originalUri, requestData
  } = request;
  return (
    <Tr onClick={splitView}>
      <Td>{timestamp}</Td>
      <Td>{`${method} ${classType}`}</Td>
      <Td>{originalUri}</Td>
      <Td>{sanitizeAndShortenRequestResponseData(requestData)}</Td>
    </Tr>
  );
}

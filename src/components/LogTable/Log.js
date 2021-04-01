import React from "react";
import { Tr, Td } from "@chakra-ui/react";
import { sanitizeAndShortenLogData } from "../../helpers/helpers";

export default function Log({ log, splitView, showMoreLogInfo }) {
  const {
    timestamp, class: classType, type, log: logData
  } = log;
  return (
    <Tr onClick={splitView}>
      <Td>{timestamp}</Td>
      <Td>{classType}</Td>
      <Td>{type}</Td>
      <Td>{sanitizeAndShortenLogData(logData)}</Td>
    </Tr>
  );
}

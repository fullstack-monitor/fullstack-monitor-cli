import React from "react";
import { Tr, Td } from "@chakra-ui/react";
import { sanitizeAndShortenLogData, capitalizeFirstLetter } from "../../helpers/helpers";

export default function Log({ log, splitView, showMoreLogInfo }) {
  const {
    timestamp, class: classType, type, log: logData
  } = log;
  return (
    <Tr onClick={splitView}>
      <Td>{timestamp}</Td>
      <Td>{capitalizeFirstLetter(classType)}</Td>
      <Td>{capitalizeFirstLetter(type)}</Td>
      <Td>{sanitizeAndShortenLogData(logData)}</Td>
    </Tr>
  );
}

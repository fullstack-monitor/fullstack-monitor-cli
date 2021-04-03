import React from "react";
import { Tr, Td } from "@chakra-ui/react";
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { sanitizeAndShortenRequestResponseData, capitalizeFirstLetter } from "../../helpers/helpers";

export default function Request({ request, splitView, styleObj }) {
  const {
    timestamp, class: classType, method, originalUri, requestData
  } = request;
  return (
    <Tr onClick={splitView} style={styleObj}>
      <Td>{timestamp}</Td>
      <Td>
        <ArrowForwardIcon color="green.300" marginBottom="2px" />
        {` ${method} ${capitalizeFirstLetter(classType)}`}
      </Td>
      <Td>{originalUri}</Td>
      <Td>{sanitizeAndShortenRequestResponseData(requestData)}</Td>
    </Tr>
  );
}

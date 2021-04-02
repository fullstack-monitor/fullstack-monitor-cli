import React from "react";
import { Tr, Td } from "@chakra-ui/react";
import { sanitizeAndShortenRequestResponseData, capitalizeFirstLetter } from "../../helpers/helpers";

export default function Request({ request, splitView, styleObj }) {
  const {
    timestamp, class: classType, method, originalUri, requestData
  } = request;
  return (
    <Tr onClick={splitView} style={styleObj}>
      <Td>{timestamp}</Td>
      <Td>{`${method} ${capitalizeFirstLetter(classType)}`}</Td>
      <Td>{originalUri}</Td>
      <Td>{sanitizeAndShortenRequestResponseData(requestData)}</Td>
    </Tr>
  );
}

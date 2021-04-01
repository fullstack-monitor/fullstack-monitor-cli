import React from "react";
import { Tr, Td } from "@chakra-ui/react";
import { sanitizeAndShortenRequestResponseData, capitalizeFirstLetter } from "../../helpers/helpers";

export default function Request({ response, splitView, styleObj }) {
  const {
    timestamp, class: classType, responseStatus, referer, responseData
  } = response;
  return (
    <Tr onClick={splitView} style={styleObj}>
      <Td>{timestamp}</Td>
      <Td>{`${responseStatus} ${capitalizeFirstLetter(classType)}`}</Td>
      <Td>{referer}</Td>
      <Td>{sanitizeAndShortenRequestResponseData(responseData)}</Td>
    </Tr>
  );
}

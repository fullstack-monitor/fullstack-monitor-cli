import React from 'react';
import {
  Stack,
  DrawerBody,
  Box,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { sanitizeRequestResponseData } from "../../helpers/helpers";

export default function RequestDetails({ activeLog }) {
  const {
    timestamp, class: classType, method, originalUri, fromIP, requestData
  } = activeLog;
  return (
    <DrawerBody>
      <Stack spacing="10px">
        <Box display="flex">
          <FormLabel>Timestamp:</FormLabel>
          <Text>{timestamp}</Text>
        </Box>
        <Box display="flex">
          <FormLabel>Type:</FormLabel>
          <Text>{classType}</Text>
        </Box>
        <Box display="flex">
          <FormLabel>Method:</FormLabel>
          <Text>{method}</Text>
        </Box>
        <Box display="flex">
          <FormLabel>Endpoint:</FormLabel>
          <Text>{originalUri}</Text>
        </Box>
        <Box display="flex">
          <FormLabel>RequestData:</FormLabel>
          <Text>{sanitizeRequestResponseData(requestData)}</Text>
        </Box>
        <Box display="flex">
          <FormLabel>From IP:</FormLabel>
          <Text>{fromIP}</Text>
        </Box>
      </Stack>
    </DrawerBody>
  );
}

import React from 'react';
import {
  Stack,
  DrawerBody,
  Box,
  FormLabel,
  Text,
} from "@chakra-ui/react";

export default function RequestDetails({ activeLog }) {
  const {
    timestamp, class: classType, method, originalUri, fromIP
  } = activeLog;
  let requestData = JSON.stringify(activeLog.requestData);
  requestData = requestData === "{}" ? 'No data.' : requestData;
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
          <Text>{requestData}</Text>
        </Box>
        <Box display="flex">
          <FormLabel>From IP:</FormLabel>
          <Text>{fromIP}</Text>
        </Box>
      </Stack>
    </DrawerBody>
  );
}

import React from "react";
import {
  Stack, DrawerBody, Box, FormLabel, Text
} from "@chakra-ui/react";
import { sanitizeRequestResponseData } from "../../helpers/helpers";

export default function ResponseDetails({ activeLog }) {
  const {
    timestamp,
    class: classType,
    responseStatus,
    referer,
    responseData,
  } = activeLog;
  return (
    <DrawerBody>
      <Stack spacing="10px">
        <Box display="flex">
          <FormLabel>Timestamp:</FormLabel>
          <Text>{activeLog.timestamp}</Text>
        </Box>
        <Box display="flex">
          <FormLabel>Type:</FormLabel>
          <Text>{activeLog.class}</Text>
        </Box>
        <Box display="flex">
          <FormLabel>Status:</FormLabel>
          <Text>{activeLog.responseStatus}</Text>
        </Box>
        <Box display="flex">
          <FormLabel>Referer:</FormLabel>
          <Text>{activeLog.referer}</Text>
        </Box>
        <Box display="flex">
          <FormLabel>Data:</FormLabel>
          <Text>{sanitizeRequestResponseData(responseData)}</Text>
        </Box>
      </Stack>
    </DrawerBody>
  );
}

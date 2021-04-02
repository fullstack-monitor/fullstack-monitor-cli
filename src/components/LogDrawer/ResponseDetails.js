import React from "react";
import {
  Stack, DrawerBody, Box, FormLabel, Text
} from "@chakra-ui/react";
import { sanitizeRequestResponseData, capitalizeFirstLetter } from "../../helpers/helpers";

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
          <Text>{timestamp}</Text>
        </Box>
        <Box display="flex">
          <FormLabel>Type:</FormLabel>
          <Text>{capitalizeFirstLetter(classType)}</Text>
        </Box>
        <Box display="flex">
          <FormLabel>Status:</FormLabel>
          <Text>{responseStatus}</Text>
        </Box>
        <Box display="flex">
          <FormLabel>Referer:</FormLabel>
          <Text>{referer}</Text>
        </Box>
        <Box display="flex">
          <FormLabel>Data:</FormLabel>
          <Text>{sanitizeRequestResponseData(responseData)}</Text>
        </Box>
      </Stack>
    </DrawerBody>
  );
}

import React from 'react';
import {
  Stack,
  DrawerBody,
  Box,
  FormLabel,
  Text,
} from "@chakra-ui/react";

export default function LogDetails({ activeLog }) {
  return (
    <DrawerBody>
      <Stack spacing="24px">
        <Box display="flex">
          <FormLabel>Timestamp:</FormLabel>
          <Text>{activeLog.timestamp}</Text>
        </Box>
        <Box display="flex">
          <FormLabel>Type:</FormLabel>
          <Text>{activeLog.class}</Text>
        </Box>
        <Box display="flex">
          <FormLabel>Class:</FormLabel>
          <Text>{activeLog.type}</Text>
        </Box>
        <Box display="flex">
          <FormLabel>Log:</FormLabel>
          <Text>{activeLog.log}</Text>
        </Box>
      </Stack>
    </DrawerBody>
  );
}

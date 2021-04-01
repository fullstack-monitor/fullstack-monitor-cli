/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  Stack,
  DrawerBody,
  Box,
  FormLabel,
  Text,
  List,
  ListItem
} from "@chakra-ui/react";

export default function LogDetails({ activeLog }) {
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
          <FormLabel>Class:</FormLabel>
          <Text>{activeLog.type}</Text>
        </Box>
        <Box display="flex">
          <FormLabel>Log:</FormLabel>
          <Text>{activeLog.log}</Text>
        </Box>
        <Box>
          <FormLabel>Stack:</FormLabel>
          <List spacing={3}>
            {activeLog.stack.map((line, i) => <ListItem key={`${line}${i}`}>{line}</ListItem>)}
          </List>
        </Box>
      </Stack>
    </DrawerBody>
  );
}

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
import { sanitizeLogData } from "../../helpers/helpers";

export default function LogDetails({ activeLog }) {
  const {
    timestamp, class: classType, type, log, stack
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
          <FormLabel>Class:</FormLabel>
          <Text>{type}</Text>
        </Box>
        <Box display="flex">
          <FormLabel>Log:</FormLabel>
          <Text>{sanitizeLogData(log)}</Text>
        </Box>
        <Box>
          <FormLabel>Stack:</FormLabel>
          <List spacing={3}>
            {stack.map((line, i) => <ListItem key={`${line}${i}`}>{line}</ListItem>)}
          </List>
        </Box>
      </Stack>
    </DrawerBody>
  );
}

import React from 'react';
import {
  Stack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  FormLabel,
  Text,
} from "@chakra-ui/react";

export default function LogDrawer({ showMoreLogInfo, onClose, activeLog }) {
  return (
    <Drawer
      isOpen={showMoreLogInfo}
      placement="right"
      size="xl"
      onClose={onClose}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Log Details
          </DrawerHeader>

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

          <DrawerFooter borderTopWidth="1px">
            <Text>Full Stack Monitor</Text>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

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
import LogDetails from "./LogDetails";
import RequestDetails from "./RequestDetails";
import ResponseDetails from "./ResponseDetails";

export default function LogDrawer({ showMoreLogInfo, onClose, activeLog }) {
  return (
    <Drawer
      isOpen={showMoreLogInfo}
      placement="right"
      size="xl"
      // size="full"
      onClose={onClose}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Log Details
          </DrawerHeader>

          { (activeLog.class === 'client' || activeLog.class === 'server')
            && <LogDetails activeLog={activeLog} />}
          { activeLog.class === 'request'
            && <RequestDetails activeLog={activeLog} />}
          { activeLog.class === 'response'
            && <ResponseDetails activeLog={activeLog} />}

          <DrawerFooter borderTopWidth="1px">
            <Text>Full Stack Monitor</Text>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

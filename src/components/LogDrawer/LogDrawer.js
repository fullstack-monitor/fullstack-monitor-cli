import React, { useState } from "react";
import {
  Drawer,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button
} from "@chakra-ui/react";
import LogDetails from "./LogDetails";
import RequestDetails from "./RequestDetails";
import ResponseDetails from "./ResponseDetails";

export default function LogDrawer({ showMoreLogInfo, onClose, activeLog }) {
  const [size, setSize] = useState('xl');
  return (
    <Drawer
      isOpen={showMoreLogInfo}
      placement="right"
      size={size}
      onClose={onClose}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Log Details</DrawerHeader>

          {(activeLog.class === "client" || activeLog.class === "server") && (
            <LogDetails activeLog={activeLog} />
          )}
          {activeLog.class === "request" && (
            <RequestDetails activeLog={activeLog} />
          )}
          {activeLog.class === "response" && (
            <ResponseDetails activeLog={activeLog} />
          )}

          <DrawerFooter borderTopWidth="1px">
            { size === 'xl'
              && <Button colorScheme="messenger" onClick={() => setSize('full')}>Fullscreen</Button>}
            { size === 'full'
              && <Button colorScheme="messenger" onClick={() => setSize('xl')}>Shrink</Button>}
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

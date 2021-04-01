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

const DEFAULT_DRAWER_SIZE = 'xl';

export default function LogDrawer({ showMoreLogInfo, onClose, activeLog }) {
  const [size, setSize] = useState(DEFAULT_DRAWER_SIZE);
  return (
    <Drawer
      isOpen={showMoreLogInfo}
      placement="right"
      size={size}
      onClose={() => {
        onClose();
        // This resets the drawer size each time a user exits the drawer
        setSize(DEFAULT_DRAWER_SIZE);
      }}
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

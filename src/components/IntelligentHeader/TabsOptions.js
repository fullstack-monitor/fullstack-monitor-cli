import React, { useEffect, useState } from 'react';
import {
  Button, Tab, TabList, Tabs,
} from "@chakra-ui/react";

export default function TabsOptions({ deleteLogs, filterLogs }) {
  let initialMarginTop = '5px';
  if (window.innerWidth < 750) initialMarginTop = '12px';
  const [marginTop, setMarginTop] = useState(initialMarginTop);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      let newMarginTop = '5px';
      if (window.innerWidth < 750) newMarginTop = '12px';
      setMarginTop(newMarginTop);
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Tabs>
      <TabList>
        <div className="tabsInnerContainer">
          <Tab onClick={() => filterLogs("all")}>All Logs</Tab>
          <Tab onClick={() => filterLogs("client")}>Client Logs</Tab>
          <Tab onClick={() => filterLogs("server")}>Server Logs</Tab>
          <Tab onClick={() => filterLogs("request")}>Requests</Tab>
          <Tab onClick={() => filterLogs("response")}>Responses</Tab>
          <Tab onClick={() => filterLogs("custom")}>Custom</Tab>
        </div>
        <Button
          onClick={deleteLogs}
          colorScheme="red"
          margin="5px"
          style={{
            minWidth: 'auto',
            marginTop
          }}
        >
          Delete Logs
        </Button>
      </TabList>
    </Tabs>
  );
}

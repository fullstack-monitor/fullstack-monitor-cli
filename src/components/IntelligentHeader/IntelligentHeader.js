import React from "react";
import {
  Button, Tab, TabList, Tabs
} from "@chakra-ui/react";
import CustomCheckboxes from "./CustomCheckboxes";

export default function IntelligentHeader({
  filterLogs,
  deleteLogs,
  setCheckBoxes,
  checkBoxes,
  showCustom,
}) {
  return (
    <div>
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
          <Button onClick={deleteLogs} colorScheme="red" margin="5px">
            Delete Logs
          </Button>
        </TabList>
      </Tabs>
      {showCustom && (
        <CustomCheckboxes
          checkBoxes={checkBoxes}
          setCheckBoxes={setCheckBoxes}
        />
      )}
    </div>
  );
}

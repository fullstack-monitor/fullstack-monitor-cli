/* eslint-disable */
import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
} from "@chakra-ui/react";
import Log from "./Log";
import Request from "./Request";
import Response from "./Response";
import LogDetails from "./logDetails";

export default function SplitView({ activeLog, logs, showMorelogInfo }) {
  return (
    <div>
      <div style={{ display: "block", width: "100%" }}>
        <div style={{ marginBottom: "100px" }}></div>
        <div
        style={{
          backgroundColor: "",
          color: "black",
          width: "20%",
          float: "left",
          marginLeft: "20px",
          fontFamily: "Lucida Console",
        }}
      >
        <Table variant="simple">
          <TableCaption>Ultimate Logger</TableCaption>
          <Thead>
            <Tr>
              <Th>Type</Th>
              <Th>Timestamp</Th>
            </Tr>
          </Thead>
          <Tbody>
            {logs.map((log, i) => {
              switch (log.class) {
                case "client":
                  return (
                    <Log
                      log={log}
                      showMoreLogInfo={() => {
                        showMorelogInfo(log);
                      }}
                    />
                  );
                case "server":
                  return (
                    <Log
                      log={log}
                      showMoreLogInfo={() => {
                        showMorelogInfo(log);
                      }}
                    />
                  );
                case "request":
                  return (
                    <Request
                      request={log}
                      showMoreLogInfo={() => {
                        console.log("inside i", log);
                        showMorelogInfo(log);
                      }}
                    />
                  );
                case "response":
                  return (
                    <Response
                      response={log}
                      showMoreLogInfo={() => {
                        console.log("inside i", i);
                        showMorelogInfo(log);
                      }}
                    />
                  );
              }
            })}
          </Tbody>
        </Table>
      </div>
        <LogDetails logs={activeLog} />
      </div>
    </div>
  )
}

// export default App;

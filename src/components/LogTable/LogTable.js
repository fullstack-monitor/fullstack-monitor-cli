import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
} from "@chakra-ui/react";
import Log from "./Log";
import Request from "./Request";
import Response from "./Response";

export default function LogTable({ showMoreLogInfo, splitView, logs }) {
  return (
    <div className="tableContainer">
      <div className="mainTableContainer">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>TimeStamp</Th>
              <Th>Type</Th>
              <Th>Class</Th>
              <Th>Log</Th>
            </Tr>
          </Thead>
          <Tbody>
            {logs.map((log, i) => {
              switch (log.class) {
                case "client":
                  return (
                    <Log
                      log={log}
                      key={`${log.class}${log.type}${log.timestamp}${log.log}`}
                      splitView={() => splitView(i)}
                      showMoreLogInfo={showMoreLogInfo}
                    />
                  );
                case "server":
                  return (
                    <Log
                      log={log}
                      key={`${log.class}${log.type}${log.timestamp}${log.log}`}
                      splitView={() => splitView(i)}
                      showMoreLogInfo={showMoreLogInfo}
                    />
                  );
                case "request":
                  return (
                    <Request
                      request={log}
                      key={`${log.class}${log.method}${log.timestamp}${log.originalUri}`}
                      splitView={() => splitView(i)}
                      showMoreLogInfo={showMoreLogInfo}
                    />
                  );
                case "response":
                  return (
                    <Response
                      response={log}
                      key={`${log.class}${log.responseStatus}${log.timestamp}`}
                      splitView={() => splitView(i)}
                      showMoreLogInfo={showMoreLogInfo}
                    />
                  );
                default:
                  return <noscript />;
              }
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Type</Th>
              <Th>TimeStamp</Th>
              <Th>Class</Th>
              <Th>Log</Th>
            </Tr>
          </Tfoot>
        </Table>
      </div>
    </div>
  );
}

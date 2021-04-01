import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  TableCaption,
  Button,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Tabs,
  Checkbox,
  Stack,
} from "@chakra-ui/react";
import Log from "./Log";
import Request from "./Request";
import Response from "./Response";
import { serverPort } from "../../configConstants";

export default function LogTable({ showMoreLogInfo, splitView, logs }) {
  return (
    <div className="tableContainer">
      <div className="mainTableContainer">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>TimeStamp</Th>
              <Th>Type</Th>
              {!showMoreLogInfo && (
                <>
                  <Th>Class</Th>
                  <Th>Log</Th>
                </>
              )}
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
              {!showMoreLogInfo && (
                <>
                  <Th>Class</Th>
                  <Th>Log</Th>
                </>
              )}
            </Tr>
          </Tfoot>
        </Table>
      </div>
      {showMoreLogInfo && (
        <div className="logDetailsContainer">
          <Table>
            <Thead>
              <Tr>
                <Th>Details</Th>
              </Tr>
            </Thead>
          </Table>
        </div>
      )}
    </div>
  );
}

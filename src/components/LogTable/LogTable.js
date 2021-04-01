import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  useToken
} from "@chakra-ui/react";
import Log from "./Log";
import Request from "./Request";
import Response from "./Response";

export default function LogTable({
  activeLog, showMoreLogInfo, splitView, logs
}) {
  const messengerBlue = useToken("colors", "messenger.400");
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>TimeStamp</Th>
          <Th>Type</Th>
          <Th>Class / Referer / Endpoint</Th>
          <Th>Log / Data</Th>
        </Tr>
      </Thead>
      <Tbody>
        {logs.map((log, i) => {
          let styleObj = {};
          if (showMoreLogInfo && activeLog.id === log.id) {
            styleObj = {
              backgroundColor: messengerBlue,
              color: 'white'
            };
          }

          switch (log.class) {
            case "client":
            case "server":
              return (
                <Log
                  styleObj={styleObj}
                  log={log}
                  key={`${log.class}${log.type}${log.timestamp}${log.log}`}
                  splitView={() => splitView(i)}
                />
              );
            case "request":
              return (
                <Request
                  styleObj={styleObj}
                  request={log}
                  key={`${log.class}${log.method}${log.timestamp}${log.originalUri}`}
                  splitView={() => splitView(i)}
                />
              );
            case "response":
              return (
                <Response
                  styleObj={styleObj}
                  response={log}
                  key={`${log.class}${log.responseStatus}${log.timestamp}`}
                  splitView={() => splitView(i)}
                />
              );
            default:
              return <noscript />;
          }
        })}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>TimeStamp</Th>
          <Th>Type</Th>
          <Th>Class / Referer / Endpoint</Th>
          <Th>Log / Data</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
}

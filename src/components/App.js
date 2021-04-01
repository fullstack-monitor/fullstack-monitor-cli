import React, { Component } from "react";
import "../index.css";
import { io } from "socket.io-client";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
} from "@chakra-ui/react";
import Log from "./Log";
import Request from "./Request";
import Response from "./Response";
import { serverPort } from "../../configConstants";

class App extends Component {
  constructor() {
    super();
    this.state = {
      socket: io(`http://localhost:${serverPort}/`, {
        transports: ["websocket"],
      }),
      logs: [],
    };
  }

  componentDidMount() {
    const { socket } = this.state;
    socket.on("display-logs", (msg) => {
      console.log("recieved message from server: ", msg);
      this.setState({ logs: msg.allLogs });
    });
    socket.emit("get-initial-logs");
  }

  componentWillUnmount() {
    const { socket } = this.state;
    socket.off("display-logs");
    socket.off("get-initial-logs");
  }

  deleteLogs = () => {
    const { socket } = this.state;
    socket.emit("delete-logs", true);
  };

  render() {
    const { logs } = this.state;
    console.log(`this.state.logs`, logs);
    return (
      <div>
        <Button onClick={this.deleteLogs}>Delete Logs</Button>
        <Table variant="simple">
          <TableCaption>Ultimate Logger</TableCaption>
          <Thead>
            <Tr>
              <Th>Type</Th>
              <Th>TimeStamp</Th>
              <Th>Class</Th>
              <Th>Log</Th>
            </Tr>
          </Thead>
          <Tbody>
            {logs.map((log) => {
              switch (log.class) {
                case "client":
                  return (
                    <Log
                      log={log}
                      key={`${log.class}${log.type}${log.timestamp}${log.log}`}
                    />
                  );
                case "server":
                  return (
                    <Log
                      log={log}
                      key={`${log.class}${log.type}${log.timestamp}${log.log}`}
                    />
                  );
                case "request":
                  return (
                    <Request
                      request={log}
                      key={`${log.class}${log.method}${log.timestamp}${log.originalUri}`}
                    />
                  );
                case "response":
                  return (
                    <Response
                      response={log}
                      key={`${log.class}${log.responseStatus}${log.timestamp}`}
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
    );
  }
}

export default App;

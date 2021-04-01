/* eslint-disable */
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
  TableCaption,
  Button,
} from "@chakra-ui/react";
import Log from "./Log";
import Request from "./Request";
import Response from "./Response";
import { serverPort } from "../../configConstants";
import SplitView from "./SplitView/SplitView";

// click on log that should show moreinformation

class App extends Component {
  constructor() {
    super();
    this.state = {
      socket: io(`http://localhost:${serverPort}/`, {
        transports: ["websocket"],
      }),
      logs: [],
      showMoreLogInfo: false, // switch every time you clickit
      logId: null,
      activeLog: {},
    };
  }

  updateLogState = (logs) => {
    this.setState((prevState) => {
      logs.map((log, index) => {
        log.id = "logs" + index;
      });
      prevState.logs = logs;
      return prevState;
    });
  };

  splitView = (index) => {
    console.log("split view: ", index);
    const { logs, showMoreLogInfo } = this.state;
    console.log(`logs[i]`, logs[index]);
    this.setState({
      activeLog: logs[index],
      showMoreLogInfo: !showMoreLogInfo,
    });
  };

  componentDidMount() {
    const { socket } = this.state;
    socket.on("display-logs", (msg) => {
      console.log("recieved message from server: ", msg);
      this.updateLogState(msg.allLogs);
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

  showMorelogInfo = (log) => {
    //then write function to get more logs
    console.log("inside showmoreloginfo function");
    this.setState({
      activeLog: log,
    });
  };

  render() {
    const { logs, showMoreLogInfo, activeLog } = this.state;
    console.log(`this.state.logs`, logs);
    return (
      <div>
        <Button onClick={this.deleteLogs}>Delete Logs</Button>
        {!showMoreLogInfo && (
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
              {logs.map((log, i) => {
                switch (log.class) {
                  case "client":
                    return (
                      <Log
                        log={log}
                        key={`${log.class}${log.type}${log.timestamp}${log.log}`}
                        splitView={() => this.splitView(i)}
                      />
                    );
                  case "server":
                    return (
                      <Log
                        log={log}
                        key={`${log.class}${log.type}${log.timestamp}${log.log}`}
                        splitView={() => this.splitView(i)}
                      />
                    );
                  case "request":
                    return (
                      <Request
                        request={log}
                        key={`${log.class}${log.method}${log.timestamp}${log.originalUri}`}
                        splitView={() => this.splitView(i)}
                      />
                    );
                  case "response":
                    return (
                      <Response
                        response={log}
                        key={`${log.class}${log.responseStatus}${log.timestamp}`}
                        splitView={() => this.splitView(i)}
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
        )}
        {showMoreLogInfo && (
          <div onClick={() => this.setState({ showMoreLogInfo: false })}>
            <SplitView
              activeLog={activeLog}
              logs={logs}
              showMorelogInfo={this.showMorelogInfo}
              leaveSplitView={() => this.setState({ showMoreLogInfo: false })}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;

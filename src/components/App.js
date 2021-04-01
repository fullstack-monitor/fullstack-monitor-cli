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
      logId: index,
    });
  };

  componentDidMount() {
    const { socket } = this.state;
    socket.on("display-logs", (msg) => {
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
    this.setState({
      activeLog: log,
    });
  };

  render() {
    const { logs, showMoreLogInfo, activeLog } = this.state;
    console.log(`this.state.logs`, logs);
    return (
      <div>
        <Tabs>
          <TabList>
            <div className="tabsInnerContainer">
              <Tab>All Logs</Tab>
              <Tab>Client Logs</Tab>
              <Tab>Server Logs</Tab>
              <Tab>Requests</Tab>
              <Tab>Responses</Tab>
              <Tab>Custom</Tab>
            </div>
            {/* <div> */}
            <Button onClick={this.deleteLogs} margin="5px">Delete Logs</Button>
            {/* </div> */}
          </TabList>

          <TabPanels>
            <TabPanel>{/* All logs */}</TabPanel>
            <TabPanel>{/* Client logs */}</TabPanel>
            <TabPanel>{/* Server logs */}</TabPanel>
            <TabPanel>{/* Requests logs */}</TabPanel>
            <TabPanel>{/* Responses logs */}</TabPanel>
            <TabPanel>
              {/* Custom logs */}
              <Stack spacing={10} direction="row">
                <Checkbox defaultIsChecked>Client Logs</Checkbox>
                <Checkbox defaultIsChecked>Server Logs</Checkbox>
                <Checkbox defaultIsChecked>Requests</Checkbox>
                <Checkbox defaultIsChecked>Responses</Checkbox>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
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
                          splitView={() => this.splitView(i)}
                          showMoreLogInfo={showMoreLogInfo}
                        />
                      );
                    case "server":
                      return (
                        <Log
                          log={log}
                          key={`${log.class}${log.type}${log.timestamp}${log.log}`}
                          splitView={() => this.splitView(i)}
                          showMoreLogInfo={showMoreLogInfo}
                        />
                      );
                    case "request":
                      return (
                        <Request
                          request={log}
                          key={`${log.class}${log.method}${log.timestamp}${log.originalUri}`}
                          splitView={() => this.splitView(i)}
                          showMoreLogInfo={showMoreLogInfo}
                        />
                      );
                    case "response":
                      return (
                        <Response
                          response={log}
                          key={`${log.class}${log.responseStatus}${log.timestamp}`}
                          splitView={() => this.splitView(i)}
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
        <Table>
          <TableCaption>Ultimate Logger</TableCaption>
        </Table>
      </div>
    );
  }
}

export default App;

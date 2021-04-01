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
import LogTable from "./LogTable";
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
      logTypes: {
        client: true,
        server: true,
        request: true,
        response: true,
      },
      checkBoxes: {
        client: true,
        server: true,
        request: true,
        response: true,
      },
      showCustom: false
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

  filterLogs = (type) => {
    console.log('inside filter logs');
    console.log(`type`, type)
    const { checkBoxes } = this.state;
    switch (type) {
      case 'all':
        this.setState({
          logTypes: {
            client: true,
            server: true,
            request: true,
            response: true,
          },
          showCustom: false
        });
        break;
      case 'client':
      case 'server':
      case 'request':
      case 'response':
        this.setState({
          logTypes: {
            [type]: true,
          },
          showCustom: false
        });
        break;
      case 'custom':
        this.setState({
          logTypes: checkBoxes,
          showCustom: true,
        });
        break;
      default:
        break;
    }
  };

  setCheckBoxes = (e) => {
    const { value: type, checked } = e.target;
    const { checkBoxes } = this.state;
    const newCheckBoxes = {...checkBoxes}
    newCheckBoxes[type] = checked;
    this.setState({ checkBoxes: newCheckBoxes, logTypes: newCheckBoxes });
  }

  render() {
    const { logs, showMoreLogInfo, showCustom, logTypes, checkBoxes } = this.state;
    return (
      <div>
        <Tabs>
          <TabList>
            <div className="tabsInnerContainer">
              <Tab onClick={() => this.filterLogs("all")}>All Logs</Tab>
              <Tab onClick={() => this.filterLogs("client")}>Client Logs</Tab>
              <Tab onClick={() => this.filterLogs("server")}>Server Logs</Tab>
              <Tab onClick={() => this.filterLogs("request")}>Requests</Tab>
              <Tab onClick={() => this.filterLogs("response")}>Responses</Tab>
              <Tab onClick={() => this.filterLogs("custom")}>Custom</Tab>
            </div>
            <Button onClick={this.deleteLogs} margin="5px">
              Delete Logs
            </Button>
          </TabList>
        </Tabs>
        { showCustom &&
          <Stack margin="5px" spacing={10} direction="row">
            <Checkbox onChange={this.setCheckBoxes} value="client" isChecked={checkBoxes.client}>Client Logs</Checkbox>
            <Checkbox onChange={this.setCheckBoxes} value="server" isChecked={checkBoxes.server}>Server Logs</Checkbox>
            <Checkbox onChange={this.setCheckBoxes} value="request" isChecked={checkBoxes.request}>Requests</Checkbox>
            <Checkbox onChange={this.setCheckBoxes} value="response" isChecked={checkBoxes.response}>Responses</Checkbox>
          </Stack>
        }
        <LogTable
          logs={logs.filter((log) => logTypes[log.class])}
          showMoreLogInfo={showMoreLogInfo}
          splitView={this.splitView}
        />
        {/* <div className="tableContainer">
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
        </div> */}
        <Table>
          <TableCaption>Ultimate Logger</TableCaption>
        </Table>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import "../index.css";
import { io } from "socket.io-client";
import {
  Table,
  TableCaption,
  Button,
  Tab,
  TabList,
  Tabs,
  Checkbox,
  Stack,
} from "@chakra-ui/react";
import LogTable from "./LogTable/LogTable";
import { serverPort } from "../../configConstants";
import LogDrawer from "./LogDrawer/LogDrawer";

class App extends Component {
  constructor() {
    super();
    this.state = {
      socket: io(`http://localhost:${serverPort}/`, {
        transports: ["websocket"],
      }),
      logs: [],
      showMoreLogInfo: false, // switch every time you clickit
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
      showCustom: false,
    };
  }

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

  splitView = (index) => {
    const { logs, showMoreLogInfo } = this.state;
    this.setState({
      activeLog: logs[index],
      showMoreLogInfo: !showMoreLogInfo,
    });
  };

  updateLogState = (logs) => {
    this.setState((prevState) => {
      logs.forEach((log, index) => {
        log.id = `logs${index}`;
      });
      prevState.logs = logs;
      return prevState;
    });
  };

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
    const { checkBoxes } = this.state;
    switch (type) {
      case "all":
        this.setState({
          logTypes: {
            client: true,
            server: true,
            request: true,
            response: true,
          },
          showCustom: false,
        });
        break;
      case "client":
      case "server":
      case "request":
      case "response":
        this.setState({
          logTypes: {
            [type]: true,
          },
          showCustom: false,
        });
        break;
      case "custom":
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
    const newCheckBoxes = { ...checkBoxes };
    newCheckBoxes[type] = checked;
    this.setState({ checkBoxes: newCheckBoxes, logTypes: newCheckBoxes });
  };

  render() {
    const {
      logs,
      showMoreLogInfo,
      showCustom,
      logTypes,
      checkBoxes,
      activeLog,
    } = this.state;
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
            <Button onClick={this.deleteLogs} colorScheme="red" margin="5px">
              Delete Logs
            </Button>
          </TabList>
        </Tabs>
        {showCustom && (
          <Stack
            marginTop="10px"
            marginLeft="20px"
            spacing={10}
            direction="row"
          >
            <Checkbox
              onChange={this.setCheckBoxes}
              value="client"
              isChecked={checkBoxes.client}
            >
              Client Logs
            </Checkbox>
            <Checkbox
              onChange={this.setCheckBoxes}
              value="server"
              isChecked={checkBoxes.server}
            >
              Server Logs
            </Checkbox>
            <Checkbox
              onChange={this.setCheckBoxes}
              value="request"
              isChecked={checkBoxes.request}
            >
              Requests
            </Checkbox>
            <Checkbox
              onChange={this.setCheckBoxes}
              value="response"
              isChecked={checkBoxes.response}
            >
              Responses
            </Checkbox>
          </Stack>
        )}
        <LogTable
          logs={logs.filter((log) => logTypes[log.class])}
          showMoreLogInfo={showMoreLogInfo}
          splitView={this.splitView}
        />
        <Table>
          <TableCaption>Ultimate Logger</TableCaption>
        </Table>
        <LogDrawer
          showMoreLogInfo={showMoreLogInfo}
          activeLog={activeLog}
          onClose={() => this.setState({ showMoreLogInfo: false })}
        />
      </div>
    );
  }
}

export default App;

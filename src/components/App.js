/* eslint-disable */
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
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Textarea,
  Text,
} from "@chakra-ui/react";
import LogTable from "./LogTable/LogTable";
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
      // showMoreLogInfo: true, // switch every time you clickit
      logId: null,
      // activeLog: {},
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
    // REMOVE
    // this.setState({ activeLog: logs[0] })
  };

  splitView = (index) => {
    const { logs, showMoreLogInfo } = this.state;
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
    const { logs, showMoreLogInfo, showCustom, logTypes, checkBoxes, activeLog } = this.state;
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
        <Table>
          <TableCaption>Ultimate Logger</TableCaption>
        </Table>
        <Drawer
          isOpen={showMoreLogInfo}
          placement="right"
          size="xl"
          onClose={() => this.setState({ showMoreLogInfo: false })}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">
                Log Details
              </DrawerHeader>

              <DrawerBody>
                <Stack spacing="24px">
                  <Box display="flex">
                    <FormLabel>Timestamp:</FormLabel>
                    <Text>{activeLog.timestamp}</Text>
                  </Box>
                  <Box display="flex">
                    <FormLabel>Type:</FormLabel>
                    <Text>{activeLog.class}</Text>
                  </Box>
                  <Box display="flex">
                    <FormLabel>Class:</FormLabel>
                    <Text>{activeLog.type}</Text>
                  </Box>
                  <Box display="flex">
                    <FormLabel>Log:</FormLabel>
                    <Text>{activeLog.log}</Text>
                  </Box>
                </Stack>
              </DrawerBody>

              <DrawerFooter borderTopWidth="1px">
                <Text>Full Stack Monitor</Text>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </div>
    );
  }
}

export default App;

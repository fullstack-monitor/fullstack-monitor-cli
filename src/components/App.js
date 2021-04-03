import React, { Component } from "react";
import "../index.css";
import { io } from "socket.io-client";
import {
  Table,
  TableCaption,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import LogTable from "./LogTable/LogTable";
import { serverPort } from "../../configConstants";
import LogDrawer from "./LogDrawer/LogDrawer";
import IntelligentHeader from "./IntelligentHeader/IntelligentHeader";

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
      // logTypes object determines which types of logs render on the page
      logTypes: {
        client: true,
        server: true,
        request: true,
        response: true,
      },
      // checkBoxes values are used for the custom tab
      checkBoxes: {
        client: true,
        server: true,
        request: true,
        response: true,
      },
      showCustom: false,
      displayConnectionError: false
    };
  }

  componentDidMount() {
    const { socket } = this.state;
    socket.on("display-logs", (msg) => {
      this.updateLogState(msg.allLogs);
    });
    socket.on('connect_error', () => {
      this.setState({ displayConnectionError: true });
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
        log.id = index;
      });
      prevState.logs = logs;
      return prevState;
    }, () => window.scrollTo(0, document.body.scrollHeight));
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
      // If the user selects the all tab, set all log types to true
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
      // Otherwise set logTypes to true just for the specified log type
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
      // If the user selects the custom tab, set logTypes to be equal to the value of checkBoxes
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
      displayConnectionError
    } = this.state;
    return (
      <div>
        { displayConnectionError
          && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>Failed to connect the server.</AlertTitle>
            <AlertDescription>
              There was a problem connecting to the Fullstack-Monitor-CLI Server
            </AlertDescription>
          </Alert>
          )}
        <IntelligentHeader
          filterLogs={this.filterLogs}
          deleteLogs={this.deleteLogs}
          setCheckBoxes={this.setCheckBoxes}
          checkBoxes={checkBoxes}
          showCustom={showCustom}
        />
        <LogTable
          logTypes={logTypes}
          activeLog={activeLog}
          logs={logs.filter((log) => logTypes[log.class])}
          showMoreLogInfo={showMoreLogInfo}
          splitView={this.splitView}
        />
        <Table>
          <TableCaption>Fullstack Monitor</TableCaption>
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

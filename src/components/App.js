import React, { Component } from "react";
import "../index.css";
import { io } from "socket.io-client";
import {
  Table,
  TableCaption,
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
      // showMoreLogInfo: true, // switch every time you clickit
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
      console.log(msg.allLogs);
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
    }, () => window.scrollTo(0, document.body.scrollHeight));
    // REMOVE
    // this.setState({ activeLog: logs[2] });
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

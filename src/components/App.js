/* eslint-disable */
import React, { Component } from "react";
import "../index.css";
import { io } from "socket.io-client";
import Log from "./Log";
import Request from "./Request";
import Response from "./Response";
import LogDetails from "./logDetails";
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

//click on log that should show moreinformation

class App extends Component {
  constructor() {
    super();
    this.state = {
      socket: io("http://localhost:3861/", { transports: ["websocket"] }),
      logs: [],
      showMoreLogInfo: false, // switch every time you clickit
      logId: null,
      activeLog: {},
    };
  }

  updateLogState = (logs) => {
    this.setState((prevState) => {
      // { logs: msg.allLogs }
      logs.map((log, index) => {
        log.id = "logs" + index;
      });
      prevState.logs = logs;
      return prevState;
    });
  };

  componentDidMount() {
    this.state.socket.on("chat message", (msg) => {
      console.log("recieved message from server: ", msg);
      // this.setState((prevState)=> {
      //   // { logs: msg.allLogs }
      //   msg.allLogs.map((log, index) => {
      //     log.id = "logs" + index
      //   })
      //   prevState.logs = msg.allLogs
      //   return prevState
      // });
      this.updateLogState(msg.allLogs);
    });
    fetch("/api/logs")
      .then((res) => res.json())
      .then((res) => {
        // { logs: res.allLogs }
        this.updateLogState(res.allLogs);
        // this.setState((prevState)=> {
        //   // { logs: msg.allLogs }
        //   res.allLogs.map((log, index) => {
        //     log.id = "logId" + index
        //   })
        //   prevState.logs = res.allLogs
        //   return prevState
        // })
      });
  }

  sendWSMessageArrow = () => {
    console.log("inside sendWSMessage Arrow");
    this.state.socket.emit("chat message", "hi from client arrow");
  };

  showMorelogInfo = (log) => {
    //then write function to get more logs
    console.log("inside showmoreloginfo function");
    this.setState({
      // showMoreLogInfo: !this.state.showMoreLogInfo,
      // logId: id,

      activeLog: log,
    });
  };

  render() {
    const { logs } = this.state;
    console.log(`this.state.logs`, this.state.logs);
    return (
      <div style={{ display: "block", width: "100%" }}>
        <div style={{ marginBottom: "100px" }}></div>
        {/* <Button onClick={this.sendWSMessageArrow}>Yo Arrow</Button> */}
        <div
          style={{
            backgroundColor: "",
            color: "black",
            width: "20%",
            float: "left",
            marginLeft: "20px",
            fontFamily: "Lucida Console",
          }}
        >
          <Table variant="simple">
            <TableCaption>Ultimate Logger</TableCaption>
            <Thead>
              <Tr>
                <Th>Type</Th>
                {/* <Th>TimeStamp</Th>
                <Th>Class</Th>
                <Th>Log</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {logs.map((log, i) => {
                switch (log.class) {
                  case "client":
                    return (
                      <Log
                        log={log}
                        showMoreLogInfo={() => {
                          this.showMorelogInfo(log);
                        }}
                      />
                    );
                  case "server":
                    return (
                      <Log
                        log={log}
                        showMoreLogInfo={() => {
                          this.showMorelogInfo(log);
                        }}
                      />
                    );
                  case "request":
                    return (
                      <Request
                        request={log}
                        showMoreLogInfo={() => {
                          console.log("inside i", log);
                          this.showMorelogInfo(log);
                        }}
                      />
                    );
                  case "response":
                    return (
                      <Response
                        response={log}
                        showMoreLogInfo={() => {
                          console.log("inside i", i);
                          this.showMorelogInfo(log);
                        }}
                      />
                    );
                }
              })}
            </Tbody>
            {/* <Tfoot>
              <Tr>
                <Th>Type</Th>
                <Th>TimeStamp</Th>
                <Th>Class</Th>
                <Th>Log</Th>
              </Tr>
            </Tfoot> */}
          </Table>
        </div>

        <LogDetails logs={this.state.activeLog} />

        {/* <div>
          {this.state.showMoreLogInfo && (
            <div
              style={{
                float: "right",
                color: "orange",
                width: "70%",
                backgroundColor: "purple",
              }}
            >
              {" "}
             Type: {this.state.logs[this.state.logId].class}
             <br/>
         
              Log Type: {this.state.logs[this.state.logId].type}
              <br/> 
              Date: {this.state.logs[this.state.logId].timestamp}
              <br/>
              
              <br/>

              Log: 
              <br/>
              {this.state.logs[this.state.logId].log}
              
            </div>
          )}
        </div> */}
      </div>
    );
  }
}

export default App;

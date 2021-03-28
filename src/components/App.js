/* eslint-disable */
import React, { Component } from "react";
import "../index.css";
import { io } from "socket.io-client";
import Log from './Log';
import Request from './Request';
import Response from './Response';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Button
} from "@chakra-ui/react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      socket: io('http://localhost:3861/', {transports: ['websocket']}),
      logs: []
    }
  }
  componentDidMount() {
    this.state.socket.on("chat message", (msg) => {
      console.log("recieved message from server: ", msg);
      this.setState({logs: msg.allLogs});
    });
    fetch('/api/logs')
      .then(res => res.json())
      .then(res => {
        this.setState({logs: res.allLogs})
      })
  }

  sendWSMessageArrow = () => {
    console.log('inside sendWSMessage Arrow');
    this.state.socket.emit("chat message", "hi from client arrow");
  };

  render() {
    const { logs } = this.state;
    console.log(`this.state.logs`, this.state.logs);
    return (
      <div>
        {/* <Button onClick={this.sendWSMessageArrow}>Yo Arrow</Button> */}
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
            {
              logs.map(log => {
                switch(log.class) {
                  case 'client':
                    return <Log log={log} />
                  case 'server':
                    return <Log log={log} />
                  case 'request':
                    return <Request request={log} />
                  case 'response':
                    return <Response response={log} />
                }
              })
            }
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

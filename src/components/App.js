/* eslint-disable */
import React, { Component } from "react";
import "../index.css";
import { io } from "socket.io-client";
import Log from './Log';
// const socket = io();
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

// {transports: ['websocket']}

class App extends Component {
  constructor() {
    super();
    this.state = {
      socket: io(),
      logs: []
    }
  }
  componentDidMount() {
    this.state.socket.on("chat message", (msg) => {
      console.log("recieved message from server: ", msg);
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
        <Button onClick={this.sendWSMessageArrow}>Yo Arrow</Button>
        Hello World
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
                  // case 'request':
                  //   return <li>{log.method}</li>
                  // case 'response':
                  //   return <li>Response{log.responseData}</li>
                }
              })
            }
          
          {/* <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
          </Tr> */}
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

/* eslint-disable */
import React, { Component } from "react";
import "../index.css";
import { Button } from "@chakra-ui/react";
import { io } from "socket.io-client";

// const socket = io();

// {transports: ['websocket']}

class App extends Component {
  constructor() {
    super();
    this.state = {
      clientLogs: [],
      serverLogs: [],
      requests: [],
      socket: io()
    }
  }
  componentDidMount() {
    this.state.socket.on("chat message", (msg) => {
      console.log("recieved message from server: ", msg);
    });
  }

  sendWSMessageArrow = () => {
    console.log('inside sendWSMessage Arrow');
    this.state.socket.emit("chat message", "hi from client arrow");
  };

  render() {
    return (
      <div>
        <Button onClick={this.sendWSMessageArrow}>Yo Arrow</Button>
        Hello World
      </div>
    );
  }
}

export default App;

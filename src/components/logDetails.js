import React from "react";
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

export default function LogDetails({ logs }) {
  console.log("inside log details function");
  return (
    <div>
      <div
        style={{
          float: "right",
          color: "orange",
          width: "70%",
          backgroundColor: "",
          fontFamily: "Arial, Helvetica, sansSerif",
        }}
      >
        <Table>
          <Thead>
            <Tr>
              <Th> LOGS</Th>
            </Tr>
          </Thead>
        </Table>
        <div />
        {' '}
        Log Type:
        {logs.type}
        <br />
        Log Class:
        {' '}
        {logs.class}
        <br />
        Date:
        {' '}
        {logs.timestamp}
        <br />
        <br />
        <Button>Click Here for More Log Info</Button>
        <br />
        <br />
        Console Log:
        <br />
        {logs.log}
        <br />
      </div>
    </div>
  );
}

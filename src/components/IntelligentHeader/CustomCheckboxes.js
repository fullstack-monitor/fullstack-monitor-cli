import React from "react";
import { Checkbox, Stack } from "@chakra-ui/react";

export default function CustomCheckboxes({ checkBoxes, setCheckBoxes }) {
  return (
    <Stack marginTop="10px" marginLeft="20px" spacing={10} direction="row">
      <Checkbox
        onChange={setCheckBoxes}
        value="client"
        isChecked={checkBoxes.client}
      >
        Client Logs
      </Checkbox>
      <Checkbox
        onChange={setCheckBoxes}
        value="server"
        isChecked={checkBoxes.server}
      >
        Server Logs
      </Checkbox>
      <Checkbox
        onChange={setCheckBoxes}
        value="request"
        isChecked={checkBoxes.request}
      >
        Requests
      </Checkbox>
      <Checkbox
        onChange={setCheckBoxes}
        value="response"
        isChecked={checkBoxes.response}
      >
        Responses
      </Checkbox>
    </Stack>
  );
}

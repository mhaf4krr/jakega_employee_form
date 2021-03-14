import React from "react";
import { Table, Button } from "semantic-ui-react";

export default function PostingTable({ data, removeItemFormTable }) {
  let BODY = data.map((item, index) => {
    return (
      <Table.Row textAlign="center" key={item["id"]}>
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell>{item["office_place"]}</Table.Cell>
        <Table.Cell>{item["from"]}</Table.Cell>
        <Table.Cell>{item["to"]}</Table.Cell>

        <Table.Cell>
          <Button
            negative
            onClick={(e) => {
              removeItemFormTable(item["id"]);
            }}
          >
            Remove
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  });
  return (
    <div>
      <Table celled unstackable>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell>S.No</Table.HeaderCell>
            <Table.HeaderCell>Office & Place</Table.HeaderCell>
            <Table.HeaderCell>From</Table.HeaderCell>
            <Table.HeaderCell>To</Table.HeaderCell>
            <Table.HeaderCell>Remove</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{BODY}</Table.Body>
      </Table>
    </div>
  );
}

import React from "react";
import { Table, Button } from "semantic-ui-react";

export default function EducationTable({ data, removeItemFormTable }) {
  let BODY = data.map((item, index) => {
    return (
      <Table.Row textAlign="center" key={item["id"]}>
        <Table.Cell>{index + 1}</Table.Cell>

        <Table.Cell>{item.from}</Table.Cell>
        <Table.Cell>{item.to}</Table.Cell>
        <Table.Cell>{item.country_visited}</Table.Cell>
        <Table.Cell>{item.purpose_of_visit}</Table.Cell>
        <Table.Cell>
          <Button
            negative
            onClick={(e) => {
              removeItemFormTable(item.counter);
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
            <Table.HeaderCell width={3}>S.No</Table.HeaderCell>
            <Table.HeaderCell>From</Table.HeaderCell>
            <Table.HeaderCell>To</Table.HeaderCell>
            <Table.HeaderCell>Country Visited</Table.HeaderCell>
            <Table.HeaderCell>Purpose</Table.HeaderCell>
            <Table.HeaderCell>Remove</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{BODY}</Table.Body>
      </Table>
    </div>
  );
}

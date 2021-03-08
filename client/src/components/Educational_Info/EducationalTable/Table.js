import React from "react";
import { Table, Button } from "semantic-ui-react";

export default function EducationTable({ data, removeItemFormTable }) {
  let BODY = data.map((item, index) => {
    return (
      <Table.Row textAlign="center" key={item["id"]}>
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell>{item["institution"]}</Table.Cell>
        <Table.Cell>{item["address"]}</Table.Cell>
        <Table.Cell>{item["date_of_entering"]}</Table.Cell>
        <Table.Cell>{item["date_of_leaving"]}</Table.Cell>
        <Table.Cell>{item["examination_passed"]}</Table.Cell>
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
            <Table.HeaderCell>Institution</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Date of Joining</Table.HeaderCell>
            <Table.HeaderCell>Date of Leaving</Table.HeaderCell>
            <Table.HeaderCell>Examination Passed</Table.HeaderCell>
            <Table.HeaderCell>Remove</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{BODY}</Table.Body>
      </Table>
    </div>
  );
}

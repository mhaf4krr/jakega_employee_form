import React from "react";
import { Table, Button } from "semantic-ui-react";

export default function EducationTable({ data, removeItemFormTable }) {
  let BODY = data.map((item, index) => {
    return (
      <Table.Row textAlign="center" key={item["id"]}>
        <Table.Cell>{index + 1}</Table.Cell>

        <Table.Cell>{item.country}</Table.Cell>
        <Table.Cell>{item.place}</Table.Cell>
       
        <Table.Cell>{item["period_of_stay"]}</Table.Cell>
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
            <Table.HeaderCell>Country</Table.HeaderCell>
            <Table.HeaderCell>Place</Table.HeaderCell>
         
            <Table.HeaderCell>Period of Stay</Table.HeaderCell>
            <Table.HeaderCell>Remove</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{BODY}</Table.Body>
      </Table>
    </div>
  );
}

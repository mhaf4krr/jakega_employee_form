import React, { Component } from "react";
import PageTemplate from "../../Page_Template/PageTemplate";

import { Header, Form, Select, Button } from "semantic-ui-react";

import { Departments } from "../../../utils/DepartmenListData";

import styles from "./JoiningInformation.module.css";

export default class JoiningInformation extends Component {
  agencyOptions = ["JKPSC", "JKSSB", "OTHER"].map((agency) => {
    return { key: agency, text: agency, value: agency };
  });

  validatedMainSubmission = () => {
    let formData = { ...this.props.form };

    let validated = true;
    let fields = [
      "recruiting_agency",
      "date_of_appointment",
      "order_number",
      "initial_joining_date",
      "initial_joining_office",
      "date_of_joining",
      "designation",
      "employee_initial_cadre",
      "employee_type",
      "employee_category",
    ];

    for (let i = 0; i < fields.length; i++) {
      if (formData[fields[i]] === "" || formData[fields[i]] === null) {
        validated = false;
        break;
      }
    }

    return validated;
  };

  render() {
    let form = this.props.form;
    console.log(form)
    return (
      <PageTemplate>
        <Header as="h2">13. Joining Information </Header>
        <p>Please enter the details of your joining to the service</p>
        <div>
          <Form>
            <Form.Group widths="equal">
              <Form.Field
                required
                selection
                control={Select}
                options={this.agencyOptions}
                selected={form["recruiting_agency"]}
                label={{
                  children: "Recruiting Agency",
                  htmlFor: "form-select-control-agency",
                }}
                placeholder={form["recruiting_agency"] || "Recruiting Agency"}
                onChange={(e, { value }) => {
                  this.props.handleFormFill(
                    "service_details",
                    "recruiting_agency",
                    value,
                    "joining"
                  );
                }}
                searchInput={{ id: "form-select-control-agency" }}
              />

              <Form.Input
                type="date"
                label="Date of Appointment"
                required
                onChange={(e) => {
                  this.props.handleFormFill(
                    "service_details",
                    "date_of_appointment",
                    e.target.value,
                    "joining"
                  );
                }}
                value={form["date_of_appointment"]}
              />

              <Form.Field
                control={Form.Input}
                label="Order No."
                name="order_number"
                required
                onChange={(e) => {
                  this.props.handleFormFill(
                    "service_details",
                    "order_number",
                    e.target.value,
                    "joining"
                  );
                }}
                value={form["order_number"]}
              />

              <Form.Field
                required
                selection
                search
                control={Select}
                options={Departments.map((dept) => {
                  return { value: dept, text: dept, key: dept };
                })}
                selected={form["initial_joining_department"]}
                label={{
                  children: "Initial Joining Department",
                  htmlFor: "form-select-control-joining_department",
                }}
                placeholder={
                  form["joining_department"] || "Initial Joining Dept."
                }
                onChange={(e, { value }) => {
                  this.props.handleFormFill(
                    "service_details",
                    "initial_joining_department",
                    value,
                    "joining"
                  );
                }}
                searchInput={{ id: "form-select-control-joining_department" }}
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field
                control={Form.Input}
                label="Initial Joining Office."
                name="initial_joining_office"
                required
                onChange={(e) => {
                  this.props.handleFormFill(
                    "service_details",
                    "initial_joining_office",
                    e.target.value,
                    "joining"
                  );
                }}
                value={form["initial_joining_office"]}
              />

              <Form.Input
                type="date"
                label="Date of Joining"
                required
                onChange={(e) => {
                  this.props.handleFormFill(
                    "service_details",
                    "date_of_joining",
                    e.target.value,
                    "joining"
                  );
                }}
                value={form["date_of_joining"]}
              />

              <Form.Field
                control={Form.Input}
                label="Designation"
                name="designation"
                required
                onChange={(e) => {
                  this.props.handleFormFill(
                    "service_details",
                    "designation",
                    e.target.value,
                    "joining"
                  );
                }}
                value={form["designation"]}
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field
                required
                selection
                control={Select}
                options={[
                  "STATE",
                  "DIVISION",
                  "DISTRICT",
                  "NOT APPLICABLE",
                ].map((cadre) => {
                  return { value: cadre, text: cadre, key: cadre };
                })}
                selected={form["initial_cadre"]}
                label={{
                  children: "Employee Initial Cadre",
                  htmlFor: "form-select-control-cadre",
                }}
                placeholder={
                  form["employee_initial_cadre"] || "Employee Initial Cadre"
                }
                onChange={(e, { value }) => {
                  this.props.handleFormFill(
                    "service_details",
                    "employee_initial_cadre",
                    value,
                    "joining"
                  );
                }}
                searchInput={{ id: "form-select-control-cadre" }}
              />

              <Form.Field
                required
                selection
                control={Select}
                options={["PERMANENT", "TEMPORARY"].map((cadre) => {
                  return { value: cadre, text: cadre, key: cadre };
                })}
                selected={form["employee_type"]}
                label={{
                  children: "Employee Type",
                  htmlFor: "form-select-control-employee_type",
                }}
                placeholder={form["employee_type"] || "Employee Type"}
                onChange={(e, { value }) => {
                  this.props.handleFormFill(
                    "service_details",
                    "employee_type",
                    value,
                    "joining"
                  );
                }}
                searchInput={{ id: "form-select-control-employee_type" }}
              />

              <Form.Field
                required
                selection
                control={Select}
                options={[
                  "GAZETTED OFFICER",
                  "NON GAZETTED OFFICER",
                  "CLASS 4TH",
                ].map((cadre) => {
                  return { value: cadre, text: cadre, key: cadre };
                })}
                selected={form["employee_category"]}
                label={{
                  children: "Employee Category",
                  htmlFor: "form-select-control-employee_category",
                }}
                placeholder={form["employee_category"] || "Employee Category"}
                onChange={(e, { value }) => {
                  this.props.handleFormFill(
                    "service_details",
                    "employee_category",
                    value,
                    "joining"
                  );
                }}
                searchInput={{ id: "form-select-control-employee_category" }}
              />
            </Form.Group>
          </Form>

          <div className={styles["btn_wrapper"]}>
            <Button.Group>
              <Button
                size="medium"
                color="yellow"
                onClick={(e) => {
                  e.preventDefault();
                  this.props.decrementStep();
                }}
              >
                BACK: (10). ACCOUNTS INFO
              </Button>
              <Button.Or />
              <Button
                size="medium"
                positive
                disabled={!this.validatedMainSubmission()}
                onClick={(e) => {
                  e.preventDefault();

                  if (this.validatedMainSubmission()) {
                   
                    this.props.incrementStep();
                  } else return false;
                }}
              >
                (12). PROMOTIONS INFO : NEXT
              </Button>
            </Button.Group>
          </div>
        </div>
      </PageTemplate>
    );
  }
}

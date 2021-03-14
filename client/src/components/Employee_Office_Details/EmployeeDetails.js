import React from "react";
import {
  Header,
  Form,
  Select,
  Radio,
  TextArea,
  Button,
} from "semantic-ui-react";

import styles from "../General_Info/General.module.css";

import PageTemplate from "../Page_Template/PageTemplate";

export default function EmployeeDetails({
  form,
  handleFormFill,
  incrementStep,
  decrementStep,
}) {
  let validateForm = (form) => {
    let validated = true;
    let fields = [
      "current_designation",
      "current_post",
      "current_cadre",
      "current_office",
      "govt_accomodation_alloted",
    ];
    for (let i = 0; i < fields.length; i++) {
      if (form[fields[i]] === "" || form[fields[i]] === null) {
        validated = false;
        break;
      }
    }

    return validated;
  };
  return (
    <PageTemplate>
      <Header>14. Employee Office Details</Header>
      <div>
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              control={Form.Input}
              label="Current Designation"
              name="current_designation"
              required
              onChange={(e) => {
                handleFormFill(
                  "employee_office_details",
                  "current_designation",
                  e.target.value
                );
              }}
              value={form["current_designation"]}
            />

            <Form.Field
              control={Form.Input}
              label="Current Post"
              name="current_post"
              required
              onChange={(e) => {
                handleFormFill(
                  "employee_office_details",
                  "current_post",
                  e.target.value
                );
              }}
              value={form["current_post"]}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field
              control={Form.Input}
              label="Current Office"
              name="current_office"
              required
              onChange={(e) => {
                handleFormFill(
                  "employee_office_details",
                  "current_office",
                  e.target.value
                );
              }}
              value={form["current_office"]}
            />

            <Form.Field
              required
              control={Select}
              options={["State", "Division", "District", "Other"].map(
                (cadre) => {
                  return { key: cadre, text: cadre, value: cadre };
                }
              )}
              label={{
                children: "Current Cadre",
                htmlFor: "form-select-control-cadre",
              }}
              placeholder={form["current_cadre"] || "Current Cadre"}
              search
              onChange={(e, { value }) => {
                console.log(value);
                handleFormFill(
                  "employee_office_details",
                  "current_cadre",
                  value
                );
              }}
              searchInput={{ id: "form-select-control-cadre" }}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field label="Whether Govt. accomodation alloted in Jammu/Srinagar" />
          </Form.Group>
          <Form.Group>
            <Form.Field width={4}>
              <Radio
                label="Yes Alloted"
                name="accomodationGroup"
                value="alloted"
                checked={form["govt_accomodation_alloted"] === "alloted"}
                onChange={() => {
                  handleFormFill(
                    "employee_office_details",
                    "govt_accomodation_alloted",
                    "alloted"
                  );
                }}
              />
            </Form.Field>
            <Form.Field width={4}>
              <Radio
                label="Not Alloted"
                name="accomodationGroup"
                value="not_alloted"
                checked={form["govt_accomodation_alloted"] === "not_alloted"}
                onChange={() => {
                  handleFormFill(
                    "employee_office_details",
                    "govt_accomodation_alloted",
                    "not_alloted"
                  );
                }}
              />
            </Form.Field>
          </Form.Group>

          <div style={{ paddingTop: "1rem" }}>
            <Form.Field label="Details of Accomodation,if hired" />
            <TextArea
              value={form["accomodation_details"]}
              placeholder="Tell us more"
              onChange={(e) => {
                handleFormFill(
                  "employee_office_details",
                  "accomodation_details",
                  e.target.value
                );
              }}
            />
          </div>

          <div className={styles["btn_wrapper"]}>
            <Button.Group>
              <Button
                size="large"
                color="yellow"
                onClick={(e) => {
                  decrementStep();
                }}
              >
                BACK: 13. JOINING INFO
              </Button>
              <Button.Or />
              <Button
                size="large"
                disabled={!validateForm(form)}
                positive
                onClick={(e) => {
                  e.preventDefault();

                  //CHECK VALIDATION BEFORE SUBMIT

                  if (validateForm) {
                    incrementStep();
                  }
                }}
              >
                15. FAMILY : NEXT
              </Button>
            </Button.Group>
          </div>
        </Form>
      </div>
    </PageTemplate>
  );
}

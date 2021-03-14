import React from "react";
import { Header, Form, Image, Button, Modal, Select } from "semantic-ui-react";
import styles from "./General.module.css";

import default_img from "../../assets/image.png";

import { Departments as DepartmentList } from "../../utils/DepartmenListData";

export default function General({ handleFormFill, form, incrementStep }) {
  let departmentalOptions = DepartmentList.map((department) => {
    return {
      key: department,
      text: department,
      value: department,
    };
  });

  const [open, setOpen] = React.useState(false);
  const [modalMessage, setModalMessgae] = React.useState("");

  function validateInputs(form) {
    console.log(form);

    let validated = true;
    let errorMessgae = "";
    let fields = [
      "name",
      "present_department",
      "parent_department",
      "designation",
      "employee_id",
    ];

    fields.forEach((field) => {
      if (form[field] === "" || form[field] === null) {
        validated = false;
        errorMessgae = `Invalid Input field: ${field}`;
      }
    });

    if (form["photo"] === null) {
      validated = false;
      errorMessgae = `Please upload a proper photograph`;
    }

    if (!validated) {
      setModalMessgae(errorMessgae);
      setOpen(true);
      return false;
    }

    return true;
  }
  return (
    <div className="container">
      <div className={styles["main_wrapper"]}>
        <Modal
          centered={false}
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        >
          <Modal.Header>Please Note</Modal.Header>
          <Modal.Content>
            <Modal.Description>{modalMessage}</Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setOpen(false)}>OK</Button>
          </Modal.Actions>
        </Modal>
        <Header className={styles["heading"]} as="h2">
          1. General Information
        </Header>
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              control={Form.Input}
              label="Name"
              name="name"
              required
              onChange={(e) => {
                handleFormFill("general_information", "name", e.target.value);
              }}
              value={form["name"]}
            />
            <Form.Field
              required
              selection
              search
              control={Select}
              options={departmentalOptions}
              selected={form["present_department"]}
              label={{
                children: "Present Department",
                htmlFor: "form-select-control-present_department",
              }}
              placeholder={form["present_department"]}
              onChange={(e, { value }) => {
                handleFormFill(
                  "general_information",
                  "present_department",
                  value
                );
              }}
              searchInput={{ id: "form-select-control-present_department" }}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              required
              selection
              search
              control={Select}
              options={departmentalOptions}
              selected={form["parent_department"]}
              label={{
                children: "Parent Department",
                htmlFor: "form-select-control-parent_department",
              }}
              placeholder={form["parent_department"]}
              onChange={(e, { value }) => {
                handleFormFill(
                  "general_information",
                  "parent_department",
                  value
                );
              }}
              searchInput={{ id: "form-select-control-parent_department" }}
            />
            <Form.Field
              control={Form.Input}
              label="Designation"
              name="designation"
              required
              onChange={(e) => {
                handleFormFill(
                  "general_information",
                  "designation",
                  e.target.value
                );
              }}
              value={form["designation"]}
            />
            <Form.Field
              control={Form.Input}
              label="Employee ID"
              name="employee_id"
              required
              onChange={(e) => {
                handleFormFill(
                  "general_information",
                  "employee_id",
                  e.target.value
                );
              }}
              value={form["employee_id"]}
            />
          </Form.Group>

          <Form.Group>
            <div className={styles["photo_upload_section"]}>
              <div>
                <Form.Input
                  required
                  type="file"
                  accept=".jpg,jpeg,.png"
                  label="Uplaod Photograph"
                  onChange={(e) => {
                    let file_type = e.target.files[0].type;

                    if (!file_type.includes("image")) {
                      e.target.value = "";
                      return;
                    }

                    handleFormFill(
                      "general_information",
                      "photo",
                      e.target.files[0]
                    );
                  }}
                />

                <p>Affix signed Passport size (5cm x 7cm) recent Photograph</p>
              </div>

              <div>
                <Image
                  src={
                    form["photo"] === null
                      ? default_img
                      : window.URL.createObjectURL(form["photo"])
                  }
                  size="medium"
                />
                <p>Selected Photograph</p>
              </div>
            </div>
          </Form.Group>

          <div className={styles["btn_wrapper"]}>
            <Button
              size="big"
              content="NEXT : Personal Details"
              onClick={(e) => {
                e.preventDefault();
                if (validateInputs(form)) {
                  incrementStep();
                }
              }}
              color="green"
            />
          </div>
        </Form>
      </div>
    </div>
  );
}

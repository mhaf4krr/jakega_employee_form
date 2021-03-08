import React from "react";
import { Header, Form, Button, Modal, Select } from "semantic-ui-react";
import styles from "./Personal.module.css";

export default function General({ handleFormFill, form ,incrementStep , decrementStep }) {
  const [open, setOpen] = React.useState(false);
  const [modalMessage, setModalMessgae] = React.useState("");

  function validateInputs(form) {
    console.log(form);

    let validated = true;
    let errorMessgae = "";
    let fields = ["first_name", "last_name", "middle_name", "sex", "category","blood_group"];

    fields.forEach((field) => {
      if (form[field] === "" || form[field] === undefined || form[field] === null) {
        validated = false;
        errorMessgae = `Invalid Input field: ${field}`;
      }
    });

    

    if (!validated) {
      setModalMessgae(errorMessgae);
      setOpen(true);
      return false
    }

    return true;
  }

  const genderOptions = [
    { key: "m", text: "Male", value: "Male" },
    { key: "f", text: "Female", value: "Female" },
    { key: "o", text: "Other", value: "Other" },
  ];

  const bloodGroupOptions = [
    { key: "A+", text: "A RhD positive (A+)", value: "A+" },
    { key: "A-", text: "A RhD negative (A-)", value: "A-" },
    { key: "B+", text: "B RhD positive(B+)", value: "B+" },
    { key: "B-", text: "B RhD negative (B-)", value: "B-" },
    { key: "O-", text: "O RhD negative (O-)", value: "O-" },
    { key: "O+", text: "O RhD positive (O-)", value: "O+" },
    { key: "AB-", text: "AB RhD negative (AB-)", value: "AB-" },
    { key: "AB+", text: "AB RhD positive (AB+)", value: "AB+" },
  ];

  const categoryOptions = [
    { key: "om", text: "OPEN MERIT ", value: "OPEN MERIT" },
    { key: "sc", text: "SC	SCHEDULED CASTES", value: "SC	SCHEDULED CASTES" },
    {
      key: "stgp",
      text: "SCHEDULED TRIBE, GUJJAR AND BAKERWAL",
      value: "SCHEDULED TRIBE, GUJJAR AND BAKERWAL",
    },
    {
      key: "osc",
      text: "WEAK AND UNDER PRIVILEGED CLASSES/SOCIAL CASTES",
      value: "WEAK AND UNDER PRIVILEGED CLASSES/SOCIAL CASTES",
    },
    { key: "rba", text: "RESIDENTS OF BACKWARD AREA", value: "RESIDENTS OF BACKWARD AREA" },
    {
      key: "alc",
      text: "RESIDENTS OF AREA ADJOINING ACTUAL LINE OF CONTROL",
      value: "RESIDENTS OF AREA ADJOINING ACTUAL LINE OF CONTROL",
    },
    { key: "sp", text: "PROFICIENCY IN SPORTS", value: "PROFICIENCY IN SPORTS" },
    { key: "ews", text: "ECONOMICALLY WEAKER SECTION", value: "ECONOMICALLY WEAKER SECTION" },
  ];

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
          2. Personal Information
        </Header>
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              control={Form.Input}
              label="First Name"
              name="first_name"
              required
              onChange={(e) => {
                handleFormFill(
                  "personal_information",
                  "first_name",
                  e.target.value
                );
              }}
              value={form["first_name"]}
            />
            <Form.Field
              control={Form.Input}
              label="Middle Name"
              name="middle_name"
              required
              onChange={(e) => {
                handleFormFill(
                  "personal_information",
                  "middle_name",
                  e.target.value
                );
              }}
              value={form["middle_name"]}
            />
            <Form.Field
              control={Form.Input}
              label="Last Name"
              name="last_name"
              required
              onChange={(e) => {
                handleFormFill(
                  "personal_information",
                  "last_name",
                  e.target.value
                );
              }}
              value={form["last_name"]}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              required
              control={Select}
              options={genderOptions}
              label={{
                children: "Gender / Sex",
                htmlFor: "form-select-control-gender",
              }}
              placeholder={ form["sex"] || "Gender"}
              onChange={(e, { value }) => {
                handleFormFill("personal_information", "sex", value);
              }}
              searchInput={{ id: "form-select-control-gender" }}
            />
            <Form.Field
              required
              control={Select}
              options={categoryOptions}
              label={{
                children: "Category",
                htmlFor: "form-select-control-category",
              }}
              placeholder={ form["category"] || "Category"}
              search
              onChange={(e, { value }) => {
                handleFormFill("personal_information", "category", value);
              }}
              searchInput={{ id: "form-select-control-category" }}
            />

            <Form.Field
              required
              control={Select}
              options={bloodGroupOptions}
              label={{
                children: "Blood Group",
                htmlFor: "form-select-control-blood",
              }}
              placeholder={ form["blood_group"] || "Blood Group"}
              onChange={(e, { value }) => {
                handleFormFill("personal_information", "blood_group", value);
              }}
              searchInput={{ id: "form-select-control-blood" }}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field
              control={Form.Input}
              label="Alias Name (if any)"
              name="alias_name"
              onChange={(e) => {
                handleFormFill("personal_information", "alias", e.target.value);
              }}
              value={form["alias"]}
            />

            <Form.Field
              control={Form.Input}
              label="Birth Name (if different than actual, any other names used at any stage)"
              name="birth_name"
              onChange={(e) => {
                handleFormFill("personal_information", "birth_name", e.target.value);
              }}
              value={form["birth_name"]}
            />
          </Form.Group>
          <div className={styles["btn_wrapper"]}>
            <Button.Group>
              <Button size="large" color="yellow" onClick={e=>{
                  decrementStep()
              }}>
                BACK: 1. GENERAL INFO
              </Button>
              <Button.Or />
              <Button size="large" positive onClick={e=>{
                  e.preventDefault()
                  
                  //CHECK VALIDATION BEFORE SUBMIT

                  if(validateInputs(form)){
                      incrementStep()
                  }
              }}>
                 3. ADDRESS INFO : NEXT
              </Button>
            </Button.Group>
          </div>
        </Form>
      </div>
    </div>
  );
}

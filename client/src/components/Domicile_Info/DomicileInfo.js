import React from "react";
import { Header, Form, Image, Button, Modal } from "semantic-ui-react";
import styles from "./Domicile.module.css";

import default_img from "../../assets/image.png";

export default function DomicileInfo({
  handleFormFill,
  form,
  incrementStep,
  decrementStep,
}) {
  const [open, setOpen] = React.useState(false);
  const [modalMessage, setModalMessgae] = React.useState("");

  function validateInputs(form) {
    console.log(form);

    let validated = true;
    let errorMessgae = "";
    let fields = ["certificate_no", "issuing_authority"];

    fields.forEach((field) => {
      if (form[field] === "" || form[field] === undefined) {
        validated = false;
        errorMessgae = `Invalid Input field: ${field}`;
      }
    });

    if (form["photo"] === null) {
      validated = false;
      errorMessgae = `Please upload Domicile's Photo`;
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
          4. Domicile Related Information
        </Header>
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              control={Form.Input}
              label="Domicile Certificate No."
              name="certificate_no"
              required
              onChange={(e) => {
                handleFormFill(
                  "domicile_information",
                  "certificate_no",
                  e.target.value
                );
              }}
              value={form["certificate_no"]}
            />
            <Form.Field
              control={Form.Input}
              label="Issuing Authority"
              name="issuing_authority"
              required
              onChange={(e) => {
                handleFormFill(
                  "domicile_information",
                  "issuing_authority",
                  e.target.value
                );
              }}
              value={form["issuing_authority"]}
            />
          </Form.Group>

          <Form.Group>
            <Form.Input
              required
              type="file"
              accept=".jpg,jpeg,.png"
              label="Uplaod Domicile Certificate's Photo"
              onChange={(e) => {
                let file_type = e.target.files[0].type;

                if (!file_type.includes("image")) {
                  e.target.value = "";
                  return;
                }

                handleFormFill(
                  "domicile_information",
                  "photo",
                  e.target.files[0]
                );
              }}
            />
          </Form.Group>
          <div>
            <Image
              src={
                form["photo"] === null
                  ? default_img
                  : window.URL.createObjectURL(form["photo"])
              }
              size="large"
            />
            <p>Selected Domicile Certificate Photograph</p>
          </div>

          <div className={styles["btn_wrapper"]}>
            <Button.Group>
              <Button
                size="medium"
                color="yellow"
                onClick={(e) => {
                  decrementStep();
                }}
              >
                BACK: 3. ADDRESS INFO
              </Button>
              <Button.Or />
              <Button
                size="medium"
                positive
                onClick={(e) => {
                  e.preventDefault();

                  //CHECK VALIDATION BEFORE SUBMIT

                  if (validateInputs(form)) {
                    incrementStep();
                  }
                }}
              >
                5. ACADEMIC INFO : NEXT
              </Button>
            </Button.Group>
          </div>
        </Form>
      </div>
    </div>
  );
}

import React from "react";
import { Header, Form, Button, Modal,} from "semantic-ui-react";
import styles from "./Social.module.css";

export default function General({
  handleFormFill,
  form,
  incrementStep,
  decrementStep,
}) {
  const [open, setOpen] = React.useState(false);
  const [modalMessage, setModalMessgae] = React.useState("");

  function validateInputs(form) {
    console.log(form);
    if (form["email"] !== "") {
      return true;
    } else return false;
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
          7. Electronic Communication Information
        </Header>
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              control={Form.Input}
              type="email"
              label="Email"
              name="email"
              required
              onChange={(e) => {
                handleFormFill("social_information", "email", e.target.value);
              }}
              value={form["email"]}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              control={Form.Input}
              label="Facebook Username"
              name="fb"
              onChange={(e) => {
                handleFormFill("social_information", "fb", e.target.value);
              }}
              value={form["fb"]}
            />

            <Form.Field
              control={Form.Input}
              label="Twitter Username"
              name="twitter"
              onChange={(e) => {
                handleFormFill("social_information", "twitter", e.target.value);
              }}
              value={form["twitter"]}
            />

            <Form.Field
              control={Form.Input}
              label="WhatsApp Number"
              name="whatsapp"
              onChange={(e) => {
                handleFormFill(
                  "social_information",
                  "whatsapp",
                  e.target.value
                );
              }}
              value={form["whatsapp"]}
            />
          </Form.Group>

          <div className={styles["btn_wrapper"]}>
            <Button.Group>
              <Button
                size="medium"
                color="yellow"
                onClick={(e) => {
                  e.preventDefault();
                  decrementStep();
                }}
              >
                BACK: (6). MOBILE NUMBERS
              </Button>
              <Button.Or />
              <Button
                size="medium"
                positive
                disabled={!validateInputs(form)}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                (6). LEGAL INFORMATION : NEXT
              </Button>
            </Button.Group>
          </div>
        </Form>
      </div>
    </div>
  );
}

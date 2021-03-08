import React from "react";
import { Header, Form, Button, Modal, Select } from "semantic-ui-react";
import styles from "./Address.module.css";

export default function General({
  handleFormFill,
  form,
  incrementStep,
  decrementStep,
}) {
  const [open, setOpen] = React.useState(false);
  const [modalMessage, setModalMessgae] = React.useState("");

  let districtOptions = [
    { key: "kathua", text: "Kathua", value: "kathua" },
    { key: "jammu", text: "Jammu", value: "jammu" },
    { key: "samba", text: "Samba", value: "samba" },
    { key: "udhampur", text: "Udhampur", value: "udhampur" },
    { key: "reasi", text: "Reasi", value: "reasi" },
    { key: "rajouri", text: "Rajouri", value: "rajouri" },
    { key: "poonch", text: "Poonch", value: "poonch" },
    { key: "doda", text: "Doda", value: "doda" },
    { key: "ramban", text: "Ramban", value: "Ramban" },
    { key: "kishtwar", text: "Doda", value: "kishtwar" },
    { key: "anantnag", text: "Anantnag", value: "anantnag" },
    { key: "kulgam", text: "Kulgam", value: "kulgam" },
    { key: "pulwama", text: "Pulwama", value: "pulwama" },
    { key: "shopian", text: "Shopian", value: "shopian" },
    { key: "budgam", text: "Budgam", value: "budgam" },
    { key: "Srinagar", text: "Srinagar", value: "srinagar" },
    { key: "Ganderbal", text: "Ganderbal", value: "ganderbal" },
    { key: "Bandipora", text: "Bandipora", value: "bandipora" },
    { key: "Baramulla", text: "Baramulla", value: "baramulla" },
    { key: "Kupwara", text: "Kupwara", value: "kupwara" },
    { key: "outside", text: "Outise JK UT", value: "NA" },
  ];

  function validateInputs(form) {
    console.log(form);

    let validated = true;
    let errorMessgae = "";
    let fields = [
      "house",
      "locality",
      "town_village",
      "police_station",
      "post_office",
      "district",
      "state_ut",
    ];

    let sections = ["present_address", "permanent_address"];

    sections.forEach((section) => {
      fields.forEach((field) => {
        if (
          form[section][field] === "" ||
          form[section][field] === undefined ||
          form[section][field] === null
        ) {
          validated = false;
          errorMessgae = `Please correct ${field.toUpperCase()} in ${section.toUpperCase()}`;
        }
      });
    });

    if (!validated) {
      setModalMessgae(errorMessgae);
      setOpen(true);
      return false;
    }

    return true;
  }

  console.log(form);
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
          3. Address Related Information
        </Header>
        <Form>
          <Header as="h4">(i) Present Address</Header>
          <Form.Group widths="equal">
            <Form.Field
              control={Form.Input}
              label="House No./Name"
              name="house"
              required
              onChange={(e) => {
                handleFormFill(
                  "address_information",
                  "house",
                  e.target.value,
                  "present_address"
                );
              }}
              value={form["present_address"]["house"]}
            />
            <Form.Field
              control={Form.Input}
              label="Locality / Street"
              name="locality"
              required
              onChange={(e) => {
                handleFormFill(
                  "address_information",
                  "locality",
                  e.target.value,
                  "present_address"
                );
              }}
              value={form["present_address"]["locality"]}
            />
            <Form.Field
              control={Form.Input}
              label="Town/Village"
              name="house"
              required
              onChange={(e) => {
                handleFormFill(
                  "address_information",
                  "town_village",
                  e.target.value,
                  "present_address"
                );
              }}
              value={form["present_address"]["town_village"]}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field
              control={Form.Input}
              label="Police Station"
              name="police_station"
              required
              onChange={(e) => {
                handleFormFill(
                  "address_information",
                  "police_station",
                  e.target.value,
                  "present_address"
                );
              }}
              value={form["present_address"]["police_station"]}
            />
            <Form.Field
              control={Form.Input}
              label="Post Office"
              name="post_office"
              required
              onChange={(e) => {
                handleFormFill(
                  "address_information",
                  "post_office",
                  e.target.value,
                  "present_address"
                );
              }}
              value={form["present_address"]["post_office"]}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field
              required
              selection
              control={Select}
              options={districtOptions}
              selected={form["present_address"]["district"]}
              label={{
                children: "District",
                htmlFor: "form-select-control-district",
              }}
              placeholder={form["present_address"]["district"] || "District"}
              onChange={(e, { value }) => {
                handleFormFill(
                  "address_information",
                  "district",
                  value,
                  "present_address"
                );
              }}
              searchInput={{ id: "form-select-control-district" }}
            />
            <Form.Field
              control={Form.Input}
              label="State / UT"
              name="state_ut"
              required
              onChange={(e) => {
                handleFormFill(
                  "address_information",
                  "state_ut",
                  e.target.value,
                  "present_address"
                );
              }}
              value={form["present_address"]["state_ut"]}
            />
          </Form.Group>

          {/********** Permanent Address********/}

          <div className={styles["sub_form"]}>
            <Header as="h4">(ii) Permanent Address</Header>
            <Form.Group widths="equal">
              <Form.Field
                control={Form.Input}
                label="House No./Name"
                name="house"
                required
                onChange={(e) => {
                  handleFormFill(
                    "address_information",
                    "house",
                    e.target.value,
                    "permanent_address"
                  );
                }}
                value={form["permanent_address"]["house"]}
              />
              <Form.Field
                control={Form.Input}
                label="Locality / Street"
                name="locality"
                required
                onChange={(e) => {
                  handleFormFill(
                    "address_information",
                    "locality",
                    e.target.value,
                    "permanent_address"
                  );
                }}
                value={form["permanent_address"]["locality"]}
              />
              <Form.Field
                control={Form.Input}
                label="Town/Village"
                name="house"
                required
                onChange={(e) => {
                  handleFormFill(
                    "address_information",
                    "town_village",
                    e.target.value,
                    "permanent_address"
                  );
                }}
                value={form["permanent_address"]["town_village"]}
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field
                control={Form.Input}
                label="Police Station"
                name="police_station"
                required
                onChange={(e) => {
                  handleFormFill(
                    "address_information",
                    "police_station",
                    e.target.value,
                    "permanent_address"
                  );
                }}
                value={form["permanent_address"]["police_station"]}
              />
              <Form.Field
                control={Form.Input}
                label="Post Office"
                name="post_office"
                required
                onChange={(e) => {
                  handleFormFill(
                    "address_information",
                    "post_office",
                    e.target.value,
                    "permanent_address"
                  );
                }}
                value={form["permanent_address"]["post_office"]}
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field
                required
                selection
                control={Select}
                options={districtOptions}
                selected={form["permanent_address"]["district"]}
                label={{
                  children: "District",
                  htmlFor: "form-select-control-district",
                }}
                placeholder={
                  form["permanent_address"]["district"] || "District"
                }
                onChange={(e, { value }) => {
                  handleFormFill(
                    "address_information",
                    "district",
                    value,
                    "permanent_address"
                  );
                }}
                searchInput={{ id: "form-select-control-district" }}
              />
              <Form.Field
                control={Form.Input}
                label="State / UT"
                name="state_ut"
                required
                onChange={(e) => {
                  handleFormFill(
                    "address_information",
                    "state_ut",
                    e.target.value,
                    "permanent_address"
                  );
                }}
                value={form["permanent_address"]["state_ut"]}
              />
            </Form.Group>
          </div>
          {/********** Native /  Address********/}

          <div className={styles["sub_form"]}>
            <div>
              <Header as="h4">(iii) Origin / Address</Header>
              <p>
                Please mention original native place, if the family has migrated
                after 01.01.1990
              </p>
            </div>

            <Form.Group widths="equal">
              <Form.Field
                control={Form.Input}
                label="House No./Name"
                name="house"
                onChange={(e) => {
                  handleFormFill(
                    "address_information",
                    "house",
                    e.target.value,
                    "original_native_address"
                  );
                }}
                value={form["original_native_address"]["house"]}
              />
              <Form.Field
                control={Form.Input}
                label="Locality / Street"
                name="locality"
                onChange={(e) => {
                  handleFormFill(
                    "address_information",
                    "locality",
                    e.target.value,
                    "original_native_address"
                  );
                }}
                value={form["original_native_address"]["locality"]}
              />
              <Form.Field
                control={Form.Input}
                label="Town/Village"
                name="house"
                onChange={(e) => {
                  handleFormFill(
                    "address_information",
                    "town_village",
                    e.target.value,
                    "original_native_address"
                  );
                }}
                value={form["original_native_address"]["town_village"]}
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field
                control={Form.Input}
                label="Police Station"
                name="police_station"
                onChange={(e) => {
                  handleFormFill(
                    "address_information",
                    "police_station",
                    e.target.value,
                    "original_native_address"
                  );
                }}
                value={form["original_native_address"]["police_station"]}
              />
              <Form.Field
                control={Form.Input}
                label="Post Office"
                name="post_office"
                onChange={(e) => {
                  handleFormFill(
                    "address_information",
                    "post_office",
                    e.target.value,
                    "original_native_address"
                  );
                }}
                value={form["original_native_address"]["post_office"]}
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field
                selection
                control={Select}
                options={districtOptions}
                selected={form["original_native_address"]["district"]}
                label={{
                  children: "District",
                  htmlFor: "form-select-control-district",
                }}
                placeholder={
                  form["original_native_address"]["district"] || "District"
                }
                onChange={(e, { value }) => {
                  handleFormFill(
                    "address_information",
                    "district",
                    value,
                    "original_native_address"
                  );
                }}
                searchInput={{ id: "form-select-control-district" }}
              />
              <Form.Field
                control={Form.Input}
                label="State / UT"
                name="state_ut"
                onChange={(e) => {
                  handleFormFill(
                    "address_information",
                    "state_ut",
                    e.target.value,
                    "original_native_address"
                  );
                }}
                value={form["original_native_address"]["state_ut"]}
              />
            </Form.Group>
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
                BACK: (2). PERSONAL INFO
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
                (3). DOMICILE INFO : NEXT
              </Button>
            </Button.Group>
          </div>
        </Form>
      </div>
    </div>
  );
}

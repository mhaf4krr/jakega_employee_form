import React from "react";
import { Header, Form, Button, Modal, Select } from "semantic-ui-react";
import styles from "./General.module.css";



import {data as Nationality} from "../../utils/NationalityData"

import {religions} from "../../utils/ReligionsData"

export default function LegalInfo({ handleFormFill, form, incrementStep,decrementStep }) {
  console.log(form)
  let nationalityOptions = Nationality.map((nation) => {
    return {
      key: nation,
      text: nation,
      value: nation,
    };
  });

  let religionOptions = religions.map((religion)=>{
    return {
      key: religion,
      text: religion,
      value: religion,
    };
  })

  const [open, setOpen] = React.useState(false);
  const [modalMessage, setModalMessgae] = React.useState("");

  function validateInputs(form) {
    console.log(form);

    let validated = true;
    let errorMessgae = "";
    let fields = [
      "pan_number",
      "aadhaar_number",
      "date_of_birth",
      "place_of_birth",
      "nationality",
      "religion",
    ];

    fields.forEach((field) => {
      if (form[field] === "" || form[field] === null) {
        validated = false;
        errorMessgae = `Invalid Input field: ${field}`;
      }
    });

   
    if (!validated) {
      setModalMessgae(errorMessgae);
      setOpen(true);
      return false;
    }

    return true;
   
  }


  let validateForBtn = (form)=>{
    let validated=true
    let fields = [
      "pan_number",
      "aadhaar_number",
      "date_of_birth",
      "place_of_birth",
      "nationality",
      "religion",
    ];
    fields.forEach((field) => {
      if (form[field] === "" || form[field] === null) {
      
        validated = false;
      }
    });


    console.log(validated)

    return validated

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
          9. Legal Information
        </Header>
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              control={Form.Input}
              label="PAN Number"
              name="pan_number"
              required
              onChange={(e) => {
                handleFormFill("legal_info", "pan_number", e.target.value);
              }}
              value={form["pan_number"]}
            />
            <Form.Field
              control={Form.Input}
              label="Aadhaar Number"
              name="aadhaar"
              required
              onChange={(e) => {
                handleFormFill("legal_info", "aadhaar_number", e.target.value);
              }}
              value={form["aadhaar_number"]}
            />

            <Form.Field
              control={Form.Input}
              label="Passport Number"
              name="passport_number"
          
              onChange={(e) => {
                handleFormFill("legal_info", "passport_number", e.target.value);
              }}
              value={form["passport_number"]}
            />
          </Form.Group>
          <Form.Group widths="equal">
          <Form.Input
                  type="date"
                  label="Date of Birth"
                  required
                  onChange={(e) =>
                    handleFormFill("legal_info", "date_of_birth",e.target.value)
                  }
                  value={form["date_of_entering"]}
                />
           
             <Form.Field
              required
              control={Select}
              options={nationalityOptions}
              label={{
                children: "Nationality",
                htmlFor: "form-select-control-nationality",
              }}
              placeholder={ form["nationality"] || "Nationality"}
              search
              onChange={(e, { value }) => {
                console.log(value)
                handleFormFill("legal_info", "nationality", value);
              }}
              searchInput={{ id: "form-select-control-nationality" }}
            />


<Form.Field
              required
              control={Select}
              options={religionOptions}
              label={{
                children: "Religion",
                htmlFor: "form-select-control-religion",
              }}
              placeholder={ form["religion"] || "Religion"}
              search
              onChange={(e, { value }) => {
                console.log(value)
                handleFormFill("legal_info", "religion", value);
              }}
              searchInput={{ id: "form-select-control-religion" }}
            />
          </Form.Group>

              <Form.Group>
              <Form.Field
              control={Form.Input}
              label="Place of Birth [Village/Town,District,State,Country]"
              name="place_of_birth"
              required
              onChange={(e) => {
                handleFormFill(
                  "legal_info",
                  "place_of_birth",
                  e.target.value
                );
              }}
              value={form["place_of_birth"]}
            />
              </Form.Group>
         

          <div className={styles["btn_wrapper"]}>
            <Button.Group>
              <Button size="large" color="yellow" onClick={e=>{
                  decrementStep()
              }}>
                BACK: 8. VEHICLE INFO
              </Button>
              <Button.Or />
              <Button size="large" disabled={!validateForBtn(form)} positive onClick={e=>{
                  e.preventDefault()
                  
                  //CHECK VALIDATION BEFORE SUBMIT

                  if(validateInputs(form)){
                      incrementStep()
                  }
              }}>
                 10. BANK/PO INFO : NEXT
              </Button>
            </Button.Group>
          </div>
        </Form>
      </div>
    </div>
  );
}

import React, { Component } from "react";

import styles from "./Educational.module.css";

import Modal from "../../../utils/Modal/Modal";

import { Header, Form, Button, TextArea, Select } from "semantic-ui-react";

import Table from "./EmploymentsTable/Table";



export default class PreviousEmployments extends Component {
  state = {
    modalOpen: false,
    counter: 0,
    employments: [],
    current_emplyment: {
      from: null,
      to: null,
      designation: "",
      emoluments:"",
      nature_of_employment:"",
      details_of_employer:"",
      reasons_for_leaving:""
      
 
    },
  };

  componentDidMount() {
    let employments_data = this.props.form;

    // If some previous information exists, just initialize state to that

    if (employments_data.length > 0) {
      this.setState({ employments: [...employments_data] });
    }

    return;
  }

  handleLocalFormFill = (key, value) => {
    let form = { ...this.state.current_emplyment };

    if (value === null) {
      return;
    }

    form[key] = value;
    this.setState({ current_emplyment: { ...form } });
  };

  validatedMainSubmission = () => {
    let employments = this.state.employments;
    if (employments.length > 0) {
      return true;
    } else return false;
  };

  removeItemFormTable = (counter) => {
    let employments_data = [...this.state.employments];

    employments_data = employments_data.filter((member) => {
      return member.counter !== counter;
    });

    this.setState({ employments: [...employments_data] });
  };

  validated = () => {
    let form = this.state.current_emplyment;
    let validated = true;
    let fields = Object.keys(form)

    for (let i = 0; i < fields.length; i++) {
      if (form[fields[i]] === "" || form[fields[i]] === null) {
        validated = false;
     
        break;
      }
    }

    return validated;
  };

  storeCurrentIntoArray = () => {
    let temp = this.state.counter + 1;
    let current = {
      ...this.state.current_emplyment,
      counter: this.state.counter,
    };
    this.setState({
      employments: [...this.state.employments, current],
      counter: temp,
    });
  };

  clearExistingForm = () => {
    let current_data = this.state.current_emplyment;
    let fields = Object.keys(current_data);

    for (let i = 0; i < fields.length; i++) {
      current_data[fields[i]] = "";
    }

   

    this.setState({ current_emplyment: { ...current_data } });
  };

  changeModal = (state) => {
    let modal = state === "open" ? true : false;
    this.setState({ modalOpen: modal });
  };
  render() {
    let { incrementStep, decrementStep, handleArrayFill } = {
      ...this.props,
    };

    let form = this.state.current_emplyment;

    return (
      <div className="container">
        <div className={styles["main_wrapper"]}>
          <Modal
            modalState={this.state.modalOpen}
            modalMessage="Add Previous Employment Details"
            closeModal={() => this.changeModal("close")}
          >
            <Form>
              <Form.Group widths="equal">
                

<Form.Input
                  type="date"
                  label="From"
                  required
                  onChange={(e) =>
                    this.handleLocalFormFill("from", e.target.value)
                  }
                  value={form["from"]}
                />



<Form.Input
                  type="date"
                  label="To"
                  required
                  onChange={(e) =>
                    this.handleLocalFormFill("to", e.target.value)
                  }
                  value={form["to"]}
                />

                <Form.Field
                  control={Form.Input}
                  label="Designation"
                  name="designation"
                  required
                  onChange={(e) => {
                    this.handleLocalFormFill("designation", e.target.value);
                  }}
                  value={form["designation"]}
                />

<Form.Field
                  required
                  control={Select}
                  options={[
                    "Central Govt.",
                    "State Govt.",
                    "Semi Govt",
                    "Quasi Govt.",
                    "Autonomous Body",
                    "Public Sector Undertaking",
                    "Private Firm",
                    "Public Project"
                  
                  ].map((item) => {
                    return { key: item, text: item, value: item };
                  })}
                  label={{
                    children: "Nature of Employment",
                    htmlFor: "form-select-control-nature",
                  }}
                  placeholder={form["nature_of_employment"] || "Nature of Employment"}
                  search
                  onChange={(e, { value }) => {
                    console.log(value);
                    this.handleLocalFormFill("nature_of_employment", value);
                  }}
                  searchInput={{ id: "form-select-control-nature" }}
                />

                
              </Form.Group>

           

              

              <Form.Field label="Emoluments" />
              <Form.Group>
                <TextArea
                  required
                  value={form["emoluments"]}
                  placeholer="Address"
                  onChange={(e) => {
                    this.handleLocalFormFill("emoluments", e.target.value);
                  }}
                />

              </Form.Group>

              <Form.Field label="Details of Employer" />
              <Form.Group>
                <TextArea
                  required
                  value={form["details_of_employer"]}
                  placeholer="Details of Employer"
                  onChange={(e) => {
                    this.handleLocalFormFill("details_of_employer", e.target.value);
                  }}
                />

              </Form.Group>


              <Form.Field label="Reasons for Leaving previous Service" />
              <Form.Group>
                <TextArea
                  required
                 value={form["reasons_for_leaving"]}
                  onChange={(e) => {  
                    this.handleLocalFormFill("reasons_for_leaving", e.target.value);
                  }}
                />

              </Form.Group>


              

              <Form.Group>
                <Button
                  positive
                  disabled={!this.validated()}
                  onClick={(e) => {
                    e.preventDefault();
                    if (this.validated()) {
                      this.storeCurrentIntoArray();
                      this.setState({ modalOpen: false });
                      this.clearExistingForm();
                    }
                  }}
                >
                  Add Detail to List
                </Button>
              </Form.Group>
            </Form>
          </Modal>

          <Header as="h2">26. Particulars of Previous Employments</Header>
          <p>Details of previous employments under central or state Government or state Government or a semi Government or a Quasi Government body or an autonomous bodu or a Public Sector undertaking or a Private Firm or Public Projects:</p>

          <Button
            positive
            onClick={(e) => {
              this.setState({
                modalOpen: true,
              });
            }}
          >
            Add Previous Employemnt
          </Button>
        </div>
        <Table
          removeItemFormTable={this.removeItemFormTable}
          data={this.state.employments}
        />

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
              BACK: (24). NRI FAMILY
            </Button>
            <Button.Or />
            <Button
              size="medium"
              positive
            
              onClick={(e) => {
                e.preventDefault();

                if (true) {
                  handleArrayFill(
                    "particulars_information",
                    [...this.state.employments],
                    "previous_employments"
                  );
                  incrementStep();
                } else return false;
              }}
            >
              26 PREVIOUS EMPLOYMENT: NEXT
            </Button>
          </Button.Group>
        </div>
      </div>
    );
  }
}

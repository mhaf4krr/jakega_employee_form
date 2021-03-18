import React, { Component } from "react";

import styles from "./Educational.module.css";

import Modal from "../../../utils/Modal/Modal";

import { Header, Form, Button, TextArea, Select } from "semantic-ui-react";

import Table from "./ChildrenTable/Table";

import {countries} from "../../../utils/NationalityData"

export default class ChildrenAbroad extends Component {
  state = {
    modalOpen: false,
    counter: 0,
    nri_children: [],
    current_nri_child: {
      relation: null,
      name: "",
      occupation: "",
      country:null,
      details_of_employer_university:"",
      present_address: "",
      
 
    },
  };

  componentDidMount() {
    let nri_children_data = this.props.form;

    // If some previous information exists, just initialize state to that

    if (nri_children_data.length > 0) {
      this.setState({ nri_children: [...nri_children_data] });
    }

    return;
  }

  handleLocalFormFill = (key, value) => {
    let form = { ...this.state.current_nri_child };

    if (value === null) {
      return;
    }

    form[key] = value;
    this.setState({ current_nri_child: { ...form } });
  };

  validatedMainSubmission = () => {
    let nri_children = this.state.nri_children;
    if (nri_children.length > 0) {
      return true;
    } else return false;
  };

  removeItemFormTable = (counter) => {
    let nri_children_data = [...this.state.nri_children];

    nri_children_data = nri_children_data.filter((member) => {
      return member.counter !== counter;
    });

    this.setState({ nri_children: [...nri_children_data] });
  };

  validated = () => {
    let form = this.state.current_nri_child;
    let validated = true;
    let fields = ["occupation", "name","details_of_employer_university", "present_address", "relation",];

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
      ...this.state.current_nri_child,
      counter: this.state.counter,
    };
    this.setState({
      nri_children: [...this.state.nri_children, current],
      counter: temp,
    });
  };

  clearExistingForm = () => {
    let current_data = this.state.current_nri_child;
    let fields = Object.keys(current_data);

    for (let i = 0; i < fields.length; i++) {
      current_data[fields[i]] = "";
    }

    current_data["relation"] = null;

    this.setState({ current_nri_child: { ...current_data } });
  };

  changeModal = (state) => {
    let modal = state === "open" ? true : false;
    this.setState({ modalOpen: modal });
  };
  render() {
    let { incrementStep, decrementStep, handleArrayFill } = {
      ...this.props,
    };

    let form = this.state.current_nri_child;

    return (
      <div className="container">
        <div className={styles["main_wrapper"]}>
          <Modal
            modalState={this.state.modalOpen}
            modalMessage="Add a Family Member NRI"
            closeModal={() => this.changeModal("close")}
          >
            <Form>
              <Form.Group widths="equal">
                <Form.Field
                  required
                  control={Select}
                  options={[
                    
                    "Son",
               
                    "Daughter",
                 
                    "Step Son",
                    "Step Daughter",

                    
                   
                  ].map((relation) => {
                    return { key: relation, text: relation, value: relation };
                  })}
                  label={{
                    children: "Relation",
                    htmlFor: "form-select-control-relation",
                  }}
                  placeholder={form["relation"] || "Relation"}
                  search
                  onChange={(e, { value }) => {
                    console.log(value);
                    this.handleLocalFormFill("relation", value);
                  }}
                  searchInput={{ id: "form-select-control-relation" }}
                />

<Form.Field
                  required
                  control={Select}
                  options={countries.map((country) => {
                  return { key: country.name, text: country.name, value: country.name };
                  })}
                  label={{
                    children: "Country",
                    htmlFor: "form-select-control-country",
                  }}
                  placeholder={form["country"] || "Country"}
                  search
                  onChange={(e, { value }) => {
                    console.log(value);
                    this.handleLocalFormFill("country", value);
                  }}
                  searchInput={{ id: "form-select-control-country" }}
                />

                <Form.Field
                  control={Form.Input}
                  label="Name"
                  name="name"
                  required
                  onChange={(e) => {
                    this.handleLocalFormFill("name", e.target.value);
                  }}
                  value={form["name"]}
                />

                <Form.Field
                  control={Form.Input}
                  label="Occupation"
                  name="occupation"
                  required
                  onChange={(e) => {
                    this.handleLocalFormFill("occupation", e.target.value);
                  }}
                  value={form["occupation"]}
                />
              </Form.Group>

              

              <Form.Field label="Present Address" />
              <Form.Group>
                <TextArea
                  required
                  placeholer="Address"
                  onChange={(e) => {
                    this.handleLocalFormFill("present_address", e.target.value);
                  }}
                />

              </Form.Group>

              <Form.Field label="Employer Details or Course and Instition Details (if pursuing education)" />
              <Form.Group>
                <TextArea
                  required
                  placeholer="details_of_employer_university"
                  onChange={(e) => {
                    this.handleLocalFormFill("details_of_employer_university", e.target.value);
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
                  Add Family Member
                </Button>
              </Form.Group>
            </Form>
          </Modal>

          <Header as="h2">25. Particulars of Children Abroad (STUDYING / LIVING / WORKING)</Header>
          <p>Please enter the details of children STUDYING / LIVING / WORKING abroad</p>

          <Button
            positive
            onClick={(e) => {
              this.setState({
                modalOpen: true,
              });
            }}
          >
            Add Child Detail
          </Button>
        </div>
        <Table
          removeItemFormTable={this.removeItemFormTable}
          data={this.state.nri_children}
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
                    [...this.state.nri_children],
                    "children_abroad"
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

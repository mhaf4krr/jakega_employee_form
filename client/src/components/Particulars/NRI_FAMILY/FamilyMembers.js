import React, { Component } from "react";

import styles from "./Educational.module.css";

import Modal from "../../../utils/Modal/Modal";

import { Header, Form, Button, TextArea, Select } from "semantic-ui-react";

import Table from "./FamilyTable/Table";

import {countries} from "../../../utils/NationalityData"

export default class NRIFamilyMembers extends Component {
  state = {
    modalOpen: false,
    counter: 0,
    nri_family_members: [],
    current_nri_family_member: {
      relation: null,
      name: "",
      occupation: "",
      place_of_birth:null,
      present_address: "",
      nationality:null,
      relevant_info:""
    },
  };

  componentDidMount() {
    let nri_family_members_data = this.props.form;

    // If some previous information exists, just initialize state to that

    if (nri_family_members_data.length > 0) {
      this.setState({ nri_family_members: [...nri_family_members_data] });
    }

    return;
  }

  handleLocalFormFill = (key, value) => {
    let form = { ...this.state.current_nri_family_member };

    if (value === null) {
      return;
    }

    form[key] = value;
    this.setState({ current_nri_family_member: { ...form } });
  };

  validatedMainSubmission = () => {
    let nri_family_members = this.state.nri_family_members;
    if (nri_family_members.length > 0) {
      return true;
    } else return false;
  };

  removeItemFormTable = (counter) => {
    let nri_family_members_data = [...this.state.nri_family_members];

    nri_family_members_data = nri_family_members_data.filter((member) => {
      return member.counter !== counter;
    });

    this.setState({ nri_family_members: [...nri_family_members_data] });
  };

  validated = () => {
    let form = this.state.current_nri_family_member;
    let validated = true;
    let fields = ["occupation", "name","relevant_info", "present_address", "relation","place_of_birth","nationality"];

    for (let i = 0; i < fields.length; i++) {
      if (form[fields[i]] === "" || form[fields[i]] === null) {
        validated = false;
        console.error("probelm with",fields[i])
        break;
      }
    }

    return validated;
  };

  storeCurrentIntoArray = () => {
    let temp = this.state.counter + 1;
    let current = {
      ...this.state.current_nri_family_member,
      counter: this.state.counter,
    };
    this.setState({
      nri_family_members: [...this.state.nri_family_members, current],
      counter: temp,
    });
  };

  clearExistingForm = () => {
    let current_data = this.state.current_nri_family_member;
    let fields = Object.keys(current_data);

    for (let i = 0; i < fields.length; i++) {
      current_data[fields[i]] = "";
    }

    current_data["relation"] = null;

    this.setState({ current_nri_family_member: { ...current_data } });
  };

  changeModal = (state) => {
    let modal = state === "open" ? true : false;
    this.setState({ modalOpen: modal });
  };
  render() {
    let { incrementStep, decrementStep, handleArrayFill } = {
      ...this.props,
    };

    let form = this.state.current_nri_family_member;

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
                    "Father",
                    "Mother",
                    "Wife",
                    "Husband",
                    "Son",
                    "Brother",
                    "Daughter",
                    "Sister",
                    "Step Son",
                    "Step Daughter",

                    "Uncle Maternal",
                    "Aunt Maternal",
                    "Uncle Paternal",
                    "Aunt Paternal",
                    "Grandfather Maternal",
                    "Grandmother Maternal",
                    
                    "Grandfather Paternal",
                    "Grandmother Paternal",
                    
                    "Nephew Paternal",
                    "Neice Paternal",
                    "Nephew Maternal",
                    "Neice Maternal"
                   
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
                  label="Occupation / Employer Details"
                  name="occupation"
                  required
                  onChange={(e) => {
                    this.handleLocalFormFill("occupation", e.target.value);
                  }}
                  value={form["occupation"]}
                />
              </Form.Group>

              <Form.Group>
              <Form.Field
                  required
                  control={Select}
                  options={countries.map((country) => {
                    return { key: country.name, text: country.name, value: country.name };
                  })}
                  label={{
                    children: "Place of Birth",
                    htmlFor: "form-select-control-place",
                  }}
                  placeholder={form["place_of_birth"] || "Country of Birth"}
                  search
                  onChange={(e, { value }) => {
                    console.log(value);
                    this.handleLocalFormFill("place_of_birth", value);
                  }}
                  searchInput={{ id: "form-select-control-place" }}
                />

<Form.Field
                  required
                  control={Select}
                  options={countries.map((country) => {
                    return { key: country.name, text: country.name, value: country.name };
                  })}
                  label={{
                    children: "Nationality",
                    htmlFor: "form-select-control-nationality",
                  }}
                  placeholder={form["nationality"] || "Nationality"}
                  search
                  onChange={(e, { value }) => {
                    console.log(value);
                    this.handleLocalFormFill("nationality", value);
                  }}
                  searchInput={{ id: "form-select-control-nationality" }}
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

              <Form.Field label="Relevant Information" />
              <Form.Group>
                <TextArea
                  required
                  placeholer="Relevant Info"
                  onChange={(e) => {
                    this.handleLocalFormFill("relevant_info", e.target.value);
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

          <Header as="h2">24. Particulars of Family Members and Relatives (Indian and Non Indian) working in Foreign Missions or in Foreign Organizations including foreign concerns in India and Abroad</Header>
          <p>Please enter the details of family members</p>

          <Button
            positive
            onClick={(e) => {
              this.setState({
                modalOpen: true,
              });
            }}
          >
            Add Family Member
          </Button>
        </div>
        <Table
          removeItemFormTable={this.removeItemFormTable}
          data={this.state.nri_family_members}
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
              BACK: (23). PERSONS RESIDING WITH
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
                    [...this.state.nri_family_members],
                    "nri_family"
                  );
                  incrementStep();
                } else return false;
              }}
            >
              25 CHILDREN ABROAD: NEXT
            </Button>
          </Button.Group>
        </div>
      </div>
    );
  }
}

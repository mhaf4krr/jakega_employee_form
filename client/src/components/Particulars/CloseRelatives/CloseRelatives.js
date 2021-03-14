import React, { Component } from "react";

import styles from "./Educational.module.css";

import Modal from "../../../utils/Modal/Modal";

import { Header, Form, Button, TextArea, Select } from "semantic-ui-react";

import Table from "./FamilyTable/Table";

export default class FamilyMembers extends Component {
  state = {
    modalOpen: false,
    counter: 0,
    family_members: [],
    current_family_member: {
      relation: null,
      name: "",
      occupation: "",
      present_address: "",
    },
  };

  componentDidMount() {
    let family_members_data = this.props.form;

    // If some previous information exists, just initialize state to that

    if (family_members_data.length > 0) {
      this.setState({ family_members: [...family_members_data] });
    }

    return;
  }

  handleLocalFormFill = (key, value) => {
    let form = { ...this.state.current_family_member };

    if (value === null) {
      return;
    }

    form[key] = value;
    this.setState({ current_family_member: { ...form } });
  };

  validatedMainSubmission = () => {
    let family_members = this.state.family_members;
    if (family_members.length > 0) {
      return true;
    } else return false;
  };

  removeItemFormTable = (counter) => {
    let family_members_data = [...this.state.family_members];

    family_members_data = family_members_data.filter((member) => {
      return member.counter !== counter;
    });

    this.setState({ family_members: [...family_members_data] });
  };

  validated = () => {
    let form = this.state.current_family_member;
    let validated = true;
    let fields = ["occupation", "name", "present_address", "relation"];

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
      ...this.state.current_family_member,
      counter: this.state.counter,
    };
    this.setState({
      family_members: [...this.state.family_members, current],
      counter: temp,
    });
  };

  clearExistingForm = () => {
    let current_data = this.state.current_family_member;
    let fields = Object.keys(current_data);

    for (let i = 0; i < fields.length; i++) {
      current_data[fields[i]] = "";
    }

    current_data["relation"] = null;

    this.setState({ current_family_member: { ...current_data } });
  };

  changeModal = (state) => {
    let modal = state === "open" ? true : false;
    this.setState({ modalOpen: modal });
  };
  render() {
    let { incrementStep, decrementStep, handleArrayFill } = {
      ...this.props,
    };

    let form = this.state.current_family_member;

    return (
      <div className="container">
        <div className={styles["main_wrapper"]}>
          <Modal
            modalState={this.state.modalOpen}
            modalMessage="Add a Family Member"
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

          <Header as="h2">14. Particulars of Family Members</Header>
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
          data={this.state.family_members}
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
              BACK: (13). EMPLOYEE INFO
            </Button>
            <Button.Or />
            <Button
              size="medium"
              positive
              disabled={!this.validatedMainSubmission()}
              onClick={(e) => {
                e.preventDefault();

                if (this.validatedMainSubmission()) {
                  handleArrayFill("particulars_information", [
                    ...this.state.mobile_numbers,

                    "family_members",
                  ]);
                } else return false;
              }}
            >
              (6). 15 IN-LAWS INFO: NEXT
            </Button>
          </Button.Group>
        </div>
      </div>
    );
  }
}

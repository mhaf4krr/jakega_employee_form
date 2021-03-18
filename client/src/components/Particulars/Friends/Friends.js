import React, { Component } from "react";

import styles from "./Educational.module.css";

import Modal from "../../../utils/Modal/Modal";

import { Header, Form, Button, TextArea, Select } from "semantic-ui-react";

import {data as NationalityData} from "../../../utils/NationalityData"

import Table from "./FriendsTable/Table";

export default class Friends extends Component {
  state = {
    modalOpen: false,
    counter: 0,
    friends: [],
    current_friend: {
    
      name: "",
      nationality:null,
      occupation: "",
      place_of_birth: "",
      current_address:"",
      additional_info:""
    },
  };

  componentDidMount() {
    let friends_data = this.props.form;

    // If some previous information exists, just initialize state to that

    if (friends_data.length > 0) {
      this.setState({ friends: [...friends_data] });
    }

    return;
  }

  handleLocalFormFill = (key, value) => {
    let form = { ...this.state.current_friend };

    if (value === null) {
      return;
    }

    form[key] = value;
    this.setState({ current_friend: { ...form } });
  };

  validatedMainSubmission = () => {
    let friends = this.state.friends;
    if (friends.length > 0) {
      return true;
    } else return false;
  };

  removeItemFormTable = (counter) => {
    let friends_data = [...this.state.friends];

    friends_data = friends_data.filter((member) => {
      return member.counter !== counter;
    });

    this.setState({ friends: [...friends_data] });
  };

  validated = () => {
    let form = this.state.current_friend;
    let validated = true;
    let fields = ["occupation", "name", "place_of_birth","nationality","current_address"];

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
      ...this.state.current_friend,
      counter: this.state.counter,
    };
    this.setState({
      friends: [...this.state.friends, current],
      counter: temp,
    });
  };

  clearExistingForm = () => {
    let current_data = this.state.current_friend;
    let fields = Object.keys(current_data);

    for (let i = 0; i < fields.length; i++) {
      current_data[fields[i]] = "";
    }

  
    this.setState({ current_friend: { ...current_data } });
  };

  changeModal = (state) => {
    let modal = state === "open" ? true : false;
    this.setState({ modalOpen: modal });
  };
  render() {
    let { incrementStep, decrementStep, handleArrayFill } = {
      ...this.props,
    };

    let form = this.state.current_friend;

    return (
      <div className="container">
        <div className={styles["main_wrapper"]}>
          <Modal
            modalState={this.state.modalOpen}
            modalMessage="Add Friend Information"
            closeModal={() => this.changeModal("close")}
          >
            <Form>
              <Form.Group widths="equal">
            
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

<Form.Field
                  required
                  control={Select}
                  options={NationalityData.map((relation) => {
                    return { key: relation, text: relation, value: relation };
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

              <Form.Field label="Place of Birth" />
              <Form.Group>
                <TextArea
                  required
                  placeholer="Address"
                  onChange={(e) => {
                    this.handleLocalFormFill("place_of_birth", e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Field label="Current Address" />
              <Form.Group>
                <TextArea
                  required
                  placeholer="Current Address"
                  onChange={(e) => {
                    this.handleLocalFormFill("current_address", e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Field label="Additional Information" />
              <Form.Group>
                <TextArea
                  required
                  placeholer="Additional Information"
                  onChange={(e) => {
                    this.handleLocalFormFill("additional_info", e.target.value);
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
                  Add Friend to List
                </Button>
              </Form.Group>
            </Form>
          </Modal>

          <Header as="h2">18. Particulars of Friends and Acquaintances during past years at place of posting</Header>
          <p>Please furnish information voluntarily of such friends and acquaintances who you think, the employer should be kept posted for reasons of preempting adverse reporting in enquiry</p>

          <Button
            positive
            onClick={(e) => {
              this.setState({
                modalOpen: true,
              });
            }}
          >
            Add Friend/Acquaintance
          </Button>
        </div>
        <Table
          removeItemFormTable={this.removeItemFormTable}
          data={this.state.friends}
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
              BACK: (16). IN-LAWS INFO
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
                    ...this.state.friends],

                    "friends",
                  );
                   incrementStep()
                } else return false;
              }}
            >
              18. FRIENDS INFO: NEXT
            </Button>
          </Button.Group>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";

import styles from "./Educational.module.css";

import Modal from "../../../utils/Modal/Modal";

import { Header, Form, Button, TextArea, Select } from "semantic-ui-react";

import {data as NationalityData} from "../../../utils/NationalityData"

import Table from "./CloseRelativesTable/Table";

export default class CloseRelatives extends Component {
  state = {
    modalOpen: false,
    counter: 0,
    close_relatives: [],
    current_close_relative: {
      relation: "",
      name: "",
      nationality:null,
      occupation: "",
      place_of_birth: "",
      current_address:"",
      additional_info:""
    },
  };

  componentDidMount() {
    let close_relatives_data = this.props.form;

    // If some previous information exists, just initialize state to that

    if (close_relatives_data.length > 0) {
      this.setState({ close_relatives: [...close_relatives_data] });
    }

    return;
  }

  handleLocalFormFill = (key, value) => {
    let form = { ...this.state.current_close_relative };

    if (value === null) {
      return;
    }

    form[key] = value;
    this.setState({ current_close_relative: { ...form } });
  };

  validatedMainSubmission = () => {
    let close_relatives = this.state.close_relatives;
    if (close_relatives.length > 0) {
      return true;
    } else return false;
  };

  removeItemFormTable = (counter) => {
    let close_relatives_data = [...this.state.close_relatives];

    close_relatives_data = close_relatives_data.filter((member) => {
      return member.counter !== counter;
    });

    this.setState({ close_relatives: [...close_relatives_data] });
  };

  validated = () => {
    let form = this.state.current_close_relative;
    let validated = true;
    let fields = ["occupation", "name", "place_of_birth", "relation","nationality","current_address"];

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
      ...this.state.current_close_relative,
      counter: this.state.counter,
    };
    this.setState({
      close_relatives: [...this.state.close_relatives, current],
      counter: temp,
    });
  };

  clearExistingForm = () => {
    let current_data = this.state.current_close_relative;
    let fields = Object.keys(current_data);

    for (let i = 0; i < fields.length; i++) {
      current_data[fields[i]] = "";
    }

    current_data["relation"] = null;

    this.setState({ current_close_relative: { ...current_data } });
  };

  changeModal = (state) => {
    let modal = state === "open" ? true : false;
    this.setState({ modalOpen: modal });
  };
  render() {
    let { incrementStep, decrementStep, handleArrayFill } = {
      ...this.props,
    };

    let form = this.state.current_close_relative;

    return (
      <div className="container">
        <div className={styles["main_wrapper"]}>
          <Modal
            modalState={this.state.modalOpen}
            modalMessage="Add a Close Relative"
            closeModal={() => this.changeModal("close")}
          >
            <Form>
              <Form.Group widths="equal">
              <Form.Field
                  control={Form.Input}
                  label="Relation"
                  name="relation"
                  required
                  onChange={(e) => {
                    this.handleLocalFormFill("relation", e.target.value);
                  }}
                  value={form["relation"]}
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
                  Add Family Member
                </Button>
              </Form.Group>
            </Form>
          </Modal>

          <Header as="h2">17. Particulars of Close Relatives</Header>
          <p>Please furnish information voluntarily of such relatives who you think, the employer should be kept posted for reasons of preempting adverse reporting in enquiry</p>

          <Button
            positive
            onClick={(e) => {
              this.setState({
                modalOpen: true,
              });
            }}
          >
            Add Close Relative
          </Button>
        </div>
        <Table
          removeItemFormTable={this.removeItemFormTable}
          data={this.state.close_relatives}
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
                    ...this.state.close_relatives

                   
                  ], "close_relatives",);
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

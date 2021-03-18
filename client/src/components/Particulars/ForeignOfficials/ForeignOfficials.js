import React, { Component } from "react";

import styles from "./Educational.module.css";

import Modal from "../../../utils/Modal/Modal";

import { Header, Form, Button, TextArea, Select } from "semantic-ui-react";

import {countries} from "../../../utils/NationalityData"

import Table from "./ForeignOfficialsTable/Table";

export default class ForeignOfficials extends Component {
  state = {
    modalOpen: false,
    counter: 0,
    foreign_visits: [],
    current_foreign_visit: {
      designation: "",
      name: "",
      country: "",
      meeting_circumstances: "",
    },
  };

  componentDidMount() {
    let foreign_visits_data = this.props.form;

    // If some previous information exists, just initialize state to that

    if (foreign_visits_data.length > 0) {
      this.setState({ foreign_visits: [...foreign_visits_data] });
    }

    return;
  }

  handleLocalFormFill = (key, value) => {
    let form = { ...this.state.current_foreign_visit };

    if (value === null) {
      return;
    }

    form[key] = value;
    this.setState({ current_foreign_visit: { ...form } });
  };

  validatedMainSubmission = () => {
    let foreign_visits = this.state.foreign_visits;
    if (foreign_visits.length > 0) {
      return true;
    } else return false;
  };

  removeItemFormTable = (counter) => {
    let foreign_visits_data = [...this.state.foreign_visits];

    foreign_visits_data = foreign_visits_data.filter((member) => {
      return member.counter !== counter;
    });

    this.setState({ foreign_visits: [...foreign_visits_data] });
  };

  validated = () => {
    let form = this.state.current_foreign_visit;
    let validated = true;
    let fields = ["designation", "name", "country", "meeting_circumstances"];

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
      ...this.state.current_foreign_visit,
      counter: this.state.counter,
    };
    this.setState({
      foreign_visits: [...this.state.foreign_visits, current],
      counter: temp,
    });
  };

  clearExistingForm = () => {
    let current_data = this.state.current_foreign_visit;
    let fields = Object.keys(current_data);

    for (let i = 0; i < fields.length; i++) {
      current_data[fields[i]] = "";
    }

    current_data["relation"] = null;

    this.setState({ current_foreign_visit: { ...current_data } });
  };

  changeModal = (state) => {
    let modal = state === "open" ? true : false;
    this.setState({ modalOpen: modal });
  };
  render() {
    let { incrementStep, decrementStep, handleArrayFill } = {
      ...this.props,
    };

    let form = this.state.current_foreign_visit;

    return (
      <div className="container">
        <div className={styles["main_wrapper"]}>
          <Modal
            modalState={this.state.modalOpen}
            modalMessage="Add a Meeting"
            closeModal={() => this.changeModal("close")}
          >
            <Form>
              <Form.Group widths="equal">
                <Form.Field
                  required
                  control={Select}
                  options={countries.map((country) => {
                    return { key: country.name, text: country.name, value: country.name };
                  })}
                  label={{
                    children: "Country of Official",
                    htmlFor: "form-select-control-country",
                  }}
                  placeholder={form["country"] || "country"}
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
                  label="Designation"
                  name="designation"
                  required
                  onChange={(e) => {
                    this.handleLocalFormFill("designation", e.target.value);
                  }}
                  value={form["designation"]}
                />
              </Form.Group>

              <Form.Field label="Meeting Circumstances" />
              <Form.Group>
                <TextArea
                  required
                  placeholer="Meeting Circumstances"
                  onChange={(e) => {
                    this.handleLocalFormFill("meeting_circumstances", e.target.value);
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
                  Add Meeting Info
                </Button>
              </Form.Group>
            </Form>
          </Modal>

          <Header as="h2">21. Contact with Foreign Officials</Header>
          <p>Details of personal contact with Government officials of foreign countries</p>

          <Button
            positive
            onClick={(e) => {
              this.setState({
                modalOpen: true,
              });
            }}
          >
            Add Meeting related Info
          </Button>
        </div>
        <Table
          removeItemFormTable={this.removeItemFormTable}
          data={this.state.foreign_visits}
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
              BACK: (20). FOREIGN VISITS
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
                    [...this.state.foreign_visits],
                    "contact_with_foreign_officials"
                  );
                  incrementStep();
                } else return false;
              }}
            >
              22 SPOUSE ABROAD TRIPS: NEXT
            </Button>
          </Button.Group>
        </div>
      </div>
    );
  }
}

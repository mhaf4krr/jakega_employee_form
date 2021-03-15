import React, { Component } from "react";

import styles from "./Educational.module.css";

import Modal from "../../../utils/Modal/Modal";

import { Header, Form, Button, TextArea, Select } from "semantic-ui-react";

import Table from "./ForeignVisitsTable/Table";

import  {countries} from "../../../utils/NationalityData"



export default class ForeignVisits extends Component {
  state = {
    modalOpen: false,
    counter: 0,
    visits: [],
    current_visit: {
      from:null,
      to:null,
      country_visited:null,
      purpose_of_visit:"",
      details_of_host:""
    },
  };

  componentDidMount() {
    let visits_data = this.props.form;

    // If some previous information exists, just initialize state to that

    if (visits_data.length > 0) {
      this.setState({ visits: [...visits_data] });
    }

    return;
  }

  handleLocalFormFill = (key, value) => {
    let form = { ...this.state.current_visit };

    if (value === null) {
      return;
    }

    form[key] = value;
    this.setState({ current_visit: { ...form } });
  };

  validatedMainSubmission = () => {
    let visits = this.state.visits;
    if (visits.length > 0) {
      return true;
    } else return false;
  };

  removeItemFormTable = (counter) => {
    let visits_data = [...this.state.visits];

    visits_data = visits_data.filter((member) => {
      return member.counter !== counter;
    });

    this.setState({ visits: [...visits_data] });
  };

  validated = () => {
    let form = this.state.current_visit;
    let validated = true;
    let fields = ["from","to","country_visited","purpose_of_visit","details_of_host"];

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
      ...this.state.current_visit,
      counter: this.state.counter,
    };
    this.setState({
      visits: [...this.state.visits, current],
      counter: temp,
    });
  };

  clearExistingForm = () => {
    let current_data = this.state.current_visit;
    let fields = Object.keys(current_data);

    for (let i = 0; i < fields.length; i++) {
      current_data[fields[i]] = "";
    }

   

    this.setState({ current_visit: { ...current_data } });
  };

  changeModal = (state) => {
    let modal = state === "open" ? true : false;
    this.setState({ modalOpen: modal });
  };
  render() {
    let { incrementStep, decrementStep, handleArrayFill } = {
      ...this.props,
    };

    let form = this.state.current_visit;

    return (
      <div className="container">
        <div className={styles["main_wrapper"]}>
          <Modal
            modalState={this.state.modalOpen}
            modalMessage="Add a Foreign Visit"
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
                    children: "Visit From",
                    htmlFor: "form-select-control-from",
                  }}
                  placeholder={form["from"] || "Visit From"}
                  search
                  onChange={(e, { value }) => {
                    console.log(value);
                    this.handleLocalFormFill("from", value);
                  }}
                  searchInput={{ id: "form-select-control-from" }}
                />

<Form.Field
                  required
                  control={Select}
                  options={countries.map((country) => {
                    return { key: country.name, text: country.name, value: country.name };
                  })}
                  label={{
                    children: "Visit To",
                    htmlFor: "form-select-control-to",
                  }}
                  placeholder={form["from"] || "Visit To"}
                  search
                  onChange={(e, { value }) => {
                    console.log(value);
                    this.handleLocalFormFill("to", value);
                  }}
                  searchInput={{ id: "form-select-control-to" }}
                />


<Form.Field
                  required
                  control={Select}
                  options={countries.map((country) => {
                    return { key: country.name, text: country.name, value: country.name };
                  })}
                  label={{
                    children: "Country Visited",
                    htmlFor: "form-select-control-country_visited",
                  }}
                  placeholder={form["country_visited"] || "Country Visited"}
                  search
                  onChange={(e, { value }) => {
                    console.log(value);
                    this.handleLocalFormFill("country_visited", value);
                  }}
                  searchInput={{ id: "form-select-control-country_visited" }}
                />


                
              </Form.Group>

              <Form.Field label="Purpose of Visit" />
              <Form.Group>
                <TextArea
                  required
                  placeholer="Address"
                  onChange={(e) => {
                    this.handleLocalFormFill("purpose_of_visit", e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Field label="Details of Host(with whom stayed)" />
              <Form.Group>
                <TextArea
                  required
                  placeholer="Address"
                  onChange={(e) => {
                    this.handleLocalFormFill("details_of_host", e.target.value);
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
                  Add Foreign Visit
                </Button>
              </Form.Group>
            </Form>
          </Modal>

          <Header as="h2">20. Particulars of Foreign Visits</Header>
          <p>Please enter the details of your foreign visits</p>

          <Button
            positive
            onClick={(e) => {
              this.setState({
                modalOpen: true,
              });
            }}
          >
            Add Foreign Visit
          </Button>
        </div>
        <Table
          removeItemFormTable={this.removeItemFormTable}
          data={this.state.visits}
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
              BACK: (19). PLACES
            </Button>
            <Button.Or />
            <Button
              size="medium"
              positive
              disabled={!this.validatedMainSubmission()}
              onClick={(e) => {
                e.preventDefault();

                if (this.validatedMainSubmission()) {
                  handleArrayFill(
                    "particulars_information",
                    [...this.state.visits],
                    "visits"
                  );
                  incrementStep();
                } else return false;
              }}
            >
              21 FOREIGN OFFICIALS: NEXT
            </Button>
          </Button.Group>
        </div>
      </div>
    );
  }
}

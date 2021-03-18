import React, { Component } from "react";

import styles from "./Educational.module.css";

import Modal from "../../../utils/Modal/Modal";

import { Header, Form, Button, TextArea, Select } from "semantic-ui-react";

import Table from "./PlacesTable/Table";

import {countries} from "../../../utils/NationalityData"

export default class Places extends Component {
  state = {
    modalOpen: false,
    counter: 0,
    places: [],
    current_place: {
      country: null,
      place: "",
      period_of_stay: "",
     
      additional_info: "",
    },
  };

  componentDidMount() {
    let places_data = this.props.form;

    // If some previous information exists, just initialize state to that

    if (places_data.length > 0) {
      this.setState({ places: [...places_data] });
    }

    return;
  }

  handleLocalFormFill = (key, value) => {
    let form = { ...this.state.current_place };

    if (value === null) {
      return;
    }

    form[key] = value;
    this.setState({ current_place: { ...form } });
  };

  validatedMainSubmission = () => {
    let places = this.state.places;
    if (places.length > 0) {
      return true;
    } else return false;
  };

  removeItemFormTable = (counter) => {
    let places_data = [...this.state.places];

    places_data = places_data.filter((member) => {
      return member.counter !== counter;
    });

    this.setState({ places: [...places_data] });
  };

  validated = () => {
    let form = this.state.current_place;
    let validated = true;
    let fields = ["country", "place", "period_of_stay", "additional_info"];

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
      ...this.state.current_place,
      counter: this.state.counter,
    };
    this.setState({
      places: [...this.state.places, current],
      counter: temp,
    });
  };

  clearExistingForm = () => {
    let current_data = this.state.current_place;
    let fields = Object.keys(current_data);

    for (let i = 0; i < fields.length; i++) {
      current_data[fields[i]] = "";
    }

    current_data["country"] = null;

    this.setState({ current_place: { ...current_data } });
  };

  changeModal = (state) => {
    let modal = state === "open" ? true : false;
    this.setState({ modalOpen: modal });
  };
  render() {
    let { incrementStep, decrementStep, handleArrayFill } = {
      ...this.props,
    };

    let form = this.state.current_place;

    return (
      <div className="container">
        <div className={styles["main_wrapper"]}>
          <Modal
            modalState={this.state.modalOpen}
            modalMessage="Particulars of Places"
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
                    children: "Country",
                    htmlFor: "form-select-control-country",
                  }}
                  placeholder={form["country"] || "Country"}
                  search
                  onChange={(e, { value }) => {
                    console.log(value);
                    this.handleLocalFormFill("country", value);
                  }}
                  searchInput={{ id: "form-select-control-relation" }}
                />
                <Form.Field
                  control={Form.Input}
                  label="Place"
                  name="place"
                  required
                  onChange={(e) => {
                    this.handleLocalFormFill("place", e.target.value);
                  }}
                  value={form["place"]}
                />

                

<Form.Field
                  control={Form.Input}
                  type="number"
                  label="Period of Stay [Years]"
                  name="period_of_stay"
                  required
                  onChange={(e) => {
                    this.handleLocalFormFill("period_of_stay", e.target.value);
                  }}
                  value={form["period_of_stay"]}
                />
              </Form.Group>

              <Form.Field label="Detailed Information" />
              <p>Full Address including [Village,Police Station,Post Office,Town,House,Street No,Contact,etc]</p>
              <Form.Group>
                <TextArea
                  required
                  placeholer="Address"
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
                  Add Place to List
                </Button>
              </Form.Group>
            </Form>
          </Modal>

          <Header as="h2">19. Particulars of Places</Header>
          <p>
            Particulars of places (with a period of stay) where you have resided for more than one year at a time during the preceeding 5 years. In case of stay abroad (including Pakistan/PoK), particulars of all places where you have resided for more than one year after attaining the age of 18 years.
          </p>

          <Button
            positive
            onClick={(e) => {
              this.setState({
                modalOpen: true,
              });
            }}
          >
            Add Place to List
          </Button>
        </div>
        <Table
          removeItemFormTable={this.removeItemFormTable}
          data={this.state.places}
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
              BACK: (18). FRIENDS INFO
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
                    [...this.state.places],
                    "places_resided"
                  );

                  incrementStep()
                } else return false;
              }}
            >
              (20). FOREIGN VISITS: NEXT
            </Button>
          </Button.Group>
        </div>
      </div>
    );
  }
}

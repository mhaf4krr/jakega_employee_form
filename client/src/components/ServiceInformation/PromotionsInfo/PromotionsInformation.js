import React, { Component } from "react";

import styles from "./Promotions.module.css";

import Modal from "../../../utils/Modal/Modal";

import { Header, Form, Button } from "semantic-ui-react";

import Table from "./PromotionsTable/Table";

export default class PromotionsInfo extends Component {
  state = {
    modalOpen: false,
    counter: 0,
    promotions: [],
    promotion: {
      office_place: "",
      from: "",
      to: "",
    },
  };

  componentDidMount() {
    let main_form_promotion_data = [...this.props.form];
    // If some previous information exists, just initialize state to that

    if (main_form_promotion_data.length > 0) {
      this.setState({ promotions: [...main_form_promotion_data] });
    }

    return;
  }

  validatedMainSubmission = () => {
    let promotions_data = this.state.promotions;
    if (promotions_data.length > 0) {
      return true;
    } else return false;
  };

  validated = () => {
    let validated = true;

    let promotions_data = this.state.promotions;

    let fields = Object.keys(promotions_data);

    for (let i = 0; i < fields.length; i++) {
      if (promotions_data[fields[i]] === "") {
        validated = false;
        break;
      }
    }

    return validated;
  };

  clearExistingForm = () => {
    let current_promotion_form = { ...this.state.promotion };
    let fields = Object.keys(current_promotion_form);
    fields.forEach((field) => {
      current_promotion_form[field] = "";
    });
    this.setState({
      promotion: current_promotion_form,
    });
  };

  storeCurrentInArray = () => {
    let counter = this.state.counter;
    let current_promotion_form = { ...this.state.promotion, id: counter };
    console.log(current_promotion_form, "current_ed_form");

    let promotions_data = [...this.state.promotions, current_promotion_form];

    this.setState({
      promotions: promotions_data,
      counter: counter + 1,
      modalOpen: false,
    });
  };

  removeItemFormTable = (value) => {
    let promotions_data = [...this.state.promotions];
    promotions_data = promotions_data.filter((item) => {
      console.log(item["id"], value);
      return item["id"] !== value;
    });

    this.setState({
      promotions: promotions_data,
    });
  };

  handleFormFill = (id, value) => {
    let promotion_data = { ...this.state.promotion };
    promotion_data[id] = value;

    this.setState({ promotion: promotion_data });
  };

  changeModal = (state) => {
    let modal = state === "open" ? true : false;
    this.setState({ modalOpen: modal });
  };
  render() {
    let { incrementStep, decrementStep, handleArrayFill } = {
      ...this.props,
    };

    let form = this.state.promotion;

    return (
      <div className="container">
        <div className={styles["main_wrapper"]}>
          <Modal
            modalState={this.state.modalOpen}
            modalMessage="Add new promotion Detail"
            closeModal={() => this.changeModal("close")}
          >
            <Form>
              <Form.Group widths="equal">
                <Form.Field
                  control={Form.Input}
                  label="Office and Place"
                  name="office_and_place"
                  required
                  onChange={(e) => {
                    this.handleFormFill("office_place", e.target.value);
                  }}
                  value={form["office_place"]}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  control={Form.Input}
                  label="promotion From"
                  name="from"
                  required
                  onChange={(e) => {
                    this.handleFormFill("from", e.target.value);
                  }}
                  value={form["from"]}
                />

                <Form.Field
                  control={Form.Input}
                  label="promotion To"
                  name="to"
                  required
                  onChange={(e) => {
                    this.handleFormFill("to", e.target.value);
                  }}
                  value={form["to"]}
                />
              </Form.Group>

              <Form.Group>
                <Button
                  positive
                  onClick={(e) => {
                    if (this.validated()) {
                      this.storeCurrentInArray();
                      this.clearExistingForm();
                    }
                  }}
                >
                  Add Detail to List
                </Button>
              </Form.Group>
            </Form>
          </Modal>

          <Header as="h2">12. Official promotions Information</Header>
          <p>
            Please fill up the details of your promotion from the date of
            appointment (applicable for reverification cases)
          </p>

          <Button
            positive
            onClick={(e) => {
              this.setState({
                modalOpen: true,
              });
            }}
          >
            Add promotion Detail
          </Button>
        </div>
        <Table
          removeItemFormTable={this.removeItemFormTable}
          data={this.state.promotions}
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
              BACK: (11). POSTING INFO
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
                    "service_details",
                    [...this.state.promotions],
                    "promotions"
                  );
                  incrementStep();
                } else return false;
              }}
            >
              (13). JOINING INFO : NEXT
            </Button>
          </Button.Group>
        </div>
      </div>
    );
  }
}

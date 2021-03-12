import React, { Component } from "react";

import styles from "./Educational.module.css";

import Modal from "../../utils/Modal/Modal";

import { Header, Form, Button } from "semantic-ui-react";

import Table from "./MobileTable/Table";

export default class MobileNumbersInfo extends Component {
  state = {
    modalOpen: false,
    counter: 0,
    mobile_numbers: [],
    current_mobile_number: "",
  };

  componentDidMount() {
    let mobile_numbers_data = this.props.form;

    console.log(mobile_numbers_data);
    // If some previous information exists, just initialize state to that

    if (mobile_numbers_data.length > 0) {
      this.setState({ mobile_numbers: [...mobile_numbers_data] });
    }

    return;
  }

  validatedMainSubmission = () => {
    let mobile_numbers = this.state.mobile_numbers;
    if (mobile_numbers.length > 0) {
      return true;
    } else return false;
  };

  validated = () => {
    if (
      this.state.current_mobile_number === "" ||
      this.state.current_mobile_number.length < 10
    ) {
      return false;
    } else return true;
  };

  clearExistingForm = () => {
    this.setState({
      current_mobile_number: "",
    });
  };

  storeCurrentInArray = () => {
    let mobile_numbers_data = [
      ...this.state.mobile_numbers,
      this.state.current_mobile_number,
    ];
    this.setState({
      mobile_numbers: mobile_numbers_data,
    });
  };

  removeItemFormTable = (value) => {
    let mobile_numbers_data = [...this.state.mobile_numbers];

    console.log(value);

    let new_mobile_numbers_data = mobile_numbers_data.filter((item) => {
      return item !== value;
    });

    this.setState({
      mobile_numbers: new_mobile_numbers_data,
    });
  };

  handleLocalMobileFill = (value) => {
    this.setState({ current_mobile_number: value });
  };

  handleAddMobile = (mobile_number) => {
    let local_mobile_numbers = [...this.state.mobile_numbers, mobile_number];

    this.setState({ mobile_numbers: [...local_mobile_numbers] });
  };
  changeModal = (state) => {
    let modal = state === "open" ? true : false;
    this.setState({ modalOpen: modal });
  };
  render() {
    let { incrementStep, decrementStep, handleArrayFill } = {
      ...this.props,
    };

    return (
      <div className="container">
        <div className={styles["main_wrapper"]}>
          <Modal
            modalState={this.state.modalOpen}
            modalMessage="Add new Mobile Number"
            closeModal={() => this.changeModal("close")}
          >
            <Form>
              <Form.Group widths="equal">
                <Form.Field
                  control={Form.Input}
                  label="Mobile Number"
                  name="mobile_number_local"
                  required
                  onChange={(e) => {
                    this.handleLocalMobileFill(e.target.value);
                  }}
                  value={this.state["current_mobile_number"]}
                />
              </Form.Group>

              <Form.Group>
                <Button
                  positive
                  onClick={(e) => {
                    e.preventDefault();
                    if (this.validated()) {
                      this.storeCurrentInArray();
                      this.setState({ modalOpen: false });
                      this.clearExistingForm();
                    }
                  }}
                >
                  Add Number to List
                </Button>
              </Form.Group>
            </Form>
          </Modal>

          <Header as="h2">6. Mobile Numbers</Header>
          <p>
            Please fill up the details of Mobile Numbers used during last 5
            years.
          </p>

          <Button
            positive
            onClick={(e) => {
              this.setState({
                modalOpen: true,
              });
            }}
          >
            Add Mobile Number
          </Button>
        </div>
        <Table
          removeItemFormTable={this.removeItemFormTable}
          data={this.state.mobile_numbers}
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
              BACK: (5). EDUCATIONAL INFO
            </Button>
            <Button.Or />
            <Button
              size="medium"
              positive
              disabled={!this.validatedMainSubmission()}
              onClick={(e) => {
                e.preventDefault();

                if (this.validatedMainSubmission()) {
                  handleArrayFill("mobile_numbers", [
                    ...this.state.mobile_numbers,
                  ]);
                } else return false;
              }}
            >
              (6). e-COMMUNICATION: NEXT
            </Button>
          </Button.Group>
        </div>
      </div>
    );
  }
}

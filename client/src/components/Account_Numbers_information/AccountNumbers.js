import React, { Component } from "react";

import styles from "./Educational.module.css";

import Modal from "../../utils/Modal/Modal";

import { Header, Form, Button } from "semantic-ui-react";

import Table from "./AccountTable/Table";

export default class AccountNumberInformation extends Component {
  state = {
    modalOpen: false,
    counter: 0,
    account_numbers: [],
    current_account_number: "",
  };

  componentDidMount() {
    let account_numbers_data = this.props.form;

    console.log(account_numbers_data);
    // If some previous information exists, just initialize state to that

    if (account_numbers_data.length > 0) {
      this.setState({ account_numbers: [...account_numbers_data] });
    }

    return;
  }

  validatedMainSubmission = () => {
    let account_numbers = this.state.account_numbers;
    if (account_numbers.length > 0) {
      return true;
    } else return false;
  };

  validated = () => {
    if (
      this.state.current_account_number === "" ||
      this.state.current_account_number.length < 5
    ) {
      return false;
    } else return true;
  };

  clearExistingForm = () => {
    this.setState({
      current_account_number: "",
    });
  };

  storeCurrentInArray = () => {
    let account_numbers_data = [
      ...this.state.account_numbers,
      this.state.current_account_number,
    ];
    this.setState({
      account_numbers: account_numbers_data,
    });
  };

  removeItemFormTable = (value) => {
    let account_numbers_data = [...this.state.account_numbers];

    console.log(value);

    let new_account_numbers_data = account_numbers_data.filter((item) => {
      return item !== value;
    });

    this.setState({
      account_numbers: new_account_numbers_data,
    });
  };

  handleLocalaccountFill = (value) => {
    this.setState({ current_account_number: value });
  };

  handleAddaccount = (account_number) => {
    let local_account_numbers = [...this.state.account_numbers, account_number];

    this.setState({ account_numbers: [...local_account_numbers] });
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
            modalMessage="Add new account Number"
            closeModal={() => this.changeModal("close")}
          >
            <Form>
              <Form.Group widths="equal">
                <Form.Field
                  control={Form.Input}
                  label="account Number"
                  name="account_number_local"
                  required
                  onChange={(e) => {
                    this.handleLocalaccountFill(e.target.value);
                  }}
                  value={this.state["current_account_number"]}
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

          <Header as="h2">10. Account Numbers</Header>
          <p>
            Please fill up the details of Bank/Post Office Account numbers.
          </p>

          <Button
            positive
            onClick={(e) => {
              this.setState({
                modalOpen: true,
              });
            }}
          >
            Add account Number
          </Button>
        </div>
        <Table
          removeItemFormTable={this.removeItemFormTable}
          data={this.state.account_numbers}
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
              BACK: (9). LEGAL INFO
            </Button>
            <Button.Or />
            <Button
              size="medium"
              positive
              disabled={!this.validatedMainSubmission()}
              onClick={(e) => {
                e.preventDefault();

                if (this.validatedMainSubmission()) {
                  handleArrayFill("account_numbers", [
                    ...this.state.account_numbers,
                  ]);
                } else return false;
              }}
            >
              (11). POSTINGS INFO: NEXT
            </Button>
          </Button.Group>
        </div>
      </div>
    );
  }
}

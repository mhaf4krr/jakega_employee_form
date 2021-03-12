import React, { Component } from "react";

import styles from "./Educational.module.css";

import Modal from "../../utils/Modal/Modal";

import { Header, Form, Button } from "semantic-ui-react";

import Table from "./VehicleTable/Table";

export default class vehicleNumbersInfo extends Component {
  state = {
    modalOpen: false,
    counter: 0,
    vehicle_numbers: [],
    current_vehicle_number: "",
  };

  componentDidMount() {
    let vehicle_numbers_data = this.props.form;

    console.log(vehicle_numbers_data);
    // If some previous information exists, just initialize state to that

    if (vehicle_numbers_data.length > 0) {
      this.setState({ vehicle_numbers: [...vehicle_numbers_data] });
    }

    return;
  }

  validatedMainSubmission = () => {
    let vehicle_numbers = this.state.vehicle_numbers;
    if (vehicle_numbers.length > 0) {
      return true;
    } else return false;
  };

  validated = () => {
    if (
      this.state.current_vehicle_number === "" ||
      this.state.current_vehicle_number.length < 4
    ) {
      return false;
    } else return true;
  };

  clearExistingForm = () => {
    this.setState({
      current_vehicle_number: "",
    });
  };

  storeCurrentInArray = () => {
    let vehicle_numbers_data = [
      ...this.state.vehicle_numbers,
      this.state.current_vehicle_number,
    ];
    this.setState({
      vehicle_numbers: vehicle_numbers_data,
    });
  };

  removeItemFormTable = (value) => {
    let vehicle_numbers_data = [...this.state.vehicle_numbers];

    console.log(value);

    let new_vehicle_numbers_data = vehicle_numbers_data.filter((item) => {
      return item !== value;
    });

    this.setState({
      vehicle_numbers: new_vehicle_numbers_data,
    });
  };

  handleLocalvehicleFill = (value) => {
    this.setState({ current_vehicle_number: value });
  };

  handleAddvehicle = (vehicle_number) => {
    let local_vehicle_numbers = [...this.state.vehicle_numbers, vehicle_number];

    this.setState({ vehicle_numbers: [...local_vehicle_numbers] });
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
            modalMessage="Add new vehicle Number"
            closeModal={() => this.changeModal("close")}
          >
            <Form>
              <Form.Group widths="equal">
                <Form.Field
                  control={Form.Input}
                  label="vehicle Number"
                  name="vehicle_number_local"
                  required
                  onChange={(e) => {
                    this.handleLocalvehicleFill(e.target.value);
                  }}
                  value={this.state["current_vehicle_number"]}
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

          <Header as="h2">8. Vehicle Registration Information</Header>
          <p>
            Please fill up the registration number of vehicles you have used/owned and using/owning.
          </p>

          <Button
            positive
            onClick={(e) => {
              this.setState({
                modalOpen: true,
              });
            }}
          >
            Add Vehicle Registration
          </Button>
        </div>
        <Table
          removeItemFormTable={this.removeItemFormTable}
          data={this.state.vehicle_numbers}
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
              BACK: (7). SOCIAL MEDIA INFO
            </Button>
            <Button.Or />
            <Button
              size="medium"
              positive
              disabled={!this.validatedMainSubmission()}
              onClick={(e) => {
                e.preventDefault();

                if (this.validatedMainSubmission()) {
                  handleArrayFill("vehicles", [
                    ...this.state.vehicle_numbers,
                  ]);

                  incrementStep()
                } else return false;
              }}
            >
              (9). LEGAL INFO: NEXT
            </Button>
          </Button.Group>
        </div>
      </div>
    );
  }
}

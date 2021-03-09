import React, { Component } from "react";

import styles from "./Educational.module.css";

import Modal from "../../utils/Modal/Modal";

import { Header, Form, Button } from "semantic-ui-react";

import Table from "./EducationalTable/Table";

export default class EducationInfo extends Component {
  state = {
    modalOpen: false,
    counter: 0,
    educational_qualifications: [],
    education: {
      institution: "",
      address: "",
      date_of_entering: "",
      date_of_leaving: "",
      examination_passed: "",
    },
  };

  validatedMainSubmission = () => {
    let educational_qualifications_data = this.state.educational_qualifications;
    if (educational_qualifications_data.length > 0) {
      return true;
    } else return false;
  };

  validated = () => {
    let validated = true;

    let education_data = this.state.education;

    let fields = Object.keys(education_data);

    for (let i = 0; i < fields.length; i++) {
      if (education_data[fields[i]] === "") {
        validated = false;
        break;
      }
    }

    return validated;
  };

  clearExistingForm = () => {
    let current_educational_form = { ...this.state.education };
    let fields = Object.keys(current_educational_form);
    fields.forEach((field) => {
      current_educational_form[field] = "";
    });
    this.setState({
      education: current_educational_form,
    });
  };

  storeCurrentInArray = () => {
    let counter = this.state.counter;
    let current_educational_form = { ...this.state.education, id: counter };
    console.log(current_educational_form, "current_ed_form");

    let educational_qualifications_data = [
      ...this.state.educational_qualifications,
      current_educational_form,
    ];

    this.setState({
      educational_qualifications: educational_qualifications_data,
      counter: counter + 1,
      modalOpen: false,
    });
  };

  removeItemFormTable = (value) => {
    let educational_qualifications_data = [
      ...this.state.educational_qualifications,
    ];
    educational_qualifications_data = educational_qualifications_data.filter(
      (item) => {
        console.log(item["id"], value);
        return item["id"] !== value;
      }
    );

    this.setState({
      educational_qualifications: educational_qualifications_data,
    });
  };

  handleFormFill = (id, value) => {
    let education_data = { ...this.state.education };
    education_data[id] = value;

    this.setState({ education: education_data });
  };

  changeModal = (state) => {
    let modal = state === "open" ? true : false;
    this.setState({ modalOpen: modal });
  };
  render() {
    let { incrementStep, decrementStep, handleArrayFill } = {
      ...this.props,
    };

    let form = this.state.education;

    return (
      <div className="container">
        <div className={styles["main_wrapper"]}>
          <Modal
            modalState={this.state.modalOpen}
            modalMessage="Add new Educational Qualification"
            closeModal={() => this.changeModal("close")}
          >
            <Form>
              <Form.Group widths="equal">
                <Form.Field
                  control={Form.Input}
                  label="Name of Institution [school / college / university]"
                  name="name_of_institution"
                  required
                  onChange={(e) => {
                    this.handleFormFill("institution", e.target.value);
                  }}
                  value={form["institution"]}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  control={Form.Input}
                  label="Full Address of Institution [school / college / university]"
                  name="address_of_institution"
                  required
                  onChange={(e) => {
                    this.handleFormFill("address", e.target.value);
                  }}
                  value={form["address"]}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  type="date"
                  label="Date of Joining Institution"
                  required
                  onChange={(e) =>
                    this.handleFormFill("date_of_entering", e.target.value)
                  }
                  value={form["date_of_entering"]}
                />

                <Form.Input
                  type="date"
                  label="Date of Leaving Institution"
                  required
                  onChange={(e) =>
                    this.handleFormFill("date_of_leaving", e.target.value)
                  }
                  value={form["date_of_leaving"]}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  control={Form.Input}
                  label="Examination Passed"
                  name="examination_passed"
                  required
                  onChange={(e) => {
                    this.handleFormFill("examination_passed", e.target.value);
                  }}
                  value={form["examination_passed"]}
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

          <Header as="h2">5. Educational Qualifications</Header>
          <p>
            Please fill up the details showing places of education with years in
            school, colleges and universities since the age of 15 years.
          </p>

          <Button
            positive
            onClick={(e) => {
              this.setState({
                modalOpen: true,
              });
            }}
          >
            Add Educational Detail
          </Button>
        </div>
        <Table
          removeItemFormTable={this.removeItemFormTable}
          data={this.state.educational_qualifications}
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
              BACK: (4). DOMICILE INFO
            </Button>
            <Button.Or />
            <Button
              size="medium"
              positive
              disabled={!this.validatedMainSubmission()}
              onClick={(e) => {
                e.preventDefault();

                if (this.validatedMainSubmission()) {
                  incrementStep();
                } else return false;
              }}
            >
              (6). MOBILE DETAILS : NEXT
            </Button>
          </Button.Group>
        </div>
      </div>
    );
  }
}

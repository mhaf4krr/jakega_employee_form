import React, { Component } from "react";

import styles from "./Postings.module.css";

import Modal from "../../../utils/Modal/Modal";

import { Header, Form, Button } from "semantic-ui-react";

import Table from "./PostingsTable/Table";

export default class EducationInfo extends Component {
  state = {
    modalOpen: false,
    counter: 0,
    postings: [],
    posting: {
      office_place: "",
      from: "",
      to: "",
    
    },
  };


  componentDidMount(){
    
    let main_form_posting_data = [...this.props.form]
     // If some previous information exists, just initialize state to that

     if(main_form_posting_data.length > 0){
       this.setState({postings:[...main_form_posting_data]})
     }

     return
     
  }

  validatedMainSubmission = () => {
    let postings_data = this.state.postings;
    if (postings_data.length > 0) {
      return true;
    } else return false;
  };

  validated = () => {
    let validated = true;

    let postings_data = this.state.postings;

    let fields = Object.keys(postings_data);

    for (let i = 0; i < fields.length; i++) {
      if (postings_data[fields[i]] === "") {
        validated = false;
        break;
      }
    }

    return validated;
  };

  clearExistingForm = () => {
    let current_posting_form = { ...this.state.posting };
    let fields = Object.keys(current_posting_form);
    fields.forEach((field) => {
      current_posting_form[field] = "";
    });
    this.setState({
      posting: current_posting_form,
    });
  };

  storeCurrentInArray = () => {
    let counter = this.state.counter;
    let current_posting_form = { ...this.state.posting, id: counter };
    console.log(current_posting_form, "current_ed_form");

    let postings_data = [
      ...this.state.postings,
      current_posting_form,
    ];

    this.setState({
      postings: postings_data,
      counter: counter + 1,
      modalOpen: false,
    });
  };

  removeItemFormTable = (value) => {
    let postings_data = [
      ...this.state.postings,
    ];
    postings_data = postings_data.filter(
      (item) => {
        console.log(item["id"], value);
        return item["id"] !== value;
      }
    );

    this.setState({
      postings: postings_data,
    });
  };

  handleFormFill = (id, value) => {
    let posting_data= { ...this.state.posting};
    posting_data[id] = value;

    this.setState({ posting: posting_data });
  };

  changeModal = (state) => {
    let modal = state === "open" ? true : false;
    this.setState({ modalOpen: modal });
  };
  render() {
    let { incrementStep, decrementStep, handleArrayFill } = {
      ...this.props,
    };

    let form = this.state.posting;

    return (
      <div className="container">
        <div className={styles["main_wrapper"]}>
          <Modal
            modalState={this.state.modalOpen}
            modalMessage="Add new Posting Detail"
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
                  label="Posting From"
                  name="from"
                  required
                  onChange={(e) => {
                    this.handleFormFill("from", e.target.value);
                  }}
                  value={form["from"]}
                />

<Form.Field
                  control={Form.Input}
                  label="Posting To"
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

          <Header as="h2">11. Official Postings Information</Header>
          <p>
            Please fill up the details of your posting from the date of appointment (applicable for reverification cases)
          </p>

          <Button
            positive
            onClick={(e) => {
              this.setState({
                modalOpen: true,
              });
            }}
          >
            Add Posting Detail
          </Button>
        </div>
        <Table
          removeItemFormTable={this.removeItemFormTable}
          data={this.state.postings}
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
              BACK: (10). ACCOUNTS INFO
            </Button>
            <Button.Or />
            <Button
              size="medium"
              positive
              disabled={!this.validatedMainSubmission()}
              onClick={(e) => {
                e.preventDefault();

                if (this.validatedMainSubmission()) {
                  handleArrayFill("service_details",[...this.state.postings],"postings")
                  incrementStep();
                } else return false;
              }}
            >
              (12). PROMOTIONS INFO : NEXT
            </Button>
          </Button.Group>
        </div>
      </div>
    );
  }
}

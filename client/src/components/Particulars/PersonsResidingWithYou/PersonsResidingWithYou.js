import React, { Component } from "react";

import styles from "./Educational.module.css";

import Modal from "../../../utils/Modal/Modal";

import { Header, Form, Button, TextArea,} from "semantic-ui-react";



import Table from "./PersonTable/Table";

export default class PersonsResidingWithYou extends Component {
  state = {
    modalOpen: false,
    counter: 0,
    persons: [],
    current_person: {
    
      name: "",
      from:"",
      to:"",
      relevant_info:""
    },
  };

  componentDidMount() {
    let persons_data = this.props.form;

    // If some previous information exists, just initialize state to that

    if (persons_data.length > 0) {
      this.setState({ persons: [...persons_data] });
    }

    return;
  }

  handleLocalFormFill = (key, value) => {
    let form = { ...this.state.current_person };

    if (value === null) {
      return;
    }

    form[key] = value;
    this.setState({ current_person: { ...form } });
  };

  

  removeItemFormTable = (counter) => {
    let persons_data = [...this.state.persons];

    persons_data = persons_data.filter((member) => {
      return member.counter !== counter;
    });

    this.setState({ persons: [...persons_data] });
  };

  validated = () => {
    let form = this.state.current_person;
    let validated = true;
    let fields = ["name", "from","to","relevant_info"];

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
      ...this.state.current_person,
      counter: this.state.counter,
    };
    this.setState({
      persons: [...this.state.persons, current],
      counter: temp,
    });
  };

  clearExistingForm = () => {
    let current_data = this.state.current_person;
    let fields = Object.keys(current_data);

    for (let i = 0; i < fields.length; i++) {
      current_data[fields[i]] = "";
    }

  
    this.setState({ current_person: { ...current_data } });
  };

  changeModal = (state) => {
    let modal = state === "open" ? true : false;
    this.setState({ modalOpen: modal });
  };
  render() {
    let { incrementStep, decrementStep, handleArrayFill } = {
      ...this.props,
    };

    let form = this.state.current_person;

    return (
      <div className="container">
        <div className={styles["main_wrapper"]}>
          <Modal
            modalState={this.state.modalOpen}
            modalMessage="Add Person Residing with you"
            closeModal={() => this.changeModal("close")}
          >
            <Form>
              <Form.Group widths="equal">
            
                <Form.Field
                  control={Form.Input}
                  label="Name of Person"
                  name="name"
                  required
                  onChange={(e) => {
                    this.handleLocalFormFill("name", e.target.value);
                  }}
                  value={form["name"]}
                />

<Form.Input
                  type="date"
                  label="From"
                  required
                  onChange={(e) =>
                    this.handleLocalFormFill("from", e.target.value)
                  }
                  value={form["from"]}
                />
              


              <Form.Input
                  type="date"
                  label="To"
                  required
                  onChange={(e) =>
                    this.handleLocalFormFill("to", e.target.value)
                  }
                  value={form["to"]}
                />

              </Form.Group>

              <Form.Field label="Relevant Contextual Information" />
              <Form.Group>
                <TextArea
                  required
                  placeholer="Address"
                  onChange={(e) => {
                    this.handleLocalFormFill("relevant_info", e.target.value);
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
                  Add Person to List
                </Button>
              </Form.Group>
            </Form>
          </Modal>

          <Header as="h2">23. Details of persons (other than family members) residing with you</Header>
         

          <Button
            positive
            onClick={(e) => {
              this.setState({
                modalOpen: true,
              });
            }}
          >
            Add Person
          </Button>
        </div>
        <Table
          removeItemFormTable={this.removeItemFormTable}
          data={this.state.persons}
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
              BACK: (22). FOREIGN VISITS
            </Button>
            <Button.Or />
            <Button
              size="medium"
              positive
           
              onClick={(e) => {
                e.preventDefault();

                if (true) {
                  handleArrayFill("particulars_information", [
                    ...this.state.persons],

                    "persons_residing_with",
                  );
                   incrementStep()
                } else return false;
              }}
            >
              24. NRI RELATIVES: NEXT
            </Button>
          </Button.Group>
        </div>
      </div>
    );
  }
}

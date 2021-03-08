import React, { Component } from "react";

import "semantic-ui-css/semantic.min.css";

import "./index.css";

import GeneralInformation from "../../components/General_Info/General";
import PersonalInformation from "../../components/Personal_Info/PersonalInfo";

import AddressInformation from "../../components/Address_Info/Address_info";

import DomicileInformation from "../../components/Domicile_Info/DomicileInfo";

export default class App extends Component {
  state = {
    currentStep: 4,
    form: {
      general_information: {
        name: "",
        present_department: "",
        parent_department: "",
        designation: "",
        employee_id: "",
        photo: null,
      },
      personal_information: {
        first_name: "",
        middle_name: "",
        last_name: "",
        sex: null,
        alias: "",
        category: null,
        blood_group: null,
        birth_name: "",
      },
      address_information: {
        present_address: {
          house: "",
          locality: "",
          town_village: "",
          police_station: "",
          post_office: "",
          district: null,
          state_ut: "",
        },

        permanent_address: {
          house: "",
          locality: "",
          town_village: "",
          police_station: "",
          post_office: "",
          district: null,
          state_ut: "",
        },

        original_native_address: {
          house: "",
          locality: "",
          town_village: "",
          police_station: "",
          post_office: "",
          district: null,
          state_ut: "",
        },
      },

      domicile_information: {
        certificate_no: "",
        issuing_authority: "",
        photo: null,
      },
    },
  };

  handleFormFill = (section, id, value, sub_section = undefined) => {
    if (sub_section) {
      let form = { ...this.state.form };
      //GET SUB_SECTION DATA
      let sub_section_data = { ...this.state.form[section][sub_section] };

      if (value === undefined || value === undefined) {
        return;
      }

      //UPDATE SUB_SECTION_DATA
      sub_section_data[id] = value;

      //GET SECTION_DATA
      let section_data = { ...this.state.form[section] };
      //UPDATE SUB SECTION OF SECTION
      section_data[sub_section] = { ...sub_section_data };

      // UPDATE SECTION OF FORM
      form[section] = { ...section_data };

      this.setState({ form: form });
    } else {
      let form = { ...this.state.form };

      let section_data = { ...this.state.form[section] };

      if (value === undefined || value === "" || value === undefined) {
        return;
      }

      section_data[id] = value;

      form[section] = { ...section_data };
      this.setState({ form: form });
    }
  };

  incrementStep = () => {
    let currentStep = this.state.currentStep;
    this.setState({ currentStep: currentStep + 1 });
  };

  decrementStep = () => {
    let currentStep = this.state.currentStep;
    this.setState({ currentStep: currentStep - 1 });
  };

  render() {
    switch (this.state.currentStep) {
      case 1:
        return (
          <GeneralInformation
            form={this.state.form.general_information}
            handleFormFill={this.handleFormFill}
            incrementStep={this.incrementStep}
            decrementStep={this.decrementStep}
          />
        );

      case 2:
        return (
          <PersonalInformation
            form={this.state.form.personal_information}
            handleFormFill={this.handleFormFill}
            incrementStep={this.incrementStep}
            decrementStep={this.decrementStep}
          />
        );

      case 3:
        return (
          <AddressInformation
            form={this.state.form.address_information}
            handleFormFill={this.handleFormFill}
            incrementStep={this.incrementStep}
            decrementStep={this.decrementStep}
          />
        );

      case 4:
        return (
          <DomicileInformation
            form={this.state.form.domicile_information}
            handleFormFill={this.handleFormFill}
            incrementStep={this.incrementStep}
            decrementStep={this.decrementStep}
          />
        );

      default:
        return <div>Lost</div>;
    }
  }
}

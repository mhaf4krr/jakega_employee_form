import React, { Component } from "react";

import "semantic-ui-css/semantic.min.css";

import "./index.css";

import GeneralInformation from "../../components/General_Info/General";
import PersonalInformation from "../../components/Personal_Info/PersonalInfo";

import AddressInformation from "../../components/Address_Info/Address_info";

import DomicileInformation from "../../components/Domicile_Info/DomicileInfo";

import EducationInformation from "../../components/Educational_Info/EducationInfo";

import MobileNumbersInformation from "../../components/Mobile_Numbers/MobileNumbersInfo";

export default class App extends Component {
  state = {
    currentStep: 3,
    form: {
      general_information: {
        name: "",
        present_department: null,
        parent_department: null,
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

      educational_information: [],

      mobile_numbers: [],
    },
  };

  handleFormFill = (section, id, value, sub_section = undefined) => {
    if (sub_section) {
      let form = { ...this.state.form };
      //GET SUB_SECTION DATA
      let sub_section_data = { ...this.state.form[section][sub_section] };

      if (value === undefined) {
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

      if (value === undefined || value === null) {
        return;
      }

      section_data[id] = value;

      form[section] = { ...section_data };
      this.setState({ form: form });
    }
  };

  handleCopyAddress = () => {
    let form = { ...this.state.form };
    let present_address_info = form["address_information"]["present_address"];
    let permanent_address_info = { ...present_address_info };
    form["address_information"]["permanent_address"] = permanent_address_info;
    this.setState({ form: { ...form } });
  };

  handleArrayFill = (section, value) => {
    let form = { ...this.state.form };

    let section_data = [...value];
    form[section] = [...section_data];

    this.setState({ form: form });
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
            copyAddress={this.handleCopyAddress}
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

      case 5:
        return (
          <EducationInformation
            form={this.state.form.educational_information}
            handleArrayFill={this.handleArrayFill}
            incrementStep={this.incrementStep}
            decrementStep={this.decrementStep}
          />
        );

      case 6:
        return (
          <MobileNumbersInformation
            form={this.state.form.mobile_numbers}
            handleArrayFill={this.handleArrayFill}
            incrementStep={this.incrementStep}
            decrementStep={this.decrementStep}
          />
        );

      default:
        return <div>Lost</div>;
    }
  }
}

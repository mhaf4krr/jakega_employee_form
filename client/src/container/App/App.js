import React, { Component } from "react";

import "semantic-ui-css/semantic.min.css";

import "./index.css";

import GeneralInformation from "../../components/General_Info/General";
import PersonalInformation from "../../components/Personal_Info/PersonalInfo";

import AddressInformation from "../../components/Address_Info/Address_info";

import DomicileInformation from "../../components/Domicile_Info/DomicileInfo";

import EducationInformation from "../../components/Educational_Info/EducationInfo";

import MobileNumbersInformation from "../../components/Mobile_Numbers/MobileNumbersInfo";

import SocialInformation from "../../components/Social_Info/Social";

import VehiclesInformation from "../../components/Vehicles_Info/VehiclesInfo";

import LegalInformation from "../../components/Legal_Info/LegalInfo"

import AccountInformation from "../../components/Account_Numbers_information/AccountNumbers"

import PostingInformation from "../../components/ServiceInformation/PostingsInfo/PostingsInformation"

export default class App extends Component {
  state = {
    currentStep: 11,
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

      social_information: {
        email: "",
        fb: "",
        twitter: "",
        whatsapp: "",
      },

      vehicles: [],
      legal_info :{
        pan_number:"",
        aadhaar_number:"",
        passport_number:"",
        date_of_birth:null,
        place_of_birth:"",
        nationality:null,
        religion:null
      },

      accounts:[],


      service_details:{
        positings:[],
        promotions:[],
        joining:[]
      }
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

  handleArrayFill = (section, value,sub_section=undefined) => {
    
    let form = {...this.state.form}

    if(sub_section){
      let form_data = { ...this.state.form };
      let sub_section_data = [...value]
      form_data[section][sub_section] = [...sub_section_data]      
      this.setState({form:{...form_data}})

    }

    console.log(value)
   

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

      case 7:
        return (
          <SocialInformation
            form={this.state.form.social_information}
            handleFormFill={this.handleFormFill}
            incrementStep={this.incrementStep}
            decrementStep={this.decrementStep}
          />
        );

      case 8:
        return (
          <VehiclesInformation
            form={this.state.form.vehicles}
            handleArrayFill={this.handleArrayFill}
            incrementStep={this.incrementStep}
            decrementStep={this.decrementStep}
          />
        );

        case 9:
        return (
          <LegalInformation
            form={this.state.form.legal_info}
            handleFormFill={this.handleFormFill}
            incrementStep={this.incrementStep}
            decrementStep={this.decrementStep}
          />
        );

      

        case 10:
        return (
          <AccountInformation
            form={this.state.form.accounts}
              handleArrayFill={this.handleArrayFill}
            incrementStep={this.incrementStep}
            decrementStep={this.decrementStep}
          />
        );

        case 11:
        return (
          <PostingInformation
            form={this.state.form.service_details.positings}
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

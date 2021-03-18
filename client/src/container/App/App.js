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

import LegalInformation from "../../components/Legal_Info/LegalInfo";

import AccountInformation from "../../components/Account_Numbers_information/AccountNumbers";

import PostingInformation from "../../components/ServiceInformation/PostingsInfo/PostingsInformation";

import PromotionInformation from "../../components/ServiceInformation/PromotionsInfo/PromotionsInformation";

import JoiningInformation from "../../components/ServiceInformation/Joining_Details/JoiningInformation";

import EmployeeDetails from "../../components/Employee_Office_Details/EmployeeDetails";

import FamilyMembers from "../../components/Particulars/Family_Members/FamilyMembers";

import InLawMembers from "../../components/Particulars/InLaws/InLaws";

import CloseRelatives from "../../components/Particulars/CloseRelatives/CloseRelatives"

import Friends from "../../components/Particulars/Friends/Friends"

import Places from "../../components/Particulars/Places/Places"

import ForeignVisits from "../../components/Particulars/ForeignVisits/ForeignVisits"

import ForeignOfficials from "../../components/Particulars/ForeignOfficials/ForeignOfficials"

import SpouseForeignVisits from "../../components/Particulars/SpouseForeignVisits/SpouseForeignVisits"

import PersonsResidingWithYou from "../../components/Particulars/PersonsResidingWithYou/PersonsResidingWithYou"

import NRIFamilyMembers from "../../components/Particulars/NRI_FAMILY/FamilyMembers"

import ChildrenAbroad from "../../components/Particulars/ChildrenAbroad/ChildrenAbroad"

import PreviousEmployments from "../../components/Particulars/PreviousEmployments/PreviousEmployments"

import Questionare from "../../components/Questionaire/Questionaire"

import Declaration from "../../components/Declaration/Declaration"

export default class App extends Component {
  state = {
    currentStep: 1,
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
      legal_info: {
        pan_number: "",
        aadhaar_number: "",
        passport_number: "",
        date_of_birth: null,
        place_of_birth: "",
        nationality: null,
        religion: null,
      },

      accounts: [],

      service_details: {
        postings: [],
        promotions: [],
        joining: {
          recruiting_agency: null,
          date_of_appointment: null,
          order_number: "",
          initial_joining_department: null,
          initial_joining_office: "",
          date_of_joining: null,
          designation: "",
          employee_initial_cadre: null,
          employee_type: null,
          employee_category: null,
        },
      },

      employee_office_details: {
        current_designation: "",
        current_post: "",
        current_cadre: null,
        current_office: "",
        govt_accomodation_alloted: null,
        accomodation_details: "",
      },

      particulars_information: {
        family_members: [],
        in_laws: [],
        close_relatives: [],
        friends: [],
        places_resided:[],
        foreign_visits:[],
        contact_with_foreign_officials:[],
        spouse_foreign_visits:[],
        persons_residing_with:[],
        nri_family:[],
        children_abroad:[],
        previous_employments:[]
      },

      questionare:[]
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

  handleArrayFill = (section, value, sub_section = undefined) => {
    let form = { ...this.state.form };

    if (sub_section) {
      let form_data = { ...this.state.form };
      let sub_section_data = [...value];
      form_data[section][sub_section] = [...sub_section_data];
      this.setState({ form: { ...form_data } });
    } else {
      console.log(value);

      let section_data = [...value];
      form[section] = [...section_data];

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
            form={this.state.form.service_details.postings}
            handleArrayFill={this.handleArrayFill}
            incrementStep={this.incrementStep}
            decrementStep={this.decrementStep}
          />
        );

      case 12:
        return (
          <PromotionInformation
            form={this.state.form.service_details.promotions}
            handleArrayFill={this.handleArrayFill}
            incrementStep={this.incrementStep}
            decrementStep={this.decrementStep}
          />
        );

      case 13:
        return (
          <JoiningInformation
            form={this.state.form.service_details.joining}
            handleFormFill={this.handleFormFill}
            incrementStep={this.incrementStep}
            decrementStep={this.decrementStep}
          />
        );

      case 14:
        return (
          <EmployeeDetails
            form={this.state.form.employee_office_details}
            handleFormFill={this.handleFormFill}
            incrementStep={this.incrementStep}
            decrementStep={this.decrementStep}
          />
        );

      case 15:
        return (
          <FamilyMembers
            form={this.state.form.particulars_information.family_members}
            handleArrayFill={this.handleArrayFill}
            incrementStep={this.incrementStep}
            decrementStep={this.decrementStep}
          />
        );

      case 16:
        return (
          <InLawMembers
            form={this.state.form.particulars_information.in_laws}
            handleArrayFill={this.handleArrayFill}
            incrementStep={this.incrementStep}
            decrementStep={this.decrementStep}
          />
        );

        case 17:
          return (
            <CloseRelatives
              form={this.state.form.particulars_information.close_relatives}
              handleArrayFill={this.handleArrayFill}
              incrementStep={this.incrementStep}
              decrementStep={this.decrementStep}
            />
          );

          case 18:
            return (
              <Friends
                form={this.state.form.particulars_information.friends}
                handleArrayFill={this.handleArrayFill}
                incrementStep={this.incrementStep}
                decrementStep={this.decrementStep}
              />
            );

            case 19:
              return (
                <Places
                  form={this.state.form.particulars_information.places_resided}
                  handleArrayFill={this.handleArrayFill}
                  incrementStep={this.incrementStep}
                  decrementStep={this.decrementStep}
                />
              );

              case 20:
                return (
                  <ForeignVisits
                    form={this.state.form.particulars_information.foreign_visits}
                    handleArrayFill={this.handleArrayFill}
                    incrementStep={this.incrementStep}
                    decrementStep={this.decrementStep}
                  />
                );

              
                case 21:
                  return (
                    <ForeignOfficials
                      form={this.state.form.particulars_information.contact_with_foreign_officials}
                      handleArrayFill={this.handleArrayFill}
                      incrementStep={this.incrementStep}
                      decrementStep={this.decrementStep}
                    />
                  );

                  case 22:
                    return (
                      <SpouseForeignVisits
                        form={this.state.form.particulars_information.spouse_foreign_visits}
                        handleArrayFill={this.handleArrayFill}
                        incrementStep={this.incrementStep}
                        decrementStep={this.decrementStep}
                      />
                    );

                    case 23:
                      return (
                        <PersonsResidingWithYou
                          form={this.state.form.particulars_information.persons_residing_with}
                          handleArrayFill={this.handleArrayFill}
                          incrementStep={this.incrementStep}
                          decrementStep={this.decrementStep}
                        />
                      );

                      case 24:
                        return (
                          <NRIFamilyMembers
                            form={this.state.form.particulars_information.nri_family}
                            handleArrayFill={this.handleArrayFill}
                            incrementStep={this.incrementStep}
                            decrementStep={this.decrementStep}
                          />
                        );


                    case 25:

                    return(
                      <ChildrenAbroad
                      form={this.state.form.particulars_information.children_abroad}
                      handleArrayFill={this.handleArrayFill}
                      incrementStep={this.incrementStep}
                      decrementStep={this.decrementStep}
                    />
                    )

                    case 26:

                    return(
                      <PreviousEmployments
                      form={this.state.form.particulars_information.previous_employments}
                      handleArrayFill={this.handleArrayFill}
                      incrementStep={this.incrementStep}
                      decrementStep={this.decrementStep}
                    />
                    )


                    case 27:

                      return(
                        <Questionare
                        form={this.state.form.questionare}
                        handleArrayFill={this.handleArrayFill}
                        incrementStep={this.incrementStep}
                        decrementStep={this.decrementStep}
                      />
                      )

                      case 28:

                        return(
                          <Declaration
                          form={this.state.form}
                          
                        />
                        )
      default:
        return <div>Lost</div>;
    }
  }
}

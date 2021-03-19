import React from "react";

import PageTemplate from "../Page_Template/PageTemplate";

import { Form, Header, Image, Message } from "semantic-ui-react";

import default_img from "../../assets/image.png";



export default function Preview({ form }) {

    let checkForError = (value) =>{
        console.log(value)
        if(value === null || value === ""){
            return true
        }
    
        else return false
    }

    let createInfo = (section) =>{
        let entries = Object.entries(section)

     return   entries.map((entry)=>{
         console.log(entry[1])
            return(
                <Form.Input
                label={entry[0].replace("_"," ")}
                error={checkForError(entry[1])}
                value={entry[1]}
              />
            )
        })

    }
  return (
    <div>
      <PageTemplate>
        <Header as="h2">Preview Information</Header>

        <Header >General Information</Header>

        <Form>
          <Form.Group widths="equal">
            <div>
              <Image
                src={
                  form["general_information"]["photo"] === null
                    ? default_img
                    : window.URL.createObjectURL(
                        form["general_information"]["photo"]
                      )
                }
                size="medium"
              />

              {form["general_information"]["photo"] === null ? (
                <Message negative>
                  <Message.Header>
                    Couldn't find the Photo you have uploaded
                  </Message.Header>
                  <p>Please re-upload your photo and ensure it appears above</p>
                </Message>
              ) : null}
            </div>

            <div style={{width:"30%",marginLeft:"4rem"}}>
              <Form.Input
                label="Full Name"
               
                error={checkForError(form["general_information"]["name"])}
                value={form["general_information"]["name"]}
              />

              <Form.Input
                label="Present Department"
                error={checkForError(form["general_information"]["present_department"])}
                value={form["general_information"]["present_department"]}
              />

              <Form.Input
                label="Parent Department"
                error={checkForError(form["general_information"]["parent_department"])}
                value={form["general_information"]["parent_department"]}
              />

              <Form.Input
                label="Designation"
                error={checkForError(form["general_information"]["designation"])}
                value={form["general_information"]["designation"]}
              />

<Form.Input
                label="Employee ID"
                error={checkForError(form["general_information"]["employee_id"])}
                value={form["general_information"]["employee_id"]}
              />
            </div>
          </Form.Group>



          {/* PERSONAL INFORMATION */}

          <Header>Personal Information</Header>
          <div>
                {createInfo(form["personal_information"])}
          </div>

        </Form>
      </PageTemplate>
    </div>
  );
}

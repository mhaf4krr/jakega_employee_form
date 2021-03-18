import React from 'react'

import {Form,Radio,TextArea} from "semantic-ui-react"

export default function Question({sno,question,handleFormFill}) {
    return (
        <div style={{paddingTop:"2rem"}}>
            <Form>
            <h5> {sno+1}. {question.question}</h5>

          
          <Form.Group>
            <Form.Field width={4}>
              <Radio
                label="Yes"
                name="questionRadio"
                value="Yes"
                checked={question.answer === true}
                onChange={() => {
                 handleFormFill(sno,"answer",true)
                }}
              />
            </Form.Field>
            <Form.Field width={4}>
            <Radio
                label="No"
                name="questionRadio"
                value="No"
                checked={question.answer === false}
                onChange={() => {
                 handleFormFill(sno,"answer",false)
                }}
              />
            </Form.Field>
          </Form.Group>

          {question.answer?(
              <React.Fragment>
                  <Form.Field label="Please mention the Details" />
            <TextArea
              value={question.details}
              placeholder="Tell us more"
              onChange={(e) => {
                handleFormFill(sno,"details",e.target.value)
              }}
            />
              </React.Fragment>
          ):null}

          </Form>
        </div>
    )
}

import React, { Component } from 'react'
import { Header,Button } from 'semantic-ui-react'

import styles from "../../components/General_Info/General.module.css"

import PageTemplate from "../../components/Page_Template/PageTemplate"

import Question from "./Questions/Question"
export default class Questionaire extends Component {

    state={
        questions:[
            {
                question:"Have you ever been Arrested? Yes/No (If Yes, give details)",
                answer:null
            },
            {
                question:"Have you ever been Prosecuted ? Yes/No (If Yes, give details)",
                answer:null
            },
            {
                question:"Have you ever been kept under Detention ? Yes/No (If Yes, give details)",
                answer:null
            },
            {
                question:"Have you ever been Bound Down ? Yes/No (If Yes, give details)",
                answer:null
            },
            {
                question:"Have you ever been fined by a court of law? Yes/No (If Yes, give details)",
                answer:null
            },
            {
                question:"Have you ever been convicted by a court of law? Yes/No (If Yes, give details)",
                answer:null
            },
            {
                question:"Have you ever been charged before a court of law with an offence for which you were convicted,conditionally discharged, placed on probation or acquitted? Yes/No (If Yes, give details)",
                answer:null
            },

            {
                question:"Whether discharged / expelled / withdrawn from any training programme in Government / Private Institution ? (Yes/No) If Yes, give details.",
                answer:null
            },
            {
                question:"Have you ever been debarred / disqualified by any Public Service Commission/ Staff Selection Commission for any of its examination/Selection? Yes/No, give details?",
                answer:null
            },

            {
                question:"Is any case or inquiry / departmental proceeding pending against you in any court of law (including civil litigation) or with any other authority. If Yes, give details",
                answer:null
            },

            {
                question:"Have you ever been a prisoner of War or held in enemy country for any duration? If Yes,give details.",
                answer:null
            },
            {
                question:"Are you an Arms License holder? If so, give details of license and Arms in Possession.",
                answer:null
            },
            {
                question:"Details of outstanding loans,borrowings and financial liabilities of self and spouse",
                answer:null
            },
            {
                question:"Details of membership of cultural or social organizations associated with or assisted by a foreign mission or organization",
                answer:null
            },

            {
                question:"Details of membership of family members with close relatives of cultural / social organization which is associated with foreign mission or organization",
                answer:null
            },
            {
                question:"Details of membership of or association with proscribed / prohibited / banned organization viz Jamaat-e-Islami (JeI):",
                answer:null
            },
            {
                question:"Details of membership of Club / Society / Association / Trust / Charity and similar Bodies",
                answer:null
            },
            {
                question:"Details of membership of any political party / organization and participation in any political activity",
                answer:null
            },
            {
                question:"Details of membership of family members / close relatives with any political party / organization and participation in any political activity",
                answer:null
            },
            {
                question:"Details of legal proceedings against / prosecution of family members and close relatives",
                answer:null
            },
            {
                question:"Details of family members / close relatives having been prisoner of war or held in any enemy country for any duration",
                answer:null
            },

            {
                question:"Name, Address and Contact Numbers of two responsible persons from your locality or two references to whom you are known",
                answer:null
            },


        ]
    }

    validateForm = () =>{
        let validated = true
        let formData = this.state.questions

        for(let i=0;i<formData.length;i++){
          
            if(formData[i].answer === null){
                validated= false
                break
            }

            else if(formData[i].answer === true)
            {
               if(!formData[i].details){
                    validated=false
                    break
               }

               else if(formData[i].details && formData[i].details.length === 0){
                validated=false
                break
               }
            }
            
        }


        return validated
    }

    handleFormFill = (q_index,key,value)=>{
        let questions_data = [...this.state.questions]

        questions_data[q_index][key] = value

        this.setState({questions:[...questions_data]})
    } 


    render() {
        return (
            <PageTemplate>
                <Header as="h2">27. Questionare</Header>
                {this.state.questions.map((question,index)=>{


                    return (
                        <Question  key={index} sno={index} question={question} handleFormFill={this.handleFormFill} />
                    )
                })}

<div className={styles["btn_wrapper"]}>
          <Button.Group>
            <Button
              size="medium"
              color="yellow"
              onClick={(e) => {
                e.preventDefault();
                this.props.decrementStep();
              }}
            >
              BACK: (24). PREVIOUS EMPLOYMENTS
            </Button>
            <Button.Or />
            <Button
            disabled={!this.validateForm()}
              size="medium"
              positive
            
              onClick={(e) => {
                e.preventDefault();

                if (true) {
                  this.props.handleArrayFill(
                    "questionare",
                    [...this.state.questions],
                  );
                  this.props.incrementStep();
                } else return false;
              }}
            >
              26 DECLARATION: NEXT
            </Button>
          </Button.Group>
        </div>
            </PageTemplate>
        )
    }
}

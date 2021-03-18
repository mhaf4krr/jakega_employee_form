import React from 'react'
import { Button, Form, Header } from 'semantic-ui-react'

import PageTemplate from "../Page_Template/PageTemplate"

export default function Declaration() {
    return (
        <div>
            <PageTemplate>
                <Header as="h3">
                    Declaration
                </Header>

                <p>
                    I certify that the foregoing information is correct and complete to the best of my knowledge and belief
                </p>

                <p>
                    I am duly aware that by providing false information or suppressing material information while filling this form, the authorities have full right to terminate my appointment letter and i am also liable for the appropriate criminal/civil/legal action as a consequence.

                </p>

                <p>
                    I am not aware of any circumstances which might impair my fitness for employment under Government
                </p>

                <div>
                    <Button color="yellow">
                        Preview Details
                    </Button>
                </div>
            </PageTemplate>
        </div>
    )
}

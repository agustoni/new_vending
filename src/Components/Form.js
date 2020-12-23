import React, { Component } from 'react'
import StepWizard from 'react-step-wizard';
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import BannerVideo from '../Containers/BannerVideo'
import SectionTopping from '../Containers/SectionTopping'
import { Container } from "reactstrap";

export class Form extends Component {
    render() {
        return (
            <Container fluid={true} className="p-0">
                <SectionTopping/>
                {/* <BannerVideo videoUrl="indomie_default.mp4"></BannerVideo>
                <StepWizard>
                    <Step1 />
                    <Step2 />
                    <Step3 />
                </StepWizard> */}
            </Container>
        )
    }
}


export default Form

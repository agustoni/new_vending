import React, { Component } from 'react'
import BackNavigation from '../Containers/BackNavigation'

export class Step2 extends Component {
    render() {
        return (
            <div>
                <h2>Step {this.props.currentStep}</h2>
                <p>Total Steps: {this.props.totalSteps}</p>
                <p>Is Active: {this.props.isActive}</p>
                <p><BackNavigation click={this.props.previousStep}></BackNavigation></p>
                <p><button onClick={this.props.nextStep}>Next Step</button></p>
                <p><button onClick={()=>this.props.goToStep(2)}>Step 2</button></p>
                <p><button onClick={this.props.firstStep}>First Step</button></p>
                <p><button onClick={this.props.lastStep}>Last Step</button></p>
            </div>
        )
    }
}

export default Step2

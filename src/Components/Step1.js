import React, { Component } from 'react'
import { Row, Col, Card} from "reactstrap";
import CardProduct from "../Containers/CardProduct";

export class Step1 extends Component {
    render() {
        return (
            <div>
                <Row className="m-auto">
                    <Col md="5" lg="5" className="p-0">
                        <Card body className="text-white bg-info">
                            <Row>
                                <CardProduct grid={'col-md-6 col-lg-6 my-4'} image={'logo-indomie-soto.png'} title={'Indomie Soto'} bodytext={'Test'} ></CardProduct>
                                <CardProduct grid={'col-md-6 col-lg-6 my-4'} image={'logo-indomie-soto.png'} title={'Indomie Soto'} bodytext={'Test'} ></CardProduct>
                            </Row>
                        </Card>
                    </Col>
                    <Col md="7" lg="7" className="p-0">
                        <Card body className="text-white bg-dark">
                            <Row>
                                <CardProduct grid={'col-md-6 col-lg-6 my-4'} image={'logo-indomie-soto.png'} title={'Indomie Soto'} bodytext={'Test'} ></CardProduct>
                                <CardProduct grid={'col-md-6 col-lg-6 my-4'} image={'logo-indomie-soto.png'} title={'Indomie Soto'} bodytext={'Test'} ></CardProduct>
                                <CardProduct grid={'col-md-6 col-lg-6 my-4'} image={'logo-indomie-soto.png'} title={'Indomie Soto'} bodytext={'Test'} ></CardProduct>
                                <CardProduct grid={'col-md-6 col-lg-6 my-4'} image={'logo-indomie-soto.png'} title={'Indomie Soto'} bodytext={'Test'} ></CardProduct>
                                <CardProduct grid={'col-md-6 col-lg-6 my-4'} image={'logo-indomie-soto.png'} title={'Indomie Soto'} bodytext={'Test'} ></CardProduct>
                                <CardProduct grid={'col-md-6 col-lg-6 my-4'} image={'logo-indomie-soto.png'} title={'Indomie Soto'} bodytext={'Test'} ></CardProduct>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                <h2>Step {this.props.currentStep}</h2>
                <p>Total Steps: {this.props.totalSteps}</p>
                <p>Is Active: {this.props.isActive}</p>
                <p><button onClick={this.props.previousStep}>Previous Step</button></p>
                <p><button onClick={this.props.nextStep}>Next Step</button></p>
                <p><button onClick={()=>this.props.goToStep(2)}>Step 2</button></p>
                <p><button onClick={this.props.firstStep}>First Step</button></p>
                <p><button onClick={this.props.lastStep}>Last Step</button></p>
            </div>
            
        )
    }
}

export default Step1

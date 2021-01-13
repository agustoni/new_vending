import React, { Component } from 'react'
import StepWizard from 'react-step-wizard';
import Step1 from './Step1'
import Step2 from './Step2'
import { Container } from "reactstrap"
import axios from 'axios'
export class Form extends Component {
    constructor(props){
        super(props)
        this.state = {
            product : [],
            spiceLevel : [],
            topping : [],
            selectedProductHome : null,
        }
    }

    componentDidMount() {
        // AMBIL ALL DATA PRODUCT
        this.getDataProduct()
        this.getDataAdditional()
    }

    // AXIOS GET DATA PRODUCT USING HTTP REQUEST METHOD
    getDataProduct(){
        axios.get('http://localhost/api/vending_machine/product.php')
        .then(res => {
            this.setState({
                // ...this.state,
                product :res.data,
            })
        })
        .catch(function (error) {

        });

    }

    // AXIOS GET DATA SPICE LEVEL & TOPPING USING HTTP REQUEST METHOD
    getDataAdditional(){
        axios.get('http://localhost/api/vending_machine/additionalmie.php')
        .then(res => {
            this.setState({
                // ...this.state,
                spiceLevel :res.data.spicelevel,
                topping : res.data.topping
            })
        })
        .catch(function (error) {

        });
    }


    // CLICK HANDLER
    clickHandlerProductHome = (data) => {
        this.setState({
            ...this.state,
            selectedProductHome : data
        })
    }
    
    render() {
        let {product, spiceLevel, topping, selectedProductHome} = this.state
        return (
            <Container fluid={true} className="p-0">
                <StepWizard isLazyMount={true}>
                    <Step1 product={product} clickHandlerProductHome={(data) => this.clickHandlerProductHome(data)}/>
                    <Step2 product={product} spiceLevel={spiceLevel} topping={topping} selectedProductHome={selectedProductHome}/>
                    {/* <Step3 /> */}
                </StepWizard>
            </Container>
        )
    }
}


export default Form

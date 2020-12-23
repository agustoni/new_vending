import React, { Component } from 'react'
import { Row, Col, Card} from "reactstrap";
import ListProduct from "../Containers/ListProduct";
import ListProductItem from "../Containers/ListProductItem"

export class Step1 extends Component {

    constructor(props){
        super(props)

        this.state = {
            dummyProduct : [],
            dummyProductItems : [],
        }
    }

    componentDidMount(){
        // AMBIL ALL DATA PRODUCT
        this.getDataProduct()
        this.getDataProductItem(1)
    }

    // AXIOS GET DATA PRODUCT USING HTTP REQUEST METHOD
    getDataProduct(){
        this.setState({
            dummyProduct : [
                {
                    id: 1,
                    name: 'Indomie Soto',
                    image: 'logo-indomie-soto.png',
                    bodyText: 'Indomie soto dengan berbagai macam varian rasa',
                    color: '#10ff00'
                },
                {
                    id: 2,
                    name: 'Mie Sedap Goreng',
                    image: 'logo-mie-sedap-goreng.png',
                    bodyText: 'Indomie soto dengan berbagai macam varian rasa',
                    color: '#ffffff'
                }
            ]
        })
    }

    // AXIOS GET DATA PRODUCT ITEMS USING HTTP REQUEST METHOD
    getDataProductItem(idProduct) {
        console.log(idProduct)
        // DUMMY
        let data = '';
        if(idProduct === 1){
            data = [
                {
                    id: 1,
                    idProduct: 1,
                    image: 'logo-indomie-soto.png',
                    color: '#10ff00',
                    title: 'Indomie Soto XXX',
                    bodyText: 'Ini adalah indomie soto dengan varian rasa xxx',
                    price: ''
                },
                {
                    id: 2,
                    idProduct: 1,
                    image: 'logo-indomie-soto.png',
                    color: '#10ff00',
                    title: 'Indomie Soto XXX',
                    bodyText: 'Ini adalah indomie soto dengan varian rasa xxx',
                    price: ''
                },
                {
                    id: 3,
                    idProduct: 1,
                    image: 'logo-indomie-soto.png',
                    color: '#10ff00',
                    title: 'Indomie Soto XXX',
                    bodyText: 'Ini adalah indomie soto dengan varian rasa xxx',
                    price: ''
                },
                {
                    id: 4,
                    idProduct: 1,
                    image: 'logo-indomie-soto.png',
                    color: '#10ff00',
                    title: 'Indomie Soto XXX',
                    bodyText: 'Ini adalah indomie soto dengan varian rasa xxx',
                    price: ''
                },
                {
                    id: 5,
                    idProduct: 1,
                    image: 'logo-indomie-soto.png',
                    color: '#10ff00',
                    title: 'Indomie Soto XXX',
                    bodyText: 'Ini adalah indomie soto dengan varian rasa xxx',
                    price: ''
                }
            ]
        }else if (idProduct === 2){
            data = [
                {
                    id: 1,
                    idProduct: 2,
                    image: 'logo-mie-sedap-goreng.png',
                    color: '#ffffff',
                    title: 'Mie Sedap Goreng XXX',
                    bodyText: 'Ini adalah mie sedap goreng dengan varian rasa xxx',
                    price: ''
                },
                {
                    id: 1,
                    idProduct: 2,
                    image: 'logo-mie-sedap-goreng.png',
                    color: '#ffffff',
                    title: 'Mie Sedap Goreng XXX',
                    bodyText: 'Ini adalah mie sedap goreng dengan varian rasa xxx',
                    price: ''
                },
                {
                    id: 3,
                    idProduct: 2,
                    image: 'logo-mie-sedap-goreng.png',
                    color: '#ffffff',
                    title: 'Mie Sedap Goreng XXX',
                    bodyText: 'Ini adalah mie sedap goreng dengan varian rasa xxx',
                    price: ''
                },
                {
                    id: 4,
                    idProduct: 2,
                    image: 'logo-mie-sedap-goreng.png',
                    color: '#ffffff',
                    title: 'Mie Sedap Goreng XXX',
                    bodyText: 'Ini adalah mie sedap goreng dengan varian rasa xxx',
                    price: ''
                },
                {
                    id: 5,
                    idProduct: 2,
                    image: 'logo-mie-sedap-goreng.png',
                    color: '#ffffff',
                    title: 'Mie Sedap Goreng XXX',
                    bodyText: 'Ini adalah mie sedap goreng dengan varian rasa xxx',
                    price: ''
                },
            ]
        }
        // END DUMMY

        this.setState({
            dummyProductItems : data
        })
    }

    render() {
        const listDataProduct = this.state.dummyProduct.map((v, key) => 
                                <Row className="m-2" key={key}>
                                    <ListProduct click={()=>this.getDataProductItem(v.id)} image={v.image} backgroundColor={v.color} title={v.name} bodytext={v.bodyText}></ListProduct>
                                </Row>
                    )
        
        let listDataProductItems = this.state.dummyProductItems.map((v, key) => 
            <ListProductItem key={key} grid={'col-md-6 col-lg-6 pt-2 pb-0 pr-2 pl-0'} image={v.image} title={v.title} bodytext={v.bodyText} backgroundColor={v.color}></ListProductItem>
        )
        return (
            <div>
                <Row className="m-auto">
                    <Col md="6" lg="6" className="p-0">
                        { listDataProduct }
                    </Col>
                    <Col md="6" lg="6" className="p-0">
                        <Row className="mx-auto row">
                        { listDataProductItems }
                        </Row>
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

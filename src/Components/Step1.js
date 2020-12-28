import React, {Component} from 'react'
import {Row, Col} from "reactstrap";
import ListProduct from "../Containers/ListProduct";
import ListProductItem from "../Containers/ListProductItem"
import Numpad from '../Containers/Numpad'
import SectionTopping from '../Containers/SectionTopping'
import axios from 'axios'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons'
import './../css/style.css'

export class Step1 extends Component {

    constructor(props){
        super(props)

        this.state = {
            product : [],
            productItems : [],
            number : ''
        }
    }

    componentDidMount(){
        // AMBIL ALL DATA PRODUCT
        this.getDataProduct()
        this.getDataProductItem(6) //DEFAULT STATIC ID PRODUCT INDOMIE SOTO
    }

    // AXIOS GET DATA PRODUCT USING HTTP REQUEST METHOD
    getDataProduct(){
        axios.get('http://localhost/api/vending_machine/product.php')
        .then(res => {
            this.setState({
                // ...this.state,
                product :res.data
            })
        })
        .catch(function (error) {

        });


        // this.setState({
        //     product : [
        //         {
        //             id: 1,
        //             name: 'Indomie Soto',
        //             image: 'logo-indomie-soto.png',
        //             bodyText: 'Indomie soto dengan berbagai macam varian rasa',
        //             color: '#10ff00',
        //             textColor: '#000000'
        //         },
        //         {
        //             id: 2,
        //             name: 'Mie Sedap Goreng',
        //             image: 'logo-mie-sedap-goreng.png',
        //             bodyText: 'Indomie soto dengan berbagai macam varian rasa',
        //             color: '#ffffff',
        //             textColor: '#000000'
        //         },
        //         {
        //             id: 3,
        //             name: 'Ovo',
        //             image: 'logo-ovo.png',
        //             bodyText: 'Saldo Ovo',
        //             color: '#4c3494',
        //             textColor: '#ffffff'
        //         }
        //     ]
        // })
    }

    // AXIOS GET DATA PRODUCT ITEMS USING HTTP REQUEST METHOD
    getDataProductItem(idProduct) {
        console.log(idProduct)
        axios.get('http://localhost/api/vending_machine/productdetail.php', {
            params: {
              idproduct: idProduct
            }
        })
        .then(res => {
            this.setState({
                productItems :res.data
            })
        })
        .catch(function (error) {

        });
        // DUMMY
        // let data = '';
        // if(idProduct === 1){
        //     data = [
        //         {
        //             id: 1,
        //             idProduct: 1,
        //             image: 'logo-indomie-soto.png',
        //             color: '#10ff00',
        //             title: 'Indomie Soto XXX',
        //             bodyText: 'Ini adalah indomie soto dengan varian rasa xxx',
        //             price: '',
        //             textColor: '#000000'
        //         },
        //         {
        //             id: 2,
        //             idProduct: 1,
        //             image: 'logo-indomie-soto.png',
        //             color: '#10ff00',
        //             title: 'Indomie Soto XXX',
        //             bodyText: 'Ini adalah indomie soto dengan varian rasa xxx',
        //             price: '',
        //             textColor: '#000000'
        //         },
        //         {
        //             id: 3,
        //             idProduct: 1,
        //             image: 'logo-indomie-soto.png',
        //             color: '#10ff00',
        //             title: 'Indomie Soto XXX',
        //             bodyText: 'Ini adalah indomie soto dengan varian rasa xxx',
        //             price: '',
        //             textColor: '#000000'
        //         },
        //         {
        //             id: 4,
        //             idProduct: 1,
        //             image: 'logo-indomie-soto.png',
        //             color: '#10ff00',
        //             title: 'Indomie Soto XXX',
        //             bodyText: 'Ini adalah indomie soto dengan varian rasa xxx',
        //             price: '',
        //             textColor: '#000000'
        //         },
        //         {
        //             id: 5,
        //             idProduct: 1,
        //             image: 'logo-indomie-soto.png',
        //             color: '#10ff00',
        //             title: 'Indomie Soto XXX',
        //             bodyText: 'Ini adalah indomie soto dengan varian rasa xxx',
        //             price: '',
        //             textColor: '#000000'
        //         }
        //     ]
        // }else if (idProduct === 2){
        //     data = [
        //         {
        //             id: 1,
        //             idProduct: 2,
        //             image: 'logo-mie-sedap-goreng.png',
        //             color: '#ffffff',
        //             title: 'Mie Sedap Goreng XXX',
        //             bodyText: 'Ini adalah mie sedap goreng dengan varian rasa xxx',
        //             price: '',
        //             textColor: '#000000'
        //         },
        //         {
        //             id: 1,
        //             idProduct: 2,
        //             image: 'logo-mie-sedap-goreng.png',
        //             color: '#ffffff',
        //             title: 'Mie Sedap Goreng XXX',
        //             bodyText: 'Ini adalah mie sedap goreng dengan varian rasa xxx',
        //             price: '',
        //             textColor: '#000000'
        //         },
        //         {
        //             id: 3,
        //             idProduct: 2,
        //             image: 'logo-mie-sedap-goreng.png',
        //             color: '#ffffff',
        //             title: 'Mie Sedap Goreng XXX',
        //             bodyText: 'Ini adalah mie sedap goreng dengan varian rasa xxx',
        //             price: '',
        //             textColor: '#000000'
        //         },
        //         {
        //             id: 4,
        //             idProduct: 2,
        //             image: 'logo-mie-sedap-goreng.png',
        //             color: '#ffffff',
        //             title: 'Mie Sedap Goreng XXX',
        //             bodyText: 'Ini adalah mie sedap goreng dengan varian rasa xxx',
        //             price: '',
        //             textColor: '#000000'
        //         },
        //         {
        //             id: 5,
        //             idProduct: 2,
        //             image: 'logo-mie-sedap-goreng.png',
        //             color: '#ffffff',
        //             title: 'Mie Sedap Goreng XXX',
        //             bodyText: 'Ini adalah mie sedap goreng dengan varian rasa xxx',
        //             price: '',
        //             textColor: '#000000'
        //         },
        //     ]
        // }else if (idProduct === 3){
        //     data = [
        //         {
        //             id: 1,
        //             idProduct: 3,
        //             image: 'logo-ovo.png',
        //             color: '#4c3494',
        //             title: 'Saldo Ovo 10000',
        //             bodyText: '',
        //             price: '12000',
        //             textColor: '#ffffff'
        //         },
        //         {
        //             id: 2,
        //             idProduct: 3,
        //             image: 'logo-ovo.png',
        //             color: '#4c3494',
        //             title: 'Saldo Ovo 10000',
        //             bodyText: '',
        //             price: '12000',
        //             textColor: '#ffffff'
        //         },
        //         {
        //             id: 3,
        //             idProduct: 3,
        //             image: 'logo-ovo.png',
        //             color: '#4c3494',
        //             title: 'Saldo Ovo 10000',
        //             bodyText: '',
        //             price: '12000',
        //             textColor: '#ffffff'
        //         },
        //         {
        //             id: 4,
        //             idProduct: 3,
        //             image: 'logo-ovo.png',
        //             color: '#4c3494',
        //             title: 'Saldo Ovo 10000',
        //             bodyText: '',
        //             price: '12000',
        //             textColor: '#ffffff'
        //         },
        //         {
        //             id: 5,
        //             idProduct: 3,
        //             image: 'logo-ovo.png',
        //             color: '#4c3494',
        //             title: 'Saldo Ovo 10000',
        //             bodyText: '',
        //             price: '12000',
        //             textColor: '#ffffff'
        //         },
        //         {
        //             id: 6,
        //             idProduct: 3,
        //             image: 'logo-ovo.png',
        //             color: '#4c3494',
        //             title: 'Saldo Ovo 10000',
        //             bodyText: '',
        //             price: '12000',
        //             textColor: '#ffffff'
        //         },
        //         {
        //             id: 7,
        //             idProduct: 3,
        //             image: 'logo-ovo.png',
        //             color: '#4c3494',
        //             title: 'Saldo Ovo 10000',
        //             bodyText: '',
        //             price: '12000',
        //             textColor: '#ffffff'
        //         },
        //         {
        //             id: 8,
        //             idProduct: 3,
        //             image: 'logo-ovo.png',
        //             color: '#4c3494',
        //             title: 'Saldo Ovo 10000',
        //             bodyText: '',
        //             price: '12000',
        //             textColor: '#ffffff'
        //         },
        //     ]
        // }
        // END DUMMY

        // this.setState({
        //     productItems : data
        // })
    }

    //NUMPAD
    clickHandlerNumpad = (num)=>{
        let inputVal = this.state.number

        if(num === "delete"){
            if(inputVal !== ""){
                inputVal = inputVal.slice(0, -1)
            }
            
        }else if(num === "ok"){
            if(inputVal !== ""){
                //jika oke
                console.log("oke")
            }
        }else{
            inputVal += num
        }

        this.setState({
            ...this.state,
            number : inputVal
        })
    }

    clickHandlerStep3 = (action, el=null) =>{
        var target = document.getElementById('menuStep3')

        if(action === "open"){
            target.style.width = "98%";
            target.style.border = "3px solid";

        }else{
            target.style.width = "0px";
            target.style.border = "0px";
        }

        var menuStep3 = document.getElementsByClassName("menuStep3")
        for(var i=0;i<menuStep3.length;i++){
            if(el === menuStep3[i].id){
                document.getElementById(menuStep3[i].id).style.display = "block"
            }else{
                document.getElementById(menuStep3[i].id).style.display = "none"
            }
        }
    }

    render() {
        const listDataProduct = this.state.product.map((v, key) => 
                                <Row className="m-2" key={key}>
                                    <ListProduct click={()=>this.getDataProductItem(v.id)} image={v.image} backgroundColor={v.color} title={v.product} bodytext={v.text} textColor={v.text_color} idCategory={v.id_category}></ListProduct>
                                </Row>
                    )
        
        let listDataProductItems = this.state.productItems.map((v, key) => 
            <ListProductItem key={key} grid={'col-md-6 col-lg-6 pt-2 pb-0 pr-2 pl-0'} image={v.image} title={v.title} bodytext={v.name} backgroundColor={v.color} textColor={v.text_color} sellingPrice={v.selling_price} idCategory={v.id_category} id={v.id}></ListProductItem>
        )
<<<<<<< HEAD

=======
        console.log(this.state)
>>>>>>> e777cadce871f06498364e047c4f05c347551fcf
        return (
            <div>
                <Row className="m-auto">
                    <Col md="6" lg="6" className="p-0">
                        <div className="m-2 row" style={{backgroundColor:"#fff"}}>
                            <button style={{marginLeft: "50px", zIndex: "5"}} onClick={() => this.clickHandlerStep3("open", "menuStep3Indomie")}>indomie</button>
                            <button style={{marginLeft: "50px", zIndex: "5"}} onClick={() => this.clickHandlerStep3("open", "menuStep3Ppob")}>ppob</button>
                            <button style={{marginLeft: "50px", zIndex: "5"}} onClick={() => this.clickHandlerStep3("close")}>close</button>
                        </div>
                        <div id="menuStep3" className="m-2 row" style={{backgroundColor: "#000", color:"#fff", border: "0px solid", height:"75%"}}>
                            <div style={{width:"87%", float:"left", padding:"0px 15px"}}>
                                <SectionTopping/>
                                <Numpad numberValue={this.state.number} click={(num)=>this.clickHandlerNumpad(num)}></Numpad>
                            </div>
                            <div id="closeStep3" style={{width:"13%", float:"left", height:"100%", borderLeft: "3px solid", position:"relative"}}
                            onClick={()=>this.clickHandlerStep3('close')}>
                            <FontAwesomeIcon 
                                icon={faAngleDoubleLeft} 
                                size="3x" 
                                style={{color: "rgb(255 255 255)", cursor: "pointer", position: "absolute", left: "10px", top: "45%"}} />
                            </div>
                        </div>
                        {listDataProduct}
                    </Col>
                    <Col md="6" lg="6" className="p-0">
                        <Row className="mx-auto row">
                        {listDataProductItems}
                        </Row>
                    </Col>
                </Row>
<<<<<<< HEAD
                
=======
                {/* <Numpad numberValue={this.state.number} click={(num)=>this.clickHandlerNumpad(num)}></Numpad>
>>>>>>> e777cadce871f06498364e047c4f05c347551fcf
                <h2>Step {this.props.currentStep}</h2>
                <p>Total Steps: {this.props.totalSteps}</p>
                <p>Is Active: {this.props.isActive}</p>
                <p><button onClick={this.props.previousStep}>Previous Step</button></p>
                <p><button onClick={this.props.nextStep}>Next Step</button></p>
                <p><button onClick={()=>this.props.goToStep(2)}>Step 2</button></p>
                <p><button onClick={this.props.firstStep}>First Step</button></p>
                <p><button onClick={this.props.lastStep}>Last Step</button></p> */}
            </div>
            
        )
    }
}

export default Step1

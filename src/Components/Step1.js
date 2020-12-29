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
            dataOrder: {},
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
            }, ()=>{
                console.log(this.state.productItems)
            })
        })
        .catch(function (error) {

        });
        
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

    clickHandlerProduct = (x)=>{
        var target = document.getElementById('menuStep3')
        var prdName = document.getElementById('productName')
        console.log(x)

        if(x.action === "open"){
            target.style.width = "98%";
            target.style.border = "3px solid";
            prdName.innerHTML = x.bodytext
        }else{
            target.style.width = "0px";
            target.style.border = "0px";
            prdName.innerHTML = ""
        }

        var menuStep3 = document.getElementsByClassName("menuStep3")
        for(var i=0;i<menuStep3.length;i++){
            if("menuStep3_"+x.idCategory === menuStep3[i].id){
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
            <ListProductItem click={(dataPrdItem)=>this.clickHandlerProduct(dataPrdItem)} key={key} grid={'col-md-6 col-lg-6 pt-2 pb-0 pr-2 pl-0'} image={v.image} title={v.title} bodytext={v.name} backgroundColor={v.color} textColor={v.text_color} sellingPrice={v.selling_price} idCategory={v.id_category} id={v.id}></ListProductItem>
        )

        return (
            <div>
                <Row className="m-auto">
                    <Col md="6" lg="6" className="p-0">
                        {/* <div className="m-2 row" style={{backgroundColor:"#fff"}}>
                            <button style={{marginLeft: "50px", zIndex: "5"}} onClick={() => this.clickHandlerProduct({action:"open", idCategory:2})}>indomie</button>
                            <button style={{marginLeft: "50px", zIndex: "5"}} onClick={() => this.clickHandlerProduct({action:"open", idCategory:1})}>ppob</button>
                            <button style={{marginLeft: "50px", zIndex: "5"}} onClick={() => this.clickHandlerProduct({action:"close"})}>close</button>
                        </div> */}
                        <div id="menuStep3" className="m-2 row" style={{backgroundColor: "#000", color:"#fff", border: "0px solid", height:"800pxz"}}>
                            <div style={{width:"87%", float:"left", padding:"0px 15px"}}>
                                <h3 id="productName">{}</h3>
                                <SectionTopping/>
                                <Numpad numberValue={this.state.number} click={(num)=>this.clickHandlerNumpad(num)}></Numpad>
                            </div>
                            <div id="closeStep3" style={{width:"13%", float:"left", height:"100%", borderLeft: "3px solid", position:"relative"}}
                            onClick={()=>this.clickHandlerProduct({action:"close"})}>
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

import React, {Component} from 'react'
import {Row, Col} from "reactstrap";
import ListProduct from "../Containers/ListProduct";
import ListProductItem from "../Containers/ListProductItem"
import Numpad from '../Containers/Numpad'
import SectionTopping from '../Containers/SectionTopping'
import Payment from '../Containers/Payment'

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
            spiceLevel : [],
            topping : [],
            dataOrder: {},
            number : '',
            qrPayment: '',
            boolSelectProductItem : false
        }
    }

    componentDidMount(){
        // AMBIL ALL DATA PRODUCT
        this.getDataProduct()
        this.getDataProductItem(6) //DEFAULT STATIC ID PRODUCT INDOMIE SOTO
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.state.dataOrder != prevState.dataOrder){
            console.log(this.state)
        }
    }

    // AXIOS GET DATA PRODUCT USING HTTP REQUEST METHOD
    getDataProduct(){
        axios.get('https://vending.biru.id/api/api_29dec20/product.php')
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
        axios.get('https://vending.biru.id/api/api_29dec20/productdetail.php', {
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

    // AXIOS GET DATA SPICE LEVEL & TOPPING USING HTTP REQUEST METHOD
    getDataAdditional(){
        axios.get('http://localhost/api/vending_machine/additionalmie.php')
        .then(res => {
            this.setState({
                ...this.state,
                spiceLevel :res.data.spicelevel,
                topping : res.data.topping
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

    //TOGGLE UNTUK HIDE AND SHOW TOPPING SECTION DAN NUMPAD
    clickHandlerProduct = (x)=>{
<<<<<<< HEAD
        this.handlerMenuStep3(x.action, x.bodytext)

        var menuStep3 = document.getElementsByClassName("menuStep3")
        for(var i=0;i<menuStep3.length;i++){
            if("menuStep3_"+x.idCategory === menuStep3[i].id){
                document.getElementById(menuStep3[i].id).style.display = "block"
            }else{
                document.getElementById(menuStep3[i].id).style.display = "none"
            }
        }
    }

    clickHandlerOrder = (orderCategory)=>{
        if(orderCategory === "mie"){
            console.log("processing mie")
        }else{
            console.log("processing PPOB")
        }

        this.handlerMenuStep4("open")
    }

    handlerMenuStep3 = (action, name)=>{
        var target = document.getElementById('menuStep3')
        var prdName = document.getElementById('productName')
        
        if(action === "open"){
            target.style.width = "100%";
=======
        if(x.idCategory == 2){
            this.getDataAdditional()
        }
        
        var target = document.getElementById('menuStep3')
        var prdName = document.getElementById('productName')
        this.setState({
            ...this.state,
            dataOrder :{
                idProductDetail : x.id,
                idProductCategory : x.idCategory,
                price : x.sellingPrice,
                code: x.code
            },
            boolSelectProductItem : true,
        })

        if(x.action === "open"){
            target.style.width = "98%";
>>>>>>> faa244bc3c463cceccafe890e9f63a2140ef275f
            target.style.border = "3px solid";
            prdName.innerHTML = name
        }else{
            target.style.width = "0px";
            target.style.border = "0px";
            prdName.innerHTML = ""
        }
    }

    handlerMenuStep4 = (action)=>{
        var target = document.getElementById('menuStep4')

        if(action === "open"){
            target.style.width = "100%";
            target.style.border = "3px solid";
        }else{
            target.style.width = "0px";
            target.style.border = "0px";
        }
    }


    cancelOrder = ()=>{
        window.location.reload()
    }

    clickHandlerSubmitOrder = (data) => {

    }

    changeHandlerSpiceLevel = (level, price) =>{
        let dataOrder = this.state.dataOrder
        dataOrder['spiceLevel'] = level
        dataOrder['spiceLevelPrice'] = price
        this.setState({
            ...this.state,
            dataOrder,
            boolSelectProductItem : false,
        }, () => {
            let spiceLevel = document.getElementsByClassName("spicelevel");
            for(var i=0;i<spiceLevel.length;i++){
                if(i<level){
                    spiceLevel[i].classList.add("selected-spice")
                }else{
                    spiceLevel[i].classList.remove("selected-spice")
                }
            }
            this.calc()
        })
    }

    changeHandlerQty = (data) => {
        let dataOrder = this.state.dataOrder
        dataOrder['qty'] = data
        this.setState({
            ...this.state,
            dataOrder,
            boolSelectProductItem : false,
        }, () => {
            let selection = document.getElementsByClassName("qty")
            for(var i=0;i<selection.length;i++){
                if(i+1 === data){
                    selection[i].classList.add("selected-qty")
                }else{
                    selection[i].classList.remove("selected-qty")
                }
            }
            this.calc()
        })
    }

    calc = () => {
        let dataOrder = this.state.dataOrder
        console.log(dataOrder)
    }

    render() {
        const listDataProduct = this.state.product.map((v, key) => 
                                <Row className="m-2" key={key}>
                                    <ListProduct click={()=>this.getDataProductItem(v.id)} image={v.image} backgroundColor={v.color} title={v.product} bodytext={v.text} textColor={v.text_color} idCategory={v.id_category}></ListProduct>
                                </Row>
                    )
        
        let listDataProductItems = this.state.productItems.map((v, key) => 
            <ListProductItem click={(dataPrdItem)=>this.clickHandlerProduct(dataPrdItem)} key={key} grid={'col-md-6 col-lg-6 pt-2 pb-0 pr-2 pl-0'} image={v.image} title={v.title} bodytext={v.name} backgroundColor={v.color} textColor={v.text_color} sellingPrice={v.selling_price} idCategory={v.id_category} id={v.id} code={v.code}></ListProductItem>
        )

        return (
            <div>
                <Row className="m-auto">
                    <Col md="6" lg="6" className="p-0">
<<<<<<< HEAD
                        <div id="menuStep3" className="m-2 row" style={{backgroundColor: "#000", color:"#fff", border: "0px solid", height:"800px"}}>
                            <div style={{width:"87%", float:"left", padding:"0px 15px"}}>
                                <h3 id="productName">{}</h3>
                                <SectionTopping clickOrder={(x)=>this.clickHandlerOrder(x)}/>
=======
                        <div id="menuStep3" className="m-2 row" style={{backgroundColor: "#000", color:"#fff", border: "0px solid", height:"800pxz"}}>
                            <div style={{width:"87%", float:"left", padding:"0px 15px"}}>
                                <h3 id="productName" className="my-5 text-center">{}</h3>
                                <SectionTopping dataOrder={this.state.dataOrder} changeQty = {(data) => this.changeHandlerQty(data)} changeSpiceLevel = {(level, price) => this.changeHandlerSpiceLevel(level, price)}  click={(data) => this.clickHandlerSubmitOrder(data)} boolSelectProductItem={this.state.boolSelectProductItem} spiceLevel={this.state.spiceLevel} topping={this.state.topping}/>
>>>>>>> faa244bc3c463cceccafe890e9f63a2140ef275f
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
                        <div id="menuStep4" className="m-2 row">
                            <Payment qrVal={this.state.qrPayment} cancel={()=>this.cancelOrder()}/> 
                        </div>
                        <Row className="mx-auto row">
                        {listDataProductItems}
                        </Row>
                    </Col>
                </Row>
            </div>
            
        )
    }
}

export default Step1

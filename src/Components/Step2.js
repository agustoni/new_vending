import React, {Component} from 'react'
import {Row, Col} from "reactstrap";
import ListProduct from "../Containers/ListProduct";
import ListProductItem from "../Containers/ListProductItem"
import Numpad from '../Containers/Numpad'
import SectionTopping from '../Containers/SectionTopping'
import axios from 'axios'
import BackNavigation from '../Containers/BackNavigation'
import BannerVideo from '../Containers/BannerVideo'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons'
import './../css/style.css'

export class Step2 extends Component {

    constructor(props){
        super(props)

        this.state = {
            productItems : [],
            dataOrder: {},
            number : '',
            boolSelectProductItem : false
        }
    }

    componentDidMount(){
        this.getDataProductItem(this.props.selectedProductHome)
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.state.dataOrder != prevState.dataOrder){
            console.log(this.state)
        }
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
        let {product, spiceLevel, topping, selectedProductHome} = this.props

        console.log(spiceLevel)
        let listDataProduct = product.map((v, key) =>
                                <Row className="m-2"key={key}>
                                    <ListProduct click={()=>this.getDataProductItem(v.id)} image={v.image} backgroundColor={v.color} title={v.product} bodytext={v.text} textColor={v.text_color} idCategory={v.id_category}></ListProduct>
                                </Row>
                    )
        
        let listDataProductItems = this.state.productItems.map((v, key) => 
            <ListProductItem click={(dataPrdItem)=>this.clickHandlerProduct(dataPrdItem)} key={key} grid={'col-md-6 col-lg-6 pt-2 pb-0 pr-2 pl-0'} image={v.image} title={v.title} bodytext={v.name} backgroundColor={v.color} textColor={v.text_color} sellingPrice={v.selling_price} idCategory={v.id_category} id={v.id} code={v.code}></ListProductItem>
        )

        return (
            <div>
                <BannerVideo videoUrl="indomie_default.mp4"></BannerVideo>
                <Row className="m-auto">
                    <Col md="6" lg="6" className="p-0">
                        <div id="menuStep3" className="m-2 row" style={{backgroundColor: "#000", color:"#fff", border: "0px solid", height:"800pxz"}}>
                            <div style={{width:"87%", float:"left", padding:"0px 15px"}}>
                                <h3 id="productName" className="my-5 text-center">{}</h3>
                                <SectionTopping dataOrder={this.state.dataOrder} changeQty = {(data) => this.changeHandlerQty(data)} changeSpiceLevel = {(level, price) => this.changeHandlerSpiceLevel(level, price)}  click={(data) => this.clickHandlerSubmitOrder(data)} boolSelectProductItem={this.state.boolSelectProductItem} spiceLevel={spiceLevel} topping={topping}/>
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
                <p><BackNavigation click={this.props.previousStep}></BackNavigation></p>
                
            </div>
            
        )
    }
}

export default Step2

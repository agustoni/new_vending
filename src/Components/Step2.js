import React, {Component} from 'react'
import {Row, Col} from "reactstrap";
import ListProduct from "../Containers/ListProduct";
import ListProductItem from "../Containers/ListProductItem"
import Numpad from '../Containers/Numpad'
import SectionTopping from '../Containers/SectionTopping'
import axios from 'axios'
import BackNavigation from '../Containers/BackNavigation'
import BannerVideo from '../Containers/BannerVideo'
import Payment from '../Containers/Payment'


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleDoubleLeft, faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons'
import './../css/style.css'

export class Step2 extends Component {

    constructor(props){
        super(props)

        this.state = {
            productItems : [],
            dataOrder: {},
            number : '',
            boolSelectProductItem : false,
            activeSelectedProductItem : null,
            videoUrl : 'indomie_default.mp4'
        }
    }

    componentDidMount(){
        this.getDataProductItem(this.props.selectedProductHome)
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.state.dataOrder !== prevState.dataOrder){
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
            activeSelectedProductItem: x.id,
            videoUrl : x.videoUrl
        })

        if(x.action === "open"){
            target.style.width = "98%";
            target.style.border = "3px solid #dfdfdf";
            prdName.innerHTML = x.title
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
            let iconSpice = document.getElementById("sectionSpiceLevel").getElementsByTagName('img')

            for(var i=0;i<spiceLevel.length;i++){
                if(i<level){
                    spiceLevel[i].classList.add("selected-spice")
                    iconSpice[i].src = `${process.env.PUBLIC_URL}/images/icons/chili-colored.png`
                }else{
                    spiceLevel[i].classList.remove("selected-spice")
                    iconSpice[i].src = `${process.env.PUBLIC_URL}/images/icons/chili-empty.png`
                }
            }
            this.calc()
        })
    }

    changeHandlerTopping = (topping, price, action)=>{
        let dataOrder = this.state.dataOrder

        if(dataOrder['topping'] == null){
            dataOrder['topping'] = []
            dataOrder['toppingPrice'] = 0
        }
        
        if(action === "add"){
            dataOrder['topping'].push(topping)
            dataOrder['toppingPrice'] = Number(dataOrder['toppingPrice']) + Number(price)
        }else{
            if(dataOrder['topping'].length > 1){
                let index = dataOrder['topping'].indexOf(topping);
                if (index > -1) {
                    dataOrder['topping'].splice(index, 1);
                }
                dataOrder['toppingPrice'] = Number(dataOrder['toppingPrice']) - Number(price)
            }else{
                dataOrder['topping'] = null
                dataOrder['toppingPrice'] = 0
            }
        }

        this.setState({
            ...this.state,
            dataOrder,
            // boolSelectProductItem : false,
        }, () => {
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

        let spiceLevelPrice = (typeof(dataOrder['spiceLevelPrice']) !== "undefined" ? dataOrder['spiceLevelPrice'] : 0)
        let toppingPrice = (typeof(dataOrder['toppingPrice']) !== "undefined" ? dataOrder['toppingPrice'] : 0)
        let price = (typeof(dataOrder['price']) !== "undefined" ? dataOrder['price'] : 0)
        let qty = (typeof(dataOrder['qty']) !== "undefined" ? dataOrder['qty'] : 1)
        
        dataOrder['totalPrice'] = (Number(price) + Number(spiceLevelPrice) + Number(toppingPrice)) * Number(qty)

        this.setState({
            ...this.state,
            dataOrder,
        }, ()=>{
            console.log(dataOrder)
        })
    }

    payment = ()=>{
        var target = document.getElementById('menuStep4')
        
        target.style.width = "100%";
        target.style.border = "3px solid #dfdfdf";
    }

    cancelOrder = ()=>{
        window.location.reload()
    }

    closeStep3 = ()=>{
        var target1 = document.getElementById('menuStep3')
        target1.style.width = "0px";
        target1.style.border = "0px";

        var target2 = document.getElementById('menuStep4')
        
        target2.style.width = "0px";
        target2.style.border = "0px";
    }

    render() {
        let {product, spiceLevel, topping, selectedProductHome} = this.props
        let listDataProduct = product.map((v, key) =>
                                <Row className="m-2"key={key}>
                                    <ListProduct click={()=>this.getDataProductItem(v.id)} image={v.image} backgroundColor={v.color} title={v.product} bodytext={v.text} textColor={v.text_color} idCategory={v.id_category}></ListProduct>
                                </Row>
                    )
        
        let listDataProductItems = this.state.productItems.map((v, key) => 
            <ListProductItem activeSelectedProductItem={this.state.activeSelectedProductItem} click={(dataPrdItem)=>this.clickHandlerProduct(dataPrdItem)} key={key} grid={'col-md-6 col-lg-6 pt-2 pb-0 pr-2 pl-0'} image={v.image} title={v.name} bodytext={v.text} backgroundColor={v.color} textColor={v.text_color} sellingPrice={v.selling_price} idCategory={v.id_category} id={v.id} code={v.code} videoUrl={v.video}></ListProductItem>
        )

        return (
            <div>
                <BannerVideo videoUrl={this.state.videoUrl}></BannerVideo>
                <Row className="m-auto">
                    <Col md="6" lg="6" className="p-0" style={{height: '920px', overflowY: 'auto'}}>
                        <div id="menuStep3" className="m-2 row" style={{backgroundColor: "#eeeeee", color:"#000", border: "0px solid", height:"800pxz"}}>
                            <div style={{width:"100%", float:"left", padding:"0px 15px"}}>
                                <h3 id="productName" className="my-5 text-center">{}</h3>
                                <SectionTopping close={(action)=>this.closeStep3(action)} dataOrder={this.state.dataOrder} changeQty = {(data) => this.changeHandlerQty(data)} changeSpiceLevel = {(level, price) => this.changeHandlerSpiceLevel(level, price)}  click={(data) => this.clickHandlerSubmitOrder(data)} boolSelectProductItem={this.state.boolSelectProductItem} spiceLevel={spiceLevel} topping={topping} changeTopping = {(topping, price, action) => this.changeHandlerTopping(topping, price, action)} clickOrder={()=>this.payment()}/>
                                <Numpad clickOrder={()=>this.payment()} close={(action)=>this.closeStep3(action)} numberValue={this.state.number} click={(num)=>this.clickHandlerNumpad(num)}></Numpad>
                            </div>
                            {/* <div id="closeStep3" style={{width:"10%", float:"left", height:"100%", borderLeft: "3px solid #dfdfdf", position:"relative"}}
                            onClick={()=>this.clickHandlerProduct({action:"close"})}>
                            <FontAwesomeIcon 
                                icon={faAngleDoubleLeft} 
                                size="3x" 
                                style={{color: "#848484", cursor: "pointer", position: "absolute", left: "0px", top: "45%"}} />
                            </div> */}
                        </div>
                        <div className="row m-2">
                            <BackNavigation click={this.props.previousStep}></BackNavigation>
                        </div>
                        {listDataProduct}
                    </Col>
                    <Col md="6" lg="6" className="p-0" style={{height: '920px', overflowY: 'auto'}}>
                        <div id="menuStep4" className="m-2 row" style={{height:"800px"}}>
                            <Payment qrVal="" cancelOrder={()=>this.cancelOrder()}/>
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

export default Step2

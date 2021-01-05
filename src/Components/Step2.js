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
import Finish from '../Containers/Finish'


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
            activeSelectedProduct : null,
            videoUrl : 'indomie_default.mp4',
            qrVal : '', 
            cekPaymentInterval: false,
            finish: false
        }
    }

    componentDidMount(){
        this.getDataProductItem(this.props.selectedProductHome)
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.state.dataOrder !== prevState.dataOrder){
            console.log(this.state)
        }

        if(this.state.cekPaymentInterval !== prevState.cekPaymentInterval){
            if(this.state.cekPaymentInterval){
                console.log("interval on")
                this.cekPayment()
            }else{
                console.log("interval off")
                clearInterval(this.interval)
            }
        }
    }

    bypass = () =>{
        axios.get('http://localhost/api/vending_machine/bypass.php', {
            params: {
                trxNo: this.state.dataOrder.trxNo
            }
        })
        .then(res => {
            console.log("bypass. . .")
            
        })
        .catch(function (error) {

        });
    }

    cekPayment = ()=>{
        let dataOrder = this.state.dataOrder
        
        this.interval = setInterval(()=>{ 
                axios.get('http://localhost/api/vending_machine/cekpayment.php', {
                    params: {
                        dataOrder
                    }
                })
                .then(res => {
                    console.log("sad")
                    console.log(res.data)

                    if(res.data.pymstt === "PAID"){
                        console.log("SUDAH LUNAS")
                        console.log(this.state.dataOrder)
                        this.setState({
                            ...this.state,
                            cekPaymentInterval : false,
                            finish: true
                        }, ()=>{
                            console.log("FINISH ORDER. . . !!!!")
                            setTimeout(function() {
                                window.location.reload()
                              }, 3000);
                        })
                    }
                })
                .catch(function (error) {
                   
                });
                
            },
            
        5000)
    }

    // AXIOS GET DATA PRODUCT ITEMS USING HTTP REQUEST METHOD
    getDataProductItem(idProduct) {
        axios.get('http://localhost/api/vending_machine/productdetail.php', {
            params: {
              idproduct: idProduct
            }
        })
        .then(res => {
            this.setState({
                ...this.state,
                productItems :res.data,
                activeSelectedProduct : idProduct
            }, ()=>{
                // console.log(this.state.productItems)
            })
        })
        .catch(function (error) {

        });
        
    }

    getQrCode(){
        return axios.get('http://localhost/api/vending_machine/qris.php', {
            params:{
                amount: this.state.dataOrder.amount
            }
        }).then(response => {
            let dataOrder = this.state.dataOrder
            dataOrder['trxNo'] = response.data.data.transactionNo
            dataOrder['reffNo'] = response.data.data.referenceNo
            this.setState({
                ...this.state,
                dataOrder,
                cekPaymentInterval: true,
                qrVal: response.data.data.qrisData
            }, ()=>{
                console.log("qris")
                console.log(this.state)
            })
        })
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
        let videoUrl = 'indomie_default.mp4'

        if(x.videoUrl){
            videoUrl = x.videoUrl
        }

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
            videoUrl
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
        let topping = null
        let toppingPrice = 0
        let spiceLevel = 0
        let spiceLevelPrice = 0
        let amount = 0 
        let qty = 0

        if(dataOrder.qty === undefined){
            qty = 1
        }else{
            qty = dataOrder.qty
        }

        //topping
        if(dataOrder.topping === undefined){
            topping = null
        }else{
            topping = dataOrder.topping
        }

        if(dataOrder.toppingPrice === undefined){
            toppingPrice = 0
        }else{
            toppingPrice = dataOrder.toppingPrice
        }
        
        //spice
        if(dataOrder.spiceLevel === undefined){
            spiceLevel = 0
        }else{
            spiceLevel = dataOrder.spiceLevel
        }

        if(dataOrder.spiceLevelPrice === undefined){
            spiceLevelPrice = 0
        }else{
            spiceLevelPrice = dataOrder.spiceLevelPrice
        }

        amount = (Number(dataOrder.price) + Number(spiceLevelPrice) + Number(toppingPrice)) * Number(qty)

        dataOrder["amount"] = amount
        dataOrder["qty"] = qty
        dataOrder["spiceLevelPrice"] = spiceLevelPrice
        dataOrder["spiceLevel"] = spiceLevel
        dataOrder["topping"] = topping
        dataOrder["toppingPrice"] = toppingPrice
        this.setState({
            ...this.state,
            dataOrder
        }, ()=>{
            console.log("data order")
            console.log(this.state.dataOrder)
        })
    }

    payment = ()=>{
        this.calc()
        Promise.all([this.calc(), this.getQrCode()])
        .then(function (results) {
            
            var target = document.getElementById('menuStep4')
            
            target.style.width = "100%";
            target.style.border = "3px solid #dfdfdf";
        });
    }

    cancelOrder = ()=>{
        window.location.reload()
    }

    closeStep3 = ()=>{
        this.setState({
            ...this.state,
            dataOrder: {},
            boolSelectProductItem : true,
        }, ()=>{
            //close topping/numpad
            var target1 = document.getElementById('menuStep3')
            target1.style.width = "0px";
            target1.style.border = "0px";

            var target2 = document.getElementById('menuStep4')
            target2.style.width = "0px";
            target2.style.border = "0px";
        })
    }

    render() {
        let {product, spiceLevel, topping, selectedProductHome} = this.props
        let listDataProduct = product.map((v, key) =>
                                <Row className="m-2"key={key}>
                                    <ListProduct activeSelectedProduct = {this.state.activeSelectedProduct} click={()=>this.getDataProductItem(v.id)} image={v.image} backgroundColor={v.color} title={v.product} bodytext={v.text} textColor={v.text_color} idCategory={v.id_category} id={v.id}></ListProduct>
                                </Row>
                    )
        
        let listDataProductItems = this.state.productItems.map((v, key) => 
            <ListProductItem activeSelectedProductItem={this.state.activeSelectedProductItem} click={(dataPrdItem)=>this.clickHandlerProduct(dataPrdItem)} key={key} grid={'col-md-6 col-lg-6 pt-2 pb-0 pr-2 pl-0'} image={v.image} title={v.name} bodytext={v.text} backgroundColor={v.color} textColor={v.text_color} sellingPrice={v.selling_price} idCategory={v.id_category} id={v.id} code={v.code} videoUrl={v.video}></ListProductItem>
        )

        return (
            <div>
                <BannerVideo videoUrl={this.state.videoUrl}></BannerVideo>
                <Finish finish={this.state.finish} />
                <Row className="m-auto">
                    <Col md="6" lg="6" className="p-0" style={{height: '920px', overflowY: 'auto'}}>
                        <div id="menuStep3" className="m-2 row" style={{backgroundColor: "#eeeeee", color:"#000", border: "0px solid", height:"1130px", overflowY:"scroll"}}>
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
                    <Col md="6" lg="6" className="p-0" style={{height: '1130px', overflowY: 'auto'}}>
                        <div id="menuStep4" className="m-2 row" style={{height:"1130px"}}>
                            <Payment intv={this.state.cekPaymentInterval} qrVal={this.state.qrVal} cancelOrder={()=>this.cancelOrder()} bypass={()=>this.bypass()}/>
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

import React, {Component} from 'react'
import {Row} from "reactstrap";
import './../css/topping.css';
import './../css/style.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle, faCheck} from '@fortawesome/free-solid-svg-icons'

const SectionTopping = (props) => {
    const qtyPad = []
    let {dataOrder, boolSelectProductItem, changeQty, changeSpiceLevel, changeTopping, spiceLevel, topping} = props
    
    if(boolSelectProductItem){
        reset();
    }

    for(var i=1;i<=5;i++){
        let qty = i
    
        qtyPad.push(
            <div className="qty-pad" key={i}>
                <div className="num d-flex justify-content-center qty align-items-center" id={"qty_"+i} onClick={()=>changeQty(qty)}>
                    <div className="txt btn-number">
                        {i}
                    </div>
                </div>
            </div>
        )
    }

    let sectionSpiceLevel = spiceLevel.map((v, key) => 
        <div className="spicelevel" key={key} id={v.name} onClick={()=>changeSpiceLevel(v.level, v.price)}></div>                
    )

    const selectTopping = (x)=>{
        let el = document.getElementById(x.material)
        let toppingIcon = el.getElementsByTagName('img')[0]
        let checkIcon = el.getElementsByTagName('svg')[0]
        
        let price= x.price
        let action

        if(el.classList.contains("selected")){
            toppingIcon.style.opacity = "1"
            checkIcon.style.display = "none"
            el.classList.remove("selected")
            // price = 0
            action = "remove"
        }else{
            toppingIcon.style.opacity = "0.5"
            checkIcon.style.display = "block"
            el.classList.add("selected")
            // price = x.price
            action = "add"
        }

        changeTopping(x.idTopping, price, action)
    }

    const sectionTopping = topping.map((v, key) =>
        <div key={key} id={v.material} style={{float:"left", position:"relative"}} 
            onClick={()=>selectTopping({'material':v.material, "idTopping":v.id, "price":v.price})}>
            <img className="float-left mr-2" src={`${process.env.PUBLIC_URL}/images/icons/${v.icon}`}  alt={v.material} />
            <FontAwesomeIcon 
                icon={faCheck} 
                size="3x" 
                style={{color:"#81ed2f", cursor:"pointer", marginTop:"30px", 
                    marginLeft:"15px", right: "5px", bottom: "0px", 
                    position:"absolute", display:"none"}}  />
        </div>
    )

    const priceDetail = ()=>{
        let priceDetail = []

        priceDetail.push(
            <span style={{fontSize:"30px"}} key="price">
                <b>Mie : Rp {dataOrder.price}</b><br/>
            </span>
        )

        if("spiceLevelPrice" in dataOrder && dataOrder.spiceLevelPrice !== 0){
            priceDetail.push(
                <span style={{fontSize:"30px"}} key="spice price">
                    <b>Ext Pedas : Rp {dataOrder.spiceLevelPrice}</b><br/>
                </span>
            )
        }

        if("toppingPrice" in dataOrder && dataOrder.toppingPrice !== 0){
            priceDetail.push(
                <span style={{fontSize:"30px"}} key="topping price">
                    <b>Ext Topping : Rp {dataOrder.toppingPrice}</b><br/>
                </span>
            )
        }

        priceDetail.push(
            <span style={{fontSize:"30px"}} key="total price">
                <b>Total Harga : Rp {(dataOrder.price !== "")? dataOrder.price : "-"}</b><br/>
            </span>
            
        )

        return priceDetail
    }
    const extToppingPrice = ()=>{
        if("toppingPrice" in dataOrder && dataOrder.toppingPrice !== 0){
            return <b>Ext Topping : Rp {dataOrder.toppingPrice}</b>
        }
    }

    return(
        <div id="menuStep3_2" className="menuStep3" style={{display:"none"}}>
            <Row>
                <div className="col-md-12" id="section-spice">
                    <h3><b>Level Pedas</b></h3>
                    <div className="bar-wrapper">
                        {sectionSpiceLevel}
                    </div>
                    <FontAwesomeIcon 
                        icon={faTimesCircle} 
                        size="3x" 
                        style={{color:"#cc2525", cursor:"pointer", marginTop:"30px", marginLeft:"15px"}} 
                        onClick={()=>changeSpiceLevel(0, 0)} />
                </div>
                <div className="col-md-12 mt-3" id="section-qty">
                    <h3><b>Jumlah</b></h3>
                    {qtyPad}
                </div>
            </Row>
            <Row>
                <div className="col-md-12 mt-3" id="section-topping">
                    <h3><b>Topping</b></h3>
                    {sectionTopping}
                </div>
                <div className="col-md-12 mt-3" id="section-price" style={{borderTop:"3px solid #dfdfdf"}}>
                    
                    {priceDetail()}
                    {/* <span style={{fontSize:"30px"}}>{extSpicePrice()}</span><br/>
                    <span style={{fontSize:"30px"}}>{extToppingPrice()}</span><br/> */}
                    
                </div>
                <div className="col-md-12 mt-3 text-center">
                    <button className="btn btn-success" onClick={()=>props.clickOrder("mie")}>ORDER</button>
                </div>
            </Row>
        </div>
    )
}

const reset = () => {
    let spiceLevel = document.getElementsByClassName("spicelevel");
    let selectedLevel = document.getElementsByClassName("selected-spice");
    for(var i=0;i<spiceLevel.length;i++){
        if(i<selectedLevel){
            spiceLevel[i].classList.add("selected-spice")
        }else{
            spiceLevel[i].classList.remove("selected-spice")
        }
    }

    let qty = document.getElementsByClassName("qty")
    let selectedQty = document.getElementsByClassName("selected-qty")
    for(var i=0;i<qty.length;i++){
        if(i+1 === selectedQty){
            qty[i].classList.add("selected-qty")
        }else{
            qty[i].classList.remove("selected-qty")
        }
    }
}

export default SectionTopping
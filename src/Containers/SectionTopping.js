import React, {Component} from 'react'
import {Row} from "reactstrap";
import './../css/topping.css';
import './../css/style.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle, faCheck, faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons'

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
        <div className="spicelevel" key={key} id={v.name} onClick={()=>changeSpiceLevel(v.level, v.price)} style={{float:"left"}}>
            <img src={`${process.env.PUBLIC_URL}/images/icons/chili-empty.png`} alt={"chili-"+key} style={{width:"80px"}}/>
        </div>                
    )

    const selectTopping = (x)=>{
        let el = document.getElementById(x.material)
        let toppingIcon = el.getElementsByTagName('img')[0]
        let checkIcon = el.getElementsByTagName('svg')[0]
        
        let price= x.price
        let action

        if(el.classList.contains("selected")){
            toppingIcon.style.opacity = "0.5"
            checkIcon.style.display = "none"
            el.classList.remove("selected")
            // price = 0
            action = "remove"
        }else{
            toppingIcon.style.opacity = "1"
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
            <img className="float-left mr-2" src={`${process.env.PUBLIC_URL}/images/icons/${v.icon}`}  alt={v.material} style={{opacity: "0.5"}}/>
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
            <tr key="productPrice">
                <td>
                    Mie
                </td>
                <td>
                    Rp {dataOrder.price}
                </td>
            </tr>
        )

        if("spiceLevelPrice" in dataOrder && dataOrder.spiceLevelPrice !== 0 && dataOrder.spiceLevelPrice !== "0"){
            priceDetail.push(
                <tr key="spiceLevelPrice">
                    <td>
                        Ext Pedas
                    </td>
                    <td>
                        Rp {dataOrder.spiceLevelPrice}
                    </td>
                </tr>
            )
        }

        if("toppingPrice" in dataOrder && dataOrder.toppingPrice !== 0){
            priceDetail.push(
                <tr key="toppingPrice">
                    <td>
                        Ext Topping
                    </td>
                    <td>
                        Rp {dataOrder.toppingPrice}
                    </td>
                </tr>
            )
        }

        priceDetail.push(
            <tr key="totalPrice">
                <th>
                    Total
                </th>
                <th>
                    Rp {(dataOrder.amount === undefined )? dataOrder.price : dataOrder.amount}
                </th>
            </tr>
        )

        return priceDetail
    }

    return(
        <div id="menuStep3_2" className="menuStep3" style={{display:"none"}}>
            <Row>
                <div className="col-md-12" id="section-spice">
                    <h3><b>Level Pedas</b></h3>
                    <div className="" id="sectionSpiceLevel">
                        {sectionSpiceLevel}
                    </div>
                    <FontAwesomeIcon 
                        icon={faTimesCircle} 
                        size="3x" 
                        style={{color:"#cc2525", cursor:"pointer", marginTop:"15px", marginLeft:"25px"}} 
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
                    <table className="table table-borderless table-sm" style={{fontSize: "30px", fontFamily: "arial"}}>
                        <tbody>
                        {priceDetail()}
                        </tbody>
                    </table>
                </div>
            </Row>
            <Row>
                <div className="col-md-6 mt-3 text-center" >
                    <button className="btn btn-primary rounded-circle text-white" onClick={()=>props.close({action:"close"})} style={{width: "150px", height: "150px", fontSize: "35px", fontWeight: "600"}}>BACK</button>
                </div>
                <div className="col-md-6 mt-3 text-center">
                    <button className="btn btn-success rounded-circle" onClick={()=>props.clickOrder("mie")} style={{width: "150px", height: "150px", fontSize: "35px", fontWeight: "600"}}>ORDER</button>
                </div>    
            </Row>
        </div>
    )
}

const reset = () => {
    let spiceLevel = document.getElementsByClassName("spicelevel");
    
    for(var i=0;i<spiceLevel.length;i++){
        spiceLevel[i].querySelector("img").src = `${process.env.PUBLIC_URL}/images/icons/chili-empty.png`
        spiceLevel[i].classList.remove("selected-spice")
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

    let toppingItem = document.querySelectorAll("#section-topping > div");
    for(var i = 0; i < toppingItem.length; i++) {
        toppingItem[i].getElementsByTagName('img')[0].style.opacity = "0.5"
        toppingItem[i].getElementsByTagName('svg')[0].style.display = "none"
        toppingItem[i].classList.remove("selected")
    }
}

export default SectionTopping
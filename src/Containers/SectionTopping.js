import React, {Component} from 'react'
import {Row} from "reactstrap";
import './../css/topping.css';
import './../css/style.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle, faCheck, faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons'

const SectionTopping = (props) => {
    const qtyPad = []
    let {disableButton, dataOrder, boolSelectProductItem, changeQty, changeSpiceLevel, changeTopping, spiceLevel, topping} = props
    
    if(boolSelectProductItem){
        reset();
    }

    for(var i=1;i<=5;i++){
        let qty = i
    
        qtyPad.push(
            <div className="qty-pad" key={i}>
                <div className={Number(qty) == 1 ? `num d-flex justify-content-center qty align-items-center selected-qty`:`num d-flex justify-content-center qty align-items-center `} id={"qty_"+i} onClick={()=>changeQty(qty)}>
                    <div className="txt btn-number">
                        {i}
                    </div>
                </div>
            </div>
        )
    }

    let sectionSpiceLevel = spiceLevel.map((v, key) => 
        <div className="spicelevel" key={key} id={v.name} onClick={()=>changeSpiceLevel(v.level, v.price)} style={{float:"left"}}>
            <img src={`${process.env.PUBLIC_URL}/images/icons/chili-empty.png`} alt={"chili-"+key} style={{width:"60px"}}/>
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
            action = "remove"
        }else{
            toppingIcon.style.opacity = "1"
            checkIcon.style.display = "block"
            el.classList.add("selected")
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
                <td className="text-right">
                    Rp {Number(dataOrder.price).toLocaleString('id-ID', {maximumFractionDigits:0})}
                </td>
            </tr>
        )

        if("spiceLevelPrice" in dataOrder && dataOrder.spiceLevelPrice !== 0 && dataOrder.spiceLevelPrice !== "0"){
            priceDetail.push(
                <tr key="spiceLevelPrice">
                    <td>
                        Ext Pedas
                    </td>
                    <td className="text-right">
                        Rp {Number(dataOrder.spiceLevelPrice).toLocaleString('id-ID', {maximumFractionDigits:0})}
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
                    <td className="text-right">
                        Rp {Number(dataOrder.toppingPrice).toLocaleString('id-ID', {maximumFractionDigits:0})}
                    </td>
                </tr>
            )
        }

        priceDetail.push(
            <tr key="totalPrice">
                <th>
                    Total
                </th>
                <th className="text-right">
                    Rp {(dataOrder.amount === undefined )? Number(dataOrder.price).toLocaleString('id-ID', {maximumFractionDigits:0}) : Number(dataOrder.amount).toLocaleString('id-ID', {maximumFractionDigits:0})}
                </th>
            </tr>
        )

        return priceDetail
    }

    return(
        <div id="menuStep3_2" className="menuStep3" style={{display:"none", fontFamily:"lato"}}>
            <Row>
                <div className="col-md-12 mt-3 text-center" id="section-qty">
                    <h3><b>Mau berapa mangkok?</b></h3>
                    <div className="d-flex justify-content-center align-items-center">
                        {qtyPad}
                    </div>
                </div>
                <div className="col-md-12 text-center mt-5" id="section-spice">
                    <h3><b>Pilih level pedas yang kamu mau</b></h3>
                    <div className="d-flex justify-content-center align-items-center">
                        <img id="noChili" src={`${process.env.PUBLIC_URL}/images/icons/no-chili.png`}
                            style={{color:"#cc2525", cursor:"pointer", width:"60px", marginRight:"25px", float:"left"}} 
                            onClick={()=>changeSpiceLevel(0, 0)} alt="no-chili" 
                        />
                        <div className="" id="sectionSpiceLevel">
                            {sectionSpiceLevel}
                        </div>
                    </div>
                </div>
            </Row>
            <Row className="mt-5">
                <div className="col-md-12 text-center">
                    <h3><b>Mau tambahan topping?</b></h3>
                    <div className="d-flex justify-content-center align-items-center" id="section-topping">
                        {sectionTopping}
                    </div>
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
                    <button className="btn btn-primary rounded-circle text-white" onClick={()=>props.close({action:"close"})} style={{width: "150px", height: "150px", fontSize: "35px", fontWeight: "600"}} disabled={disableButton}>BACK</button>
                </div>
                <div className="col-md-6 mt-3 text-center">
                    <button className="btn btn-success rounded-circle" onClick={()=>props.clickOrder("mie")} style={{width: "150px", height: "150px", fontSize: "35px", fontWeight: "600"}} disabled={disableButton}>ORDER</button>
                </div>    
            </Row>
        </div>
    )
}

const reset = () => {
    let spiceLevel = document.getElementsByClassName("spicelevel");
    // document.getElementById("noChili").style.opacity = "1"
    // document.getElementById("sectionSpiceLevel").style.opacity = "0.3"
    
    for(var i=0;i<spiceLevel.length;i++){
        spiceLevel[i].querySelector("img").src = `${process.env.PUBLIC_URL}/images/icons/chili-empty.png`
        spiceLevel[i].classList.remove("selected-spice")
    }

    let qty = document.getElementsByClassName("qty")
    for(var i=0;i<qty.length;i++){
        if(i === 0){
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
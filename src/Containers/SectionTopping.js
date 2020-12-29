import React, {Component} from 'react'
import {Row} from "reactstrap";
import './../css/topping.css';
import './../css/style.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'

const SectionTopping = (props) => {
    const qtyPad = []
    let {dataOrder, boolSelectProductItem, changeQty, changeSpiceLevel, spiceLevel, topping} = props
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
                    <img className="float-left mr-2" src={`${process.env.PUBLIC_URL}/images/icons/cheese-icon.png`}  alt="Cheese" />
                    <img className="float-left mr-2" src={`${process.env.PUBLIC_URL}/images/icons/corned-beef-icon.png`}  alt="Cornet" />
                </div>
                <div className="col-md-12 mt-3 text-center" id="section-price" style={{borderTop:"3px solid"}}>
                    <span style={{fontSize:"35px"}}><b>Total Harga : Rp {dataOrder.price}</b></span>
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
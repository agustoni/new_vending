import React, {Component} from 'react'
import {Row} from "reactstrap";
import './../css/topping.css';
import './../css/style.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle, faCheck} from '@fortawesome/free-solid-svg-icons'

const qtyPad = []
for(var i=1;i<=5;i++){
    let qty = i

    qtyPad.push(
        <div className="qty-pad" key={i}>
            <div className="num d-flex justify-content-center qty align-items-center" id={"qty_"+i} onClick={()=>selectQty(qty)}>
                <div className="txt btn-number">
                    {i}
                </div>
            </div>
        </div>
    )
}

const SectionTopping = (props) => {
    return(
        <div id="menuStep3_2" className="menuStep3" style={{width:"446px", display:"none"}}>
            <Row>
                <div className="col-md-12" id="section-spice">
                    <h3><b>Level Pedas</b></h3>
                    <div className="bar-wrapper">
                        <div className="spicelevel" id="level_1" onClick={()=>selectSpice(1)}></div>
                        <div className="spicelevel" id="level_2" onClick={()=>selectSpice(2)}></div>
                        <div className="spicelevel" id="level_3" onClick={()=>selectSpice(3)}></div>
                        <div className="spicelevel" id="level_4" onClick={()=>selectSpice(4)}></div>
                        <div className="spicelevel" id="level_5" onClick={()=>selectSpice(5)}></div>
                    </div>
                    <FontAwesomeIcon 
                        icon={faTimesCircle} 
                        size="3x" 
                        style={{color:"#cc2525", cursor:"pointer", marginTop:"30px", marginLeft:"15px"}} 
                        onClick={()=>selectSpice(0)} />
                </div>
                <div className="col-md-12 mt-3" id="section-qty">
                    <h3><b>Jumlah</b></h3>
                    {qtyPad}
                </div>
            </Row>
            <Row>
                <div className="col-md-12 mt-3" id="section-topping">
                    <h3><b>Topping</b></h3>
                    <div id="keju" style={{float:"left", position:"relative"}} onClick={()=>selectTopping("keju")}>
                        <img className="float-left mr-2" src={`${process.env.PUBLIC_URL}/images/icons/cheese-icon.png`}  alt="Cheese" />
                        <FontAwesomeIcon 
                            icon={faCheck} 
                            size="3x" 
                            style={{color:"#81ed2f", cursor:"pointer", marginTop:"30px", 
                                marginLeft:"15px", right: "5px", bottom: "0px", 
                                position:"absolute", display:"none"}} 
                            onClick={()=>selectSpice(0)} />
                    </div>
                    <div id="kornet" style={{float:"left", position:"relative"}} onClick={()=>selectTopping("kornet")}>
                        <img className="float-left mr-2" src={`${process.env.PUBLIC_URL}/images/icons/corned-beef-icon.png`}  alt="Cornet" />
                        <FontAwesomeIcon 
                            icon={faCheck} 
                            size="3x" 
                            style={{color:"#81ed2f", cursor:"pointer", marginTop:"30px", 
                                marginLeft:"15px", right: "5px", bottom: "0px", 
                                position:"absolute", display:"none"}} 
                            onClick={()=>selectSpice(0)} />
                    </div>
                </div>
                <div className="col-md-12 mt-3 text-center" id="section-price" style={{borderTop:"3px solid"}}>
                    <span style={{fontSize:"50px"}}><b>Rp 18.000</b></span>
                </div>
                <div className="col-md-12 mt-3 text-center">
                    <button className="btn btn-success" onClick={()=>props.clickOrder("mie")}>ORDER</button>
                </div>
            </Row>
        </div>
    )
}

const selectSpice = (level) => {
    let spiceLevel = document.getElementsByClassName("spicelevel");

    for(var i=0;i<spiceLevel.length;i++){
        if(i<level){
            spiceLevel[i].classList.add("selected-spice")
        }else{
            spiceLevel[i].classList.remove("selected-spice")
        }
    }
}

const selectQty = (qty)=>{
    let selection = document.getElementsByClassName("qty")

    for(var i=0;i<selection.length;i++){
        if(i+1 === qty){
            selection[i].classList.add("selected-qty")
        }else{
            selection[i].classList.remove("selected-qty")
        }
    }
}

const selectTopping = (x)=>{
    let el = document.getElementById(x)
    let toppingIcon = el.getElementsByTagName('img')[0]
    let checkIcon = el.getElementsByTagName('svg')[0]
    
    if(el.classList.contains("selected")){
        toppingIcon.style.opacity = "1"
        checkIcon.style.display = "none"
        el.classList.remove("selected")
    }else{
        toppingIcon.style.opacity = "0.5"
        checkIcon.style.display = "block"
        el.classList.add("selected")
    }
    
}

export default SectionTopping
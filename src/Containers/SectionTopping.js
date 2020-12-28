import React, { Component } from 'react'
import { Container, Row } from "reactstrap";
import './../css/topping.css';
import './../css/style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export class SectionTopping extends Component {
    selectSpice = (level)=>{
        let spiceLevel = document.getElementsByClassName("spicelevel");

        for(var i=0;i<spiceLevel.length;i++){
            if(i<level){
                spiceLevel[i].classList.add("selected-spice")
            }else{
                spiceLevel[i].classList.remove("selected-spice")
            }
        }
    }

    selectQty = (qty)=>{
        let selection = document.getElementsByClassName("qty")

        for(var i=0;i<selection.length;i++){
            if(i+1 === qty){
                selection[i].classList.add("selected-qty")
            }else{
                selection[i].classList.remove("selected-qty")
            }
        }
    }

    render() {
        const qtyPad = []
        for(var i=1;i<=5;i++){
            let qty = i

            qtyPad.push(
                <div className="qty-pad" key={i}>
                    <div className="num d-flex justify-content-center qty align-items-center" id={"qty_"+i} onClick={()=>this.selectQty(qty)}>
                        <div className="txt btn-number">
                            {i}
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div >
                <Row>
                    <div className="col-md-12" id="section-spice" style={{width:"631px"}}>
                        <h3><b>Level Pedas</b></h3>
                        <div className="bar-wrapper">
                            <div className="spicelevel" id="level_1" onClick={()=>this.selectSpice(1)}></div>
                            <div className="spicelevel" id="level_2" onClick={()=>this.selectSpice(2)}></div>
                            <div className="spicelevel" id="level_3" onClick={()=>this.selectSpice(3)}></div>
                            <div className="spicelevel" id="level_4" onClick={()=>this.selectSpice(4)}></div>
                            <div className="spicelevel" id="level_5" onClick={()=>this.selectSpice(5)}></div>
                        </div>
                        <FontAwesomeIcon 
                            icon={faTimesCircle} 
                            size="3x" 
                            style={{color:"#cc2525", cursor:"pointer", marginTop:"30px", marginLeft:"15px"}} 
                            onClick={()=>this.selectSpice(0)} />
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
                    <div className="col-md-12 mt-3 text-center" id="section-price">
                        <span style={{fontSize:"50px"}}><b>Rp 18.000</b></span>
                    </div>
                </Row>
            </div>
        )
    }
}

export default SectionTopping
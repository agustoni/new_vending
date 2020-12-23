import React, { Component } from 'react'
import { Container, Row } from "reactstrap";
import './../css/topping.css';
import './../css/style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import Numpad from './Numpad'
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
        // let qtySelected = document.getElementById("qty_"+qty)
        let selection = document.getElementsByClassName("qty")
// console.log("Qty "+qty)
        for(var i=0;i<selection.length;i++){
            // console.log(qty+" <===> "+i)
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
            <Container >
                {/* <Numpad/> */}
                <Row>
                    <div className="col-md-6">
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
                            style={{color:"#fb5151", cursor:"pointer", marginTop:"15px", marginLeft:"15px"}} 
                            onClick={()=>this.selectSpice(0)} />
                    </div>
                    <div className="col-md-6">
                        <h3><b>Jumlah</b></h3>
                        {qtyPad}
                    </div>
                </Row>
                <Row>
                    <div className="col-md-6">
                        <h3><b>Topping</b></h3>
                    </div>
                    <div className="col-md-6">
                        Rp...
                    </div>
                </Row>
            </Container>
        )
    }
}

export default SectionTopping
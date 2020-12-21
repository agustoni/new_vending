import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace, faCheck } from '@fortawesome/free-solid-svg-icons'

import './../css/numpadstyle.css';

let btnChar = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "delete", "0", "ok"]
export class Numpad extends Component {
    constructor(props){
        super(props)
        this.state = {
            'numpadValue': "",
        }
    }

    clickHandler = (num)=>{
        let inputVal = this.state.numpadValue

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
            'numpadValue': inputVal
        })
    }

    createBtn = ()=>{
        let btnEl = btnChar.map((num, key)  => {
            if(num === "delete"){
                return (
                    <div className="span4" key={key}>
                        <div className="num  d-flex justify-content-center align-items-center" onClick={()=>this.clickHandler(num)}>
                            <FontAwesomeIcon icon={faBackspace} size="3x" />
                        </div>
                    </div>
                )
            }else if(num === "ok"){
                return (
                    <div className="span4" key={key}>
                        <div className="num  d-flex justify-content-center align-items-center" onClick={()=>this.clickHandler(num)}>
                            <FontAwesomeIcon icon={faCheck} size="3x" />
                        </div>
                    </div>
                )
            }else{
                return (
                    <div className="span4" key={key}>
                        <div className="num d-flex justify-content-center align-items-center" onClick={()=>this.clickHandler(num)}>
                            <div className="txt btn-number">
                                {num}
                            </div>
                        </div>
                    </div>   
                )
            }
        })

        return btnEl
    }

    changeHandler = ()=>{

    }

    render() {
        let getBtn = this.createBtn()
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4 phone">
                        <div className="row1">
                            <div className="col-md-12">
                                <input type="text" name="name" id="telNumber" className="form-control tel" value={this.state.numpadValue} onChange={()=>this.changeHandler()} />
                                <div className="num-pad">
                                {getBtn}
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Numpad

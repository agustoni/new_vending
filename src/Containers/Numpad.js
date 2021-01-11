import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleDown, faBackspace, faCheck } from '@fortawesome/free-solid-svg-icons'
import InputMask from 'react-input-mask';
import './../css/numpadstyle.css';

const Numpad = (props) => {
    let {numberValue, dataOrder} = props
    let getBtn = createBtn(props)

    return (
        <div className="container menuStep3" id="menuStep3_1" style={{display: "none"}}>
            <div className="row">
                <div className="col-12 text-center">
                    <h2><b>Masukan nomor anda</b></h2><FontAwesomeIcon icon={faArrowCircleDown} size="2x" className="text-primary" />
                </div>
            </div>
            <div className="row">
                <div className="col-md-11" style={{marginLeft:"auto", marginRight:"auto"}}>
                    <div className="col-md-12">
                        <InputMask value={numberValue} name="name" id="telNumber" className="form-control tel" mask="+6\2 9999999999999" maskChar=" " />
                        {/* <input type="text" name="name" id="telNumber" className="form-control tel" value={numberValue} readOnly/> */}
                        <div className="row justify-content-center align-items-center p-2">
                        {getBtn}
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 mt-3" id="section-price" style={{borderTop:"3px solid #dfdfdf"}}>
                    <table className="table table-borderless table-sm" style={{fontSize: "30px", fontFamily: "arial"}}>
                        <tbody>
                            <tr>
                                <th>Total :</th>
                                <th className="text-right">Rp {Number(dataOrder.price).toLocaleString('id-ID', {maximumFractionDigits:0})}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 mt-3 text-center" >
                    <button className="btn btn-primary col-md-12" onClick={()=>props.close({action:"close"})} style={{fontSize: "35px", fontWeight: "600"}} disabled={props.disableButton}>BACK</button>
                </div>
            </div>
        </div>
    )
}

const createBtn = (x)=>{
    const btnChar = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "delete", "0", "ok"]

    const btnEl = btnChar.map((num, key)  => {
        if(num === "delete"){
            return (
                <div className="col-4 mx-auto my-2" key={key}>
                    <div className="num d-flex justify-content-center align-items-center rounded-circle" onClick={()=>x.click(num)}>
                        <FontAwesomeIcon icon={faBackspace} size="3x" />
                    </div>
                </div>
            )
        }else if(num === "ok"){
            return (
                <div className="col-4 mx-auto my-2 doneppob" key={key} onClick={()=>x.clickOrder('ppob')} disabled={x.disableButton}>
                    <div className="num d-flex justify-content-center align-items-center rounded-circle bg-success text-white" onClick={()=>x.click(num)}>
                        <FontAwesomeIcon icon={faCheck} size="3x" />
                    </div>
                </div>
            )
        }else{
            return (
                <div className="col-4 mx-auto my-2" key={key}>
                    <div className="num d-flex justify-content-center align-items-center rounded-circle" onClick={()=>x.click(num)}>
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

export default Numpad

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace, faCheck } from '@fortawesome/free-solid-svg-icons'

import './../css/numpadstyle.css';

const Numpad = (props) => {
    let {numberValue} = props
    let getBtn = createBtn(props)

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="row1">
                        <div className="col-md-12">
                            <input type="text" name="name" id="telNumber" className="form-control tel" value={numberValue} readOnly/>
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

const createBtn = (x)=>{
    const btnChar = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "delete", "0", "ok"]

    const btnEl = btnChar.map((num, key)  => {
        if(num === "delete"){
            return (
                <div className="span4" key={key}>
                    <div className="num  d-flex justify-content-center align-items-center" onClick={()=>x.click(num)}>
                        <FontAwesomeIcon icon={faBackspace} size="3x" />
                    </div>
                </div>
            )
        }else if(num === "ok"){
            return (
                <div className="span4" key={key}>
                    <div className="num  d-flex justify-content-center align-items-center" onClick={()=>x.click(num)}>
                        <FontAwesomeIcon icon={faCheck} size="3x" />
                    </div>
                </div>
            )
        }else{
            return (
                <div className="span4" key={key}>
                    <div className="num d-flex justify-content-center align-items-center" onClick={()=>x.click(num)}>
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


// export class Numpad extends Component {
//     createBtn = ()=>{
//         let btnEl = btnChar.map((num, key)  => {
//             if(num === "delete"){
//                 return (
//                     <div className="span4" key={key}>
//                         <div className="num  d-flex justify-content-center align-items-center" onClick={()=>this.props.click(num)}>
//                             <FontAwesomeIcon icon={faBackspace} size="3x" />
//                         </div>
//                     </div>
//                 )
//             }else if(num === "ok"){
//                 return (
//                     <div className="span4" key={key}>
//                         <div className="num  d-flex justify-content-center align-items-center" onClick={()=>this.props.click(num)}>
//                             <FontAwesomeIcon icon={faCheck} size="3x" />
//                         </div>
//                     </div>
//                 )
//             }else{
//                 return (
//                     <div className="span4" key={key}>
//                         <div className="num d-flex justify-content-center align-items-center" onClick={()=>this.props.click(num)}>
//                             <div className="txt btn-number">
//                                 {num}
//                             </div>
//                         </div>
//                     </div>   
//                 )
//             }
//         })

//         return btnEl
//     }

//     render() {
//         let getBtn = this.createBtn()
        
//         return (
//             <div className="container">
//                 <div className="row">
//                     <div className="col-md-4 col-md-offset-4 phone">
//                         <div className="row1">
//                             <div className="col-md-12">
//                                 <input type="text" name="name" id="telNumber" className="form-control tel" value={this.props.numberValue} readOnly/>
//                                 <div className="num-pad">
//                                 {getBtn}
//                                 </div>
//                                 <div className="clearfix"></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

export default Numpad

import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronCircleUp, faChevronCircleDown} from '@fortawesome/free-solid-svg-icons'

const Scroll = (props)=>{
    let {click} = props
    return(
        <div style={{display: "inline", position: "sticky", left: "100%", bottom: "4%"}}>
            <button className="btn btn-scroll-up" onClick={()=>click("up")} style={{color:"#1062b5", opacity:"0.4"}}>
                <FontAwesomeIcon icon={faChevronCircleUp} size="3x" />
            </button>
            <br/>
            <button className="btn btn-scroll-down" onClick={()=>click("down")} style={{color:"#1062b5"}}>
                <FontAwesomeIcon icon={faChevronCircleDown} size="3x" />
            </button>
        </div>
    )
}

export default Scroll

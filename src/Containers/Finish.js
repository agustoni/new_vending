import React, { Component } from 'react'

const finish = (props)=>{
    let {finish} = props

    let zIndex = 0
    let opacity = 0

    if(finish){
        zIndex = 3
        opacity = 1
    }

    return(
        <div id="overlay" className="position-absolute" 
            style={{zIndex: zIndex, background: "#fff", width: "100%", height: "100%", opacity: opacity, transition: "visibility 0s, opacity 0.5s linear"}}
        >
            <span className="d-flex justify-content-center" 
            style={{marginTop: "30%", fontSize: "50px", fontWeight: "600"}}> 
                TERIMA KASIH
            </span>
        </div>
    )
    
}

export default finish

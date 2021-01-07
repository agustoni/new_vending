import React, { Component } from 'react'

const masking = (props)=>{
    let {mask} = props

    let zIndex = 0
    let opacity = 0
    let background = "#fff"
    let content

    if(mask === 2){
        zIndex = 3
        opacity = 1
        content = (
            <span className="d-flex justify-content-center" 
                style={{marginTop: "30%", fontSize: "50px", fontWeight: "600"}}> 
                    TERIMA KASIH
            </span>
        )
    }else if(mask === 1){
        zIndex = 3
        opacity = 0.7
        background = "#b6b6b6"
        content = (
            <div className="d-flex justify-content-center" 
                style={{marginTop: "30%"}}
            > 
                <img src={`${process.env.PUBLIC_URL}/images/loading1.gif`} alt="loading"/>
            </div>
        )
    }

    return(
        <div id="overlay" className="position-absolute" 
            style={{zIndex: zIndex, background: background, opacity: opacity, 
                transition: "visibility 0s, opacity 0.5s linear", 
                width: "100%", height: "100%"}}
        >
            {content}
        </div>
    )
    
}

export default masking

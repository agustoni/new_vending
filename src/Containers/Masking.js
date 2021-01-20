import React from 'react'
import './../css/loading.css'

const masking = (props)=>{
    let {mask} = props

    let zIndex = 0
    let opacity = 0
    let background = "#fff"
    let content

    if(mask === 1){
        zIndex = 3
        opacity = 1
        content = (
            <div className="loader" style={{marginTop: "30%", fontSize: "50px", fontWeight: "600"}}>
                <span id="process_3">
                    Terima Kasih
                </span>

                <img className="ml-5" src={`${process.env.PUBLIC_URL}/images/loading2.gif`} style={{width:"75px"}} alt="loading 2"/>
            </div>
        )
        
    }else if(mask === 2){
        zIndex = 3
        opacity = 1
        content = (
            <div className="loader" style={{marginTop: "30%", fontSize: "50px", fontWeight: "600"}}>
                <span id="process_1"> 
                    Mohon menunggu. . .
                </span>
                <span id="process_2" className="d-none">
                    Sebutkan nama anda. . . 
                </span>
                <span id="process_3" className="d-none">
                    Terima Kasih
                </span>

                <img className="ml-5" src={`${process.env.PUBLIC_URL}/images/loading2.gif`} style={{width:"75px"}} alt="loading 2"/>
            </div>
        )
    }else if(mask === 3){
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

import React from 'react'

const BannerVideo = (props) => {
    // let {grid, image, title, bodytext} = props;
    let {videoUrl} = props;

    return (
        <div style={{width:"100%", height:"40rem"}}>
            <video style={{width: "100%", height: "100%", objectFit: "fill", objectPosition: "0 50%"}} src={`${process.env.PUBLIC_URL}/video/${videoUrl}`} loop autoPlay muted></video>
        </div>
    )
}

export default BannerVideo


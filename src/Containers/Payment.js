import React, { Component } from 'react'
import {Row} from "reactstrap";

// var React = require('react');
var QRCode = require('qrcode.react');

// let qrVal = this.props.propInQuestion ? this.props.qrVal : ""
// "00020101021226670016COM.NOBUBANK.WWW01189360050300000485550214091800000311670303UKE51440014ID.CO.QRIS.WWW0215ID20200814000230303UKE5204549953033605405100005502015802ID5915MYNTS SOLUSINDO6015Bali - Kab. Ban61051295062630114122900000019300515AA00120110679890615AA00120110679890703A016304F6FB"

const Payment = (props)=>{
    return(
        <div>
            <QRCode size={300} level="H" value={props.qrVal} />
            <Row>
                <div className="col-md-12 text-center">
                    <button className="btn btn-danger" onClick={()=>props.cancel()}>Cancel</button>
                </div>
            </Row>
        </div>
    )
}


export default Payment


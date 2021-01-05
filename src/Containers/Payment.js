import React, { Component } from 'react'
import {Row} from "reactstrap";

// var React = require('react');
var QRCode = require('qrcode.react');

// let qrVal = this.props.propInQuestion ? this.props.qrVal : ""
// "00020101021226670016COM.NOBUBANK.WWW01189360050300000485550214091800000311670303UKE51440014ID.CO.QRIS.WWW0215ID20200814000230303UKE5204549953033605405100005502015802ID5915MYNTS SOLUSINDO6015Bali - Kab. Ban61051295062630114122900000019300515AA00120110679890615AA00120110679890703A016304F6FB"

const Payment = (props)=>{

    return(
        <div>
            <h3 className="text-dark text-center">SCAN DISINI</h3>
            <QRCode size={300} level="Q" value={props.qrVal} />
            <Row>
                <div className="col-md-12 text-center mt-5">
                    <button className="btn btn-danger col-md-12" onClick={()=>props.cancelOrder()}>Cancel</button>
                </div>
            </Row>
        </div>
    )
}


export default Payment


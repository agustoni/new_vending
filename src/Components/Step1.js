import React, { Component } from 'react'
import ListProductHome from '../Containers/ListProductHome'

export class Step1 extends Component {

    constructor(props){
        super(props)
        this.state = {

        }
    }

    clickCard(data){
        var promise = new Promise( (resolve, reject) => {   
            if (data) {
                this.props.clickHandlerProductHome(data)
                resolve('success');
            }
            else {
               reject(Error("Promise rejected"));
            }
        });

        promise.then( result => {
            this.props.nextStep()
        }, function(error) {
            console.log('a')
        });
    }

    render() {
        const {product} = this.props
        let listDataProductHome = product.map((v, key) => 
            <ListProductHome click={(data)=>this.clickCard(data)} key={key} grid={'col-md-6 col-lg-6 p-2 d-flex align-items-stretch'} image={v.image} title={v.title} bodytext={v.name} backgroundColor={v.color} textColor={v.text_color} idCategory={v.id_category} id={v.id}></ListProductHome>
        )
        return (
            <div className="row p-5 m-auto">
                {listDataProductHome}
            </div>
        )
    }
}

export default Step1

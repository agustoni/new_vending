import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';

const ListProduct = (props) => {
    let {image, backgroundColor, title, bodytext, click, textColor} = props
    return (
        <ListGroup className="w-100 rounded-0" onClick={click}>
            <ListGroupItem style={{ backgroundColor : backgroundColor, borderColor: backgroundColor, cursor: 'pointer'}} >
                <img className="float-left mr-2" src={`${process.env.PUBLIC_URL}/images/product/${image}`}  alt="Card image cap" />
                <div className="ml-2">
                    <h3 style={{color:textColor}}>{title}</h3>
                    <p style={{color:textColor}}>{bodytext}</p>
                </div>
            </ListGroupItem>
        </ListGroup>
    )
}

export default ListProduct

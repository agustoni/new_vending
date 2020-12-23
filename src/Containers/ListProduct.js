import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';

const ListProduct = (props) => {
    let {image, backgroundColor, title, bodytext, click} = props
    return (
        <ListGroup className="w-100 rounded-0" onClick={click}>
            <ListGroupItem style={{ backgroundColor : backgroundColor, borderColor: backgroundColor, cursor: 'pointer'}} >
                <img className="float-left mr-2" src={`${process.env.PUBLIC_URL}/images/product/${image}`}  alt="Card image cap" />
                <div className="ml-2">
                    <h3>{title}</h3>
                    <p>{bodytext}</p>
                </div>
            </ListGroupItem>
        </ListGroup>
    )
}

export default ListProduct

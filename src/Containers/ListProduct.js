import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';

const ListProduct = (props) => {
    let {id, image, backgroundColor, title, bodytext, click, textColor, idCategory, activeSelectedProduct} = props
    let selectedBackground = ''
    if(id === activeSelectedProduct){
        selectedBackground = "rgb(0 255 185 / 30%)"
    }else{
        // 
        selectedBackground = ""
    }
    return (
        <ListGroup className="w-100 rounded-0" onClick={click} data-category={idCategory}>
            <ListGroupItem style={{ backgroundColor : selectedBackground, borderColor: "dec5ff", borderWidth: "5px", cursor: 'pointer'}} >
                <img className="img-fluid mx-auto d-block w-100" src={`${process.env.PUBLIC_URL}/images/product/${image}`}  alt={`product ${id}`} />
                {/* <div className="ml-2">
                    <h3 style={{color:textColor}}>{title}</h3>
                    <p style={{color:textColor}}>{bodytext}</p>
                </div> */}
            </ListGroupItem>
        </ListGroup>
    )
}

export default ListProduct

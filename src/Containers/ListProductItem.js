import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const ListProductItem = (props) => {
    let {grid, image, title, bodytext, backgroundColor, textColor, sellingPrice, idCategory, id, code} = props;
    let dataPrdItem = {
        action: "open",
        id, idCategory, sellingPrice, bodytext, code
    }
    return (
        // props.click("open", id, idCategory, sellingPrice
        <div className={grid} onClick={()=>props.click(dataPrdItem)}>
            <Card body inverse style={{ backgroundColor: backgroundColor, borderColor: "dec5ff", borderWidth: "5px", cursor:'pointer' }} className="rounded-0 text-dark text-center">
                <CardImg top width="100%" src={`${process.env.PUBLIC_URL}/images/product/${image}`}  alt="Card image cap" />
                <CardTitle tag="h5" style={{color:textColor}}>{title}</CardTitle>
                <CardText style={{color:textColor}}>{bodytext}</CardText>
                <CardText style={{color:textColor}}>{`Rp. `+sellingPrice}</CardText>
            </Card>
        </div>
    )
}

export default ListProductItem

import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const ListProductItem = (props) => {
    let {grid, image, title, bodytext, backgroundColor, textColor, sellingPrice, idCategory, id, code, activeSelectedProductItem} = props;
    let dataPrdItem = {
        action: "open",
        id, idCategory, sellingPrice, bodytext, code
    }
    let selectedBackground = ''
    if(id === activeSelectedProductItem){
        selectedBackground = "rgb(0 255 185 / 30%)"
    }else{
        // 
        selectedBackground = ""
    }
    return (
        // props.click("open", id, idCategory, sellingPrice
        <div className={grid} onClick={()=>props.click(dataPrdItem)}>
            <Card body inverse style={{ backgroundColor: selectedBackground, borderColor: "dec5ff", borderWidth: "5px", cursor:'pointer' }} className="prd rounded-0 text-dark text-center" id={`prdDetail_${id}`}>
                <CardImg top width="100%" src={`${process.env.PUBLIC_URL}/images/product/${image}`}  alt="Card image cap" />
                <CardTitle tag="h5" style={{color:textColor}}>{title}</CardTitle>
                <CardText style={{color:textColor}}>{bodytext}</CardText>
                <CardText style={{color:textColor}}>{`Rp. `+sellingPrice}</CardText>
            </Card>
        </div>
    )
}

export default ListProductItem

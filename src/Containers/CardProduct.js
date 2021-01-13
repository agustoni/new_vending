import React from 'react'
import {
    Card, CardImg, CardText, CardTitle, Button
} from 'reactstrap';

const CardProduct = (props) => {
    let {grid, image, title, bodytext, backgroundColor} = props;
    return (
        <div className={grid}>
            <Button className="p-0 border-0">
                <Card body inverse style={{ backgroundColor: backgroundColor, borderColor: backgroundColor }}>
                    <CardImg top width="100%" src={`${process.env.PUBLIC_URL}/images/product/${image}`}  alt="Card image cap" />
                    <CardTitle tag="h5">{title}</CardTitle>
                    <CardText>{bodytext}</CardText>
                </Card>
            </Button>
        </div>
    )
}

export default CardProduct

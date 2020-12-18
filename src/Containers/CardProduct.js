import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const CardProduct = (props) => {
    let {grid, image, title, bodytext} = props;
    return (
        <div className={grid}>
            <Button className="p-0 border-0 rounded-pill">
                <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }} className="rounded-pill">
                    <CardImg className="rounded-pill" top width="100%" src={`${process.env.PUBLIC_URL}/images/product/${image}`}  alt="Card image cap" />
                    <CardTitle tag="h5">{title}</CardTitle>
                    <CardText>{bodytext}</CardText>
                </Card>
            </Button>
        </div>
    )
}

export default CardProduct

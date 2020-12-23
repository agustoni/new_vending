import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const ListProductItem = (props) => {
    let {grid, image, title, bodytext, backgroundColor} = props;
    return (
        <div className={grid}>
            <Card body inverse style={{ backgroundColor: backgroundColor, borderColor: backgroundColor, cursor:'pointer' }} className="rounded-0 text-dark text-center">
                <CardImg top width="100%" src={`${process.env.PUBLIC_URL}/images/product/${image}`}  alt="Card image cap" />
                <CardTitle tag="h5">{title}</CardTitle>
                <CardText>{bodytext}</CardText>
            </Card>
        </div>
    )
}

export default ListProductItem

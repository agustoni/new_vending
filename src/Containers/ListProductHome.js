import React from 'react'
import {
    Card, CardImg, CardText, CardTitle
} from 'reactstrap';

const ListProductHome = (props) => {
    let {grid, backgroundColor, image, title, bodytext, textColor, click, id} = props

    return (
        <div className={grid} >
            <Card body inverse style={{ backgroundColor: backgroundColor, borderColor: "dec5ff", borderWidth: "5px", cursor:'pointer' }} className="rounded-0 text-center" onClick={()=>click(id)}>
                <CardImg top width="100%" src={`${process.env.PUBLIC_URL}/images/product/${image}`}  alt="Card image cap" />
                <CardTitle tag="h5" style={{color:textColor}}>{title}</CardTitle>
                <CardText style={{color:textColor}}>{bodytext}</CardText>
            </Card>
        </div>
    )
}

export default ListProductHome

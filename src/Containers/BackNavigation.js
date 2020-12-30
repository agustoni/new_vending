import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { Button } from "reactstrap";

const BackNavigation = (props) => {
    let {click} = props
    return (
        <Button color="primary" className="col-md-12 col-lg-12 rounded-0" onClick={click} ><FontAwesomeIcon icon={faArrowCircleLeft} size="1x"/> BACK </Button>
    )
}

export default BackNavigation
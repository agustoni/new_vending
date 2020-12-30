import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'

const BackNavigation = (props) => {
    let {click} = props
    return (
        <FontAwesomeIcon icon={faArrowCircleLeft} size="6x" onClick={click} style={{'cursor':'pointer'}}/>
    )
}

export default BackNavigation
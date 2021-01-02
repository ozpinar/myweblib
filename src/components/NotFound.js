import React from 'react'
import classes from './styles/notfound.module.css'

const NotFound = (props) => {
    return (
        <div className={classes.notfound}>
            <h3>{props.msg}</h3>
        </div>
    )
}

export default NotFound

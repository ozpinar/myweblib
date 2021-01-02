import React from 'react'
import classes from './styles/searchresult.module.css'
import UserPP from '../images/userpp.svg'
import Button from '../components/Button'
import {Link} from 'react-router-dom'

const SearchResult = (props) => {
    return (
        <div className={ classes.searchresult }>
            <div className={classes.userinfo}>
                <img src={UserPP} width="32px" alt=""/>
                <Link to={`/lib/profile/${props.id}`}><span className={classes.username}>{props.name + " " + props.lastname}</span></Link>
            </div>
            <Button follow={props.follows} id={props.id} />
        </div>
    )
}

export default SearchResult

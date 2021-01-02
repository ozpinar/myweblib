import classes from './styles/userinfo.module.css'
import React from 'react'
import UserPP from '../images/userpp.svg'
import Movie from '../images/videowhite.svg'
import Book from '../images/favbook.svg'
import { useState } from 'react'
import Button from './Button'

const SelfUserInfo = (props) => {

    return (
        <div className={classes.wrapper}>
            <div className={classes.userinfo}>
                <img className={classes.profilephoto} src={UserPP} alt=""/>
                <div className={classes.useridfollow}>
                <h5 className={classes.userid}>{props.firstname + " " + props.lastname}</h5>
                </div>
            </div>
            <div className={classes.interactioninfo}>
                <span><strong>{props.posts}</strong>  posts</span>
                <span><strong>{props.followers}</strong>  followers</span>
                <span><strong>{props.following}</strong>  following</span>
            </div>
            <div className={classes.favourites}>
                <div className={classes.bookfavourite}>
                    <img src={Book} width="62px" alt=""/>
                    <span>{props.favouritebook}</span>
                </div>
                <div className={classes.moviefavourite}>
                    <img src={Movie} width="62px" alt=""/>
                    <span>{props.favouritemovie}</span>
                </div>
            </div>
        </div>
    )
}

export default SelfUserInfo

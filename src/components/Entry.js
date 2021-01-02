import React from 'react'
import UserPP from '../images/userpp.svg'
import Movie from '../images/movie.svg'
import Delete from '../images/delete.svg'
import Book from '../images/contentbook.svg'
import classes from './styles/entry.module.css'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Entry = ( props ) => {

    const handleDelete = () => {
        axios({
            method: "DELETE",
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token"), 
            },
            data:{
                memberID: props.postid
            },
            url: `https://my-web-lib.herokuapp.com/posts/${props.postid}`
        }).then((res) => {
            
            window.location.reload();

        }).catch(error =>{
            console.log(error.response)
        })
    }
    
    return (
        <div title="entry" className={classes.entry}>
            <div className={classes.topinfo}>
                <Link className={classes.link} to={`/lib/profile/${props.authorID}`}>
                    <div className={classes.userinfo}>
                        <img src={UserPP} width="32px" alt=""/>
                        <p>{props.firstname + " " + props.lastname}</p>
                    </div>
                </Link>
                <p>{props.date}</p>
                <img onClick={handleDelete} title="delete" className={classes.delete} width="16px" src={Delete} alt=""/>
            </div>
            <div className={classes.contentinfo}>
                <img className={classes.icon} src={(props.type == "book")? Book : Movie} width="53px" alt=""/>
                <div title="midsec" className={classes.middlesection}>
                 <h3 className={classes.contentname}>{props.contentname}</h3>
                 <em className={classes.comment}>“{props.comment}”</em>
                </div>
                <h3 className={classes.rating}>{props.rating}/10</h3>
            </div>
        </div>
    )
}

export default Entry

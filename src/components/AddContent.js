import React from 'react'
import classes from './styles/addcontent.module.css'
import { useState, useEffect } from 'react';
import Switch from "react-switch";
import Book from '../images/bookwhite.svg'
import Movie from '../images/videowhite.svg'
import axios from 'axios'
import { ToastProvider, useToasts } from 'react-toast-notifications'
import { findAllByTitle } from '@testing-library/react';



const AddContent = () => {
    const [contentType, setContentType] = useState("book");
    const [checked, setChecked] = useState(false);
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const [score, setScore] = useState(1);
    const {addToast} = useToasts();

    const handleChange = () => {
        setChecked(!checked);
        setContentType((contentType === "book") ? "movie" : "book");
    }

    const sendPost = () => {
        axios({
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token"), 
            },
            data:{
                authorID: localStorage.getItem("currentUser"),
                title: title,
                description: comment,
                type: contentType,
                score: score,
                category: "cat"
            },
            url: "https://my-web-lib.herokuapp.com/posts"
        }).then((res) => {
            if(res.status == 200){
                addToast("You post has been sent succesfully!", {
                    appearance: 'success',
                    autoDismiss: true,
                })
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }

        }).catch(error =>{
            console.log(error.response)
        })
    }

    // const sendPost = () => {
    //     const data = {
    //         headers: {
    //             Authorization: 'Bearer ' + localStorage.getItem("token"),
    //         },

    //         authorID: localStorage.getItem("currentUser"),
    //         title: title,
    //         description: comment,
    //         type: contentType,
    //         score: score,
    //     }

    //     axios.post("http://localhost:8000/posts", data)
    //         .then(res => {
    //             console.log(res);
    //         })
    //         .catch(error => {
    //             console.log(error.response);
    //         })
    // }

    const titleChangeHandler = (e) => {
        setTitle(e.target.value);
    }

    const commentChangeHandler = (e) => {
        setComment(e.target.value);
    }

    const scoreChangeHandler = (e) => {
        setScore(e.target.value);
    }

    return (
        <div className={classes.addcontent} >
           <div className={classes.left}>
           <em>Share a public book or movie</em>
            <div className={classes.titlerating}>
                <input onChange={titleChangeHandler} className={classes.contenttitle} placeholder="title" type="text"/>
                <select onChange={scoreChangeHandler} name="" id="">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                
            </div>
            <textarea onChange={commentChangeHandler} className={classes.comment} placeholder="what do you think about this?"></textarea>
           </div>
            <div className={classes.right}>
            <div className={classes.toggler}>
                <img className={classes.book} src={Book} width="50px" alt=""/>
                <label>
                    <label htmlFor="material-switch">
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        onColor="#3A1772"
                        offColor="#3A1772"
                        onHandleColor="#fff"
                        offHandleColor="#fff"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={40}
                        width={120}
                        className="react-switch"
                        id="material-switch"
                    />
                    </label>
                </label>
                <img className={classes.movie} src={Movie} width="50px" alt=""/>
            </div>
            <button onClick={sendPost} className={classes.button}>post</button>
            </div>
        </div>
    )
}

export default AddContent

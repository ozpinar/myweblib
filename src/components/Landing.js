import React from 'react'
//import './styles/landing.css'
import classes from './styles/landing.module.css'
import Book from '../images/newbook.svg'
import DownArrow from '../images/down-arrow.svg'
import Illustration from '../images/5836.svg'
import {Link, useHistory} from 'react-router-dom'
import {useState} from 'react'
import emailicon from '../images/email.svg'
import padlock from '../images/padlock.svg'
import user from '../images/user.svg'
import Entry from './Entry'
import Auth from '../auth'
import axios from 'axios'
import { ToastProvider, useToasts } from 'react-toast-notifications'





const Landing = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const {addToast} = useToasts();

    const nameChangeHandler = (e) => {
        setName(e.target.value);
    } 

    const lastNameChangeHandler = (e) => {
        setLastName(e.target.value);
    } 

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);       
    }
    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);      
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      

    const submitUser = () => {
        axios({
            method: "POST",
            data: {
                firstName: capitalizeFirstLetter(name),
                lastName: capitalizeFirstLetter(lastName),
                email: email,
                password: password
            },
            url: "https://my-web-lib.herokuapp.com/members/signup",
        }).then((res) => {
            if(res.status == 200){
                addToast("You have signed up succesfully!", {
                    appearance: 'success',
                    autoDismiss: true,
                })
                setTimeout(() => {
                    history.push("/login");
                }, 1000);
            }
        })
        .catch(error => {
            console.log(error.response)
            if (error.response.status == 409){
                addToast("This e-mail has already registered", {
                    appearance: 'error',
                    autoDismiss: true,
                })
            }
            else{
            error.response.data.errors.map(error => {
                addToast(error.msg, {
                    appearance: 'error',
                    autoDismiss: true,
                })
            })}
        })
    }
        


    return (
        <div>
            <nav className={classes.navbar}>
                <img src={Book} alt=""/>
                <h1>MyWebLib</h1>
            </nav>
            <div className={classes.form}>
                <em>store and share your favourite books and movies</em>
                <h3>join now</h3>
                {/* <button onClick={() => auth.signup("berkdeneme", "berkdeneme", "deneme@mail.com", "1Aabbcc.")}>nolur</button>
                <button onClick={() => auth.login("deneme@mail.com", "1Aabbcc.")}>login</button> */}
                <img src={DownArrow} width="25px" alt=""/>
                <div className={classes.insideform} action="">
                    <div className={classes.namesurname}>
                        <label className={classes.name} for="username"></label>
                        <input onChange={nameChangeHandler} type="text" className={classes.firstname} placeholder="name" name="" />
                        <label className={classes.lastname} for="email"></label>
                        <input onChange={lastNameChangeHandler} type="text" className={classes.surname} placeholder="surname" name="" />
                    </div>
                    <label className={classes.email} for="email"></label>
                    <input onChange={emailChangeHandler} type="email" placeholder="e-mail" name="" id="email"/>
                    <label className={classes.password} for="password"></label>
                    <input onChange={passwordChangeHandler} type="password" placeholder="password" name="" id="password"/>
                    <div className={classes.submit}>
                        <p>already have an account? <Link to="/login">log in</Link></p>
                        {/* <input onSubmit={submitUser} type="submit" value="join"/> */}
                        <button onClick={submitUser}>join</button>
                    </div>
                </div>
            </div>
            <div className={classes.illustration}>
                    <img src={Illustration} width="1040px" height="780px" alt=""/>
            </div>
        </div>
    )
    }

export default Landing;

import React from 'react'
import Book from '../images/newbook.svg'
import DownArrow from '../images/down-arrow.svg'
import Illustration from '../images/5836.svg'
import {Link} from 'react-router-dom'
import classes from './styles/login.module.css'
import emailicon from '../images/email.svg'
import padlock from '../images/padlock.svg'
import Deneme from '../auth'
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import { ToastProvider, useToasts } from 'react-toast-notifications'



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const auth = new Auth();
    const history = useHistory();
    const {addToast} = useToasts();

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);       
    }
    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    const loginProcess = () => {

        const data = {
            email: email,
            password: password
        }

        axios.post("https://my-web-lib.herokuapp.com/members/login", data)
            .then(res => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("currentUser", res.data.data._id);
                if (res.status == 200 && localStorage.getItem("token")) {
                    addToast("You have logged in succesfully!", {
                        appearance: 'success',
                        autoDismiss: true,
                    })
                    setTimeout(() => {
                        history.push("/lib/home");
                    }, 1000);
                }
            })
            .catch(error => {
                console.log(error.response);
                
                    addToast(error.response.data.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    })
                
            })
    }

    const loginUser = () => {
        try {
            loginProcess();      
        } catch (error) {
            console.log(error);
        }      
    }
    
    return (
        <div>
            <nav className={classes.navbar}>
                <img src={Book} alt=""/>
                <h1>MyWebLib</h1>
            </nav>
            <div className={classes.form}>
                <em>store and share your favourite books and movies</em>
                <h3>log in</h3>
                <img src={DownArrow} width="25px" alt=""/>
                <div className={classes.insideform} action="">
                    <input type="email" onChange={emailChangeHandler} placeholder="e-mail" name="" id=""/>
                    <img className={classes.emailicon} src={emailicon} width="25px" alt=""/>
                    <input type="password" onChange={passwordChangeHandler} placeholder="password" name="" id=""/>
                    <img className={classes.padlock} src={padlock} width="25px" alt=""/>
                    <div className={classes.submit}>
                        <p>don't have an account? <Link to="/">join now</Link></p>
                        
                        <button onClick={loginUser}>log in</button>
                    </div>
                </div>
            </div>
            <div className={classes.illustration}>
                    <img src={Illustration} width="1040px" height="780px" alt=""/>
            </div>
        </div>
    )
}

export default Login;

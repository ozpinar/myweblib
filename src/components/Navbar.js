import React, {useState, useEffect} from 'react'
import Book from '../images/newbook.svg'
import classes from './styles/navbar.module.css'
import UserPP from '../images/userpp.svg'
import LogOut from '../images/logout.svg'
import Loupe from '../images/loupe.svg'
import Settings from '../images/settings.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { ToastProvider, useToasts } from 'react-toast-notifications'


const Navbar = () => {
    const [user, setUser] = useState({});
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const {addToast} = useToasts();
    const logOut = () => {
        localStorage.clear();
    }
    const handleSearchQuery = (e) => {
        setSearch(e.target.value);
        console.log(search);
    }

    const handleSearch = () => {
        if(search !== ""){
            history.push(`/lib/search/${search}`);
            window.location.reload(false);
        }
        else{
            addToast("Search bar can not be empty.", {
                appearance: 'warning',
                autoDismiss: true,
            })
        }
    }
    

    const handleEnter = (e) => {
        if(e.key === "Enter"){
            if(search !== "") {
                history.push(`/lib/search/${search}`);
                window.location.reload(false);
            }
        }
        else if(e.key ==="Enter" && search===""){
            addToast("Search bar can not be empty.", {
                appearance: 'warning',
                autoDismiss: true,
            })
        }
    }
    
    useEffect(() => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        };
       axios.get(`https://my-web-lib.herokuapp.com/members/${localStorage.getItem("currentUser")}`, config)
        .then(res => {
            setUser(res.data.data);
            setLoading(false);
        }).catch(error => {
            console.log(error.response)
        })
    }, [])


    return (
        <div>
            <nav className={classes.navbar}>
                <Link to="/lib/home">
                    <div className={classes.logo}>
                        <img src={Book} width="61px" alt=""/>
                        <h1>MyWebLib</h1>
                    </div>
                </Link>
                <label className={classes.searchlabel} for="search"></label>
                <div className={classes.searchbar}>
                    <input onKeyPress={handleEnter} onChange={handleSearchQuery} type="text" placeholder="search" name="" id="search"/>
                    <button onClick={handleSearch} ><img src={Loupe} width='18px' alt=""/></button>
                </div>
                <Link to="/lib/profile">
                    <div className={classes.userinfo}>
                        <span>{!loading ? user.firstName + " " + user.lastName : ""}</span>
                        <img src={UserPP} width="36px" alt=""/>
                    </div>
                </Link>
                <Link to="/">
                    <img onClick={logOut} className={classes.logout} src={LogOut} width="36px" alt=""/>
                </Link>
            </nav>
        </div>
    )
}

export default Navbar;

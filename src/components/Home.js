import React from 'react'
import Entry from './Entry'
import AddContent from './AddContent'
import classes from './styles/home.module.css'
import { json } from 'body-parser'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ReactLoading from 'react-loading'
import NotFound from './NotFound'


const Home = () => {
    const formatDate = (mydate) => {
       let date = new Date(mydate);
       let year = date.getFullYear();
       let month = date.getMonth()+1;
       let dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }   
        if (month < 10) {
            month = '0' + month;
        }

        return dt+'.' + month + '.'+year;
    }


    const getUserInfo = (post) => {
        return allPosts.authorInfo.filter(filter => filter._id == post.authorID)[0];
    }

    const checkIsSelfAccount = (author) => {
        return author === localStorage.getItem("currentUser");
    }

    
    const [allPosts, setAllPosts] = useState();
    const [myData, setMyData] = useState({});
    const [authorInfo, setAuthorInfo] = useState();
    const [loading, setLoading] = useState(true);
    const [userFollows, setUserFollows] = useState();
    const [postsShown, setPostsShown] = useState();
    let userFollowingTemp = [];
    let allPostsTemp = {};

    useEffect(() => {
        axios.get(`https://my-web-lib.herokuapp.com/posts`)
        .then(res => {
            
            setAllPosts(res.data);
            allPostsTemp = res.data.data;
            
            res.data.data.reverse();
            setAuthorInfo(res.data.authorInfo);
            setTimeout(() => {
                setLoading(false);
            }, 700);
        }).catch(error => {
            console.log(error.response)
        });
        userFollowing();
        personalFeed();
    }, [])

    const userFollowing = () => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        };
       axios.get(`https://my-web-lib.herokuapp.com/members/${localStorage.getItem("currentUser")}`, config)
        .then(res => {
            
            userFollowingTemp = res.data.data.follow;
            setUserFollows(userFollowingTemp);
            
        })} 
       

    const personalFeed = () => {
        setTimeout(() => {
            const postsWanted = [];
            for (let i = 0; i < allPostsTemp.length; i++) {
                for (let j = 0; j < userFollowingTemp.length; j++) {
                   if(allPostsTemp[i].authorID === userFollowingTemp[j].userID){
                       postsWanted.push(allPostsTemp[i])
                       
                   }
                    
                }
                
            }
            setPostsShown(postsWanted);
        }, 1000);
    }
    
    
    return (
        <div className={classes.feed}>
            <AddContent/>
            <div className={classes.content}>
                {loading ? <div className={classes.loader}><ReactLoading type="spin" color="#2DB7E3" height={50} width={50} /></div>
                :postsShown && postsShown.length ? postsShown.map((post, index) => {
                return <Entry
                    key={post._id}
                    authorID={checkIsSelfAccount(post.authorID) ? "" : post.authorID}
                    firstname={getUserInfo(post).firstName}
                    lastname={getUserInfo(post).lastName}
                    type={post.type}
                    contentname={post.title} 
                    comment={post.description} 
                    rating={post.score} 
                    date={formatDate(post.date)}/>       
                }): !loading && <NotFound msg="Follow someone to start seeing posts"/>
            }
            </div>
        </div>
    )
}

export default Home;

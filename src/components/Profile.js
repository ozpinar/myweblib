import React, {useEffect, useState} from 'react'
import Entry from './Entry'
import UserInfo from './UserInfo'
import classes from './styles/profile.module.css';
import axios from 'axios'
import ReactLoading from 'react-loading'
import NotFound from './NotFound';


const Profile = ( {match} ) => {

    const [userInfo, setUserInfo] = useState();
    const [userloading, setuserLoading] = useState(true);
    const [postloading, setpostLoading] = useState(true);
    const [posts, setPosts] = useState();
    const [usersPosts, setUsersPosts] = useState();
    let userspoststemp = [];
    let myposts = {};
    let usersfavposts = [];
    const [favBook, setFavBook] = useState("");
    const [favMovie, setFavMovie] = useState("");
    const [followers, setFollowers] = useState();
    const [clicked, setClicked] = useState(false);
    const [isEmpty, setIsempty] = useState(true);


    
    useEffect(() => {
        
        getUserInfo();
        getPosts();
        
    }, [])
    
    const handleClickUI = () => {
        setClicked(true);
    }
    const checkIsSelfAccount = (author) => {
        return author === localStorage.getItem("currentUser");
    }

    
    const getUserInfo = () => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        };
       axios.get(`https://my-web-lib.herokuapp.com/members/${match.params.id}`, config)
        .then(res => {
            
            setUserInfo(res.data.data);
            setFollowers(res.data.data.followers);
            localStorage.setItem("follower", res.data.data.followers.length);
            setuserLoading(false);
        })
        .catch(error => {
            console.log(error.response)
        })
    }

    const getPosts = () => {
        axios.get(`https://my-web-lib.herokuapp.com/posts`)
        .then(res => {
            
            setPosts(res.data);
            myposts= res.data;
            usersfavposts = getUsersNotReversedPosts();
            
            setFavBook(getfavouriteBook());
            setFavMovie(getfavouriteMovie());
            setUsersPosts(getUsersPosts());
            userspoststemp = getUsersPosts();
            (!userspoststemp === []) ? setIsempty(false): setIsempty(true);
            setpostLoading(false);
        }).catch(error => {
            console.log(error)
        });
    }

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
    
    const getUsersPosts = () => {
        const userposts = [];
        
        myposts && myposts.data.forEach(post => {
            if (post.authorID === match.params.id){
                
                userposts.push(post);
            }
        })
        const reversedposts = userposts.map(item => item).reverse();
        return reversedposts;
    }

    const getUsersNotReversedPosts = () => {
        const userposts = [];
        
        myposts && myposts.data.forEach(post => {
            if (post.authorID === match.params.id){
                
                userposts.push(post);
            }
        })
        return userposts;
    }

    const getfavouriteBook = () => {
        const bookposts = [];
        usersfavposts.forEach(post => {
            if (post.type === "book"){
                bookposts.push(post);
            }
        })
        if (bookposts.length==0) return "";
        bookposts.sort((a,b) => {
            return a.score-b.score;
        })
         
         return bookposts[bookposts.length - 1].title;
        
    } 
    
    const getfavouriteMovie = () => {
        const movieposts = [];
        usersfavposts.forEach(post => {
            if (post.type === "movie"){
                movieposts.push(post);
            }
        })
        if (movieposts.length==0) return "";
        movieposts.sort((a,b) => {
            return a.score-b.score;
        })
         
         return movieposts[movieposts.length - 1].title;
        
    }      
    const matchUser = (post) => {
        return posts.authorInfo.filter(filter => filter._id == post.authorID)[0];
    }
    
    return (
        
            userloading && postloading ? <div className={classes.loader}><ReactLoading type="spin" color="#2DB7E3" height={50} width={50} /></div> :
            <div className={classes.profile}>        
             {usersPosts && userInfo && <UserInfo 
             follows={userInfo.follow} 
             id={userInfo._id} 
             firstname={userInfo.firstName} 
             lastname={userInfo.lastName} 
             posts={usersPosts.length} 
             followers={userInfo.followers.length} 
             following={userInfo.follow.length} 
             favouritebook={favBook} 
             favouritemovie={favMovie}/>}
                <div className={classes.entries}>
                    
                    {usersPosts && usersPosts.length ? usersPosts.map (post => {
                        return <Entry
                            key={post._id}
                            authorID={checkIsSelfAccount(post.authorID) ? "" : post.authorID}
                            firstname={matchUser(post).firstName}
                            lastname={matchUser(post).lastName}
                            type={post.type}
                            contentname={post.title} 
                            comment={post.description} 
                            rating={post.score} 
                            date={formatDate(post.date)}
                        /> 
                    }): !postloading && <NotFound msg="This user has not posted anything yet" />
                    }
                </div>
        </div>
        
       
    )
}

export default Profile

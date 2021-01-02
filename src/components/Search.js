import React, {useEffect, useState} from 'react'
import SearchResult from './SearchResult'
import NotFound from './NotFound'
import classes from './styles/search.module.css'
import Library from '../images/library.svg'
import Fuse from 'fuse.js'
import axios from 'axios'
import ReactLoading from 'react-loading'


const Search = ({match}) => {
    let users = [];
    const [results, setResults] = useState();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        axios.get(`https://my-web-lib.herokuapp.com/members/`)
        .then(res => {
            
            users = (res.data.data);
            const fuse = new Fuse(users, {
                keys:[
                    "firstName"
                ]
            });
            fuse.search(match.params.query);
            setResults(fuse.search(match.params.query));
            setLoading(false)
            
        })
        .catch(error => {
            console.log(error.response)
        })
    }, [])



    
   
    
    
    
    
    return (
        <div className={ classes.search }>
            <div className={ classes.result }>
                {loading ? <div className={classes.loader}><ReactLoading type="spin" color="#2DB7E3" height={50} width={50} /></div> :
                   results && results.length ? results.map(result =>{
                       return <SearchResult name={result.item.firstName} lastname={result.item.lastName} id={result.item._id} follows={result.item.follow} />
                    }): !loading && <NotFound msg="Could not find anything related to your search."/>
                }
            </div>
            <div className={classes.illustration}>
                <img src={Library} alt=""/>
            </div>
           
        </div>
    )
}

export default Search

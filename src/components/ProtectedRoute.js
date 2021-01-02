    import React from 'react'
    import {Route, Redir, Redirect} from 'react-router-dom'
    
    const ProtectedRoute = ({component: Component, ...rest}) => {
        return (
                <Route {...rest} 
                render={(props) => {
                        if(localStorage.getItem("token")){
                        return <Component {...props}/>
                        }
                        else{
                            return (
                                <Redirect
                                    to={{
                                        pathname: "/",
                                        state: {
                                            from: props.location
                                        }
                                    }}
                                />
                            )
                        }
                    }} 
                />   
        )
    }
    
    export default ProtectedRoute
    
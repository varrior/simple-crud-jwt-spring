import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authContext } from '../context/AuthContext';

const LoginRoute = ({ component: Component, ...rest }) => {
    const { isLoggedIn } = useContext(authContext);
    return (
        <Route {...rest} render={(props)=> (
            isLoggedIn()
            ?
            <Redirect to={{
                pathname: "user/profile",
                state: {from: props.location}
            }}/>
            :
            <Component {...props}/>
        )} ></Route>
    )
}
    
export default LoginRoute
import React, { createContext, useState, useEffect } from 'react';
import { getUser } from '../api/api';
import useInterval  from '../Hook/useInterval';

const authContext = createContext({});
const parseJwt = (token) => {
    if(token){
        const splitToken = token.split('.')[1];

        if(typeof splitToken === 'string'){
            return JSON.parse(window.atob(splitToken.replace('-','+').replace('_','/')));
        }        
    }

    return false;
};


const AuthProvider = ({children}) => {
    const loggedInUser = parseJwt(localStorage.getItem('token'));
    const [state, setState] = useState({
        email: loggedInUser.sub,
        permission: loggedInUser.auth,
    });
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [renewToken, setRenewToken] = useState(false);
    const [expired, setExpired] = useState(false);

    const isLoggedIn = () => !!localStorage.getItem('token') ? true : false;
    const logIn = (token) => {
        
        const loggedInUser = parseJwt(token);

        setState({
            email: loggedInUser.sub,
            permission: loggedInUser.auth,
        })
        localStorage.setItem('token', token)
    };
    const logOut = () => {
        setRenewToken(false);
        setExpired(true);
        localStorage.removeItem('token');
    }

    useInterval(() => {
        setToken(localStorage.getItem('token'));
        if(!!localStorage.getItem('token')){
            const parseObj = parseJwt(localStorage.getItem('token'));
            const timeStamp = Math.floor(Date.now()/1000);

            if(parseObj.hasOwnProperty('exp')){
                if(parseObj.exp - timeStamp < 0){
                    logOut();
                }                     
            } else {
                logOut()
            }
        }
    },3000)

    useEffect(() => {
        let isMounted = true;

        getUser().then(data=>{
            if(isMounted){
                if(data.success){
                    setState(state => ({ 
                        ...state,
                        id: data.id,
                        username: data.username,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        permission: data.permission,
                    }))
                } else {
                    logOut()
                }                
            }

        });

        return () => (isMounted = false)
    },[token]);

    const authObj = {
        isLoggedIn, 
        logIn,
        logOut,
    }
    return (
        <authContext.Provider value={{...state, ...authObj, expired, renewToken, loading }}>
            {children}
        </authContext.Provider>
    )
}
export {authContext}

export default AuthProvider
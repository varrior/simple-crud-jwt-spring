import React, { useContext, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { authContext } from '../../../context/AuthContext';

const CustomLink = styled(Link)`
    color: rgba(255,255,255,.5);
    display: block;
    padding: .5rem 10px;

    &:hover {
        color: rgba(255,255,255,.8);
    }
`

const AuthNav = () => {

    const { isLoggedIn, permission, logOut } = useContext(authContext);

    return (
        (isLoggedIn() && permission === 'USER') ? 
        <Fragment>
            <CustomLink to="/user/profile">Profile</CustomLink>
            <CustomLink to="#" onClick={logOut}>Log out</CustomLink>
        </Fragment> : 
        <CustomLink title="sign in" to="/">Sign in</CustomLink>
    )
}

export default AuthNav
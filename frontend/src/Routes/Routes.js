import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
    Route,
    Switch,
} from 'react-router-dom';
import SignUp from '../components/SignUp/Signup';
import Login from '../components/Login/Login'
import LoginRoute from './LoginRoute';
import AdminRoute from './AdminRoute';
import UserWrapper from '../components/User/UserWrapper';
import Navbar from '../components/Navbar/Navbar';
import Page404 from '../components/404/404';

const Routes = () => {

    return ( 
        <BrowserRouter>
            <Navbar />
            <Switch>              
                <LoginRoute exact path="/" component={Login}/>
                <Route path="/signup" component={SignUp}/>
                <AdminRoute exact path="/user/profile" component={UserWrapper}/>

                <Route component={Page404} />
              </Switch>         
        </BrowserRouter>
     
    )
} 

export default Routes 
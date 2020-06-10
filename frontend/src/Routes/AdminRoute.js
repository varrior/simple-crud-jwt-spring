import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authContext } from '../context/AuthContext'; 

const AdminRoute = ({ component: Component,...rest }) => {

    const { isLoggedIn, email, permission, expired } = useContext(authContext);

    return (
        <Route {...rest} render={(props)=> (
            (isLoggedIn() && permission === 'USER')
            ?
                <Component {...props} email={email} permission={permission} dashboard={true}/>
            :
                <Redirect to={{
                    pathname: expired ? "/" : "/404",
                    state: {from: props.location}
                }}/>
        )} ></Route>
    )
}

  export default AdminRoute 
import React from  'react';
import Loading from '../components/Loading/Loading';

const loadingHOC = (Component) => {

    return (props) => {
        const { isLoaded } = props;
        return(
            isLoaded ? <Component {...props}/> : <Loading {...props}/>
        )
    }
    
}
export default loadingHOC;
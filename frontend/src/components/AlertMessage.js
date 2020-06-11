import React from 'react';
import { Alert } from 'react-bootstrap';
import loadingHOC from '../HOC/loadingHOC';

const AlertMessage = ({success, open, message }) => {

    return(
        <Alert variant={success?'success':'danger'} show={open} className="show-hide-message" ><span dangerouslySetInnerHTML={{ __html : message }}></span></Alert>
    )
}
 
export default loadingHOC(AlertMessage);
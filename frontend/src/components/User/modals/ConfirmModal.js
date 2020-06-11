import React, { useReducer, useContext } from 'react';
import styled from 'styled-components';
import { Form, Modal, Button } from 'react-bootstrap';
import AlertMessage from '../../AlertMessage';
import Password from '../../SignUp/components/Password';
import formReducer from '../../../action/formReducer';
import loadingReducer from '../../../action/loadingReducer';
import useCombineReducers from '../../../Hook/useCombineReducers';
import { updateUser, onLoginUser } from '../../../api/api';
import { authContext } from '../../../context/AuthContext';

const ModalBootstrap = styled(Modal)`
    & .modal-dialog {
        padding-top: 200px;
        max-width: 450px;
        margin-top: 0;
    }
`
const ModalWrapper = styled.div`    
    & .modal-title {
        font-size: 18px;
    }
    & .modal-footer {
        border-top: none;
        display: block;
        
    }
    & button {
        float: right;
        box-shadow: none !important;
    }
    & .modal-body {
        padding: 15px 15px 0 15px;
    }
`
const FloatWrapper = styled.div`
    overflow: hidden;
    margin-right: 0;

    & button {
        background-color: #1b3e6e;
        border-color: #1b3e6e;
        display: block;
        width: 100%;
        border-radius: 20px;
        transition: all 0.5s ease;

        &:active {
            background-color: #1b3e6e !important;
            border-color: #1b3e6e !important;
        }
        &:hover {
            background-color: #1b3e90;
            border-color: #1b3e90;
        }
        &:focus {
            background-color: #1b3e6e;
            border-color: #1b3e6e;
        }
    }
`

const formState = {
    message: false,
    open: false, 
    success: false, 

    password: {
        value: '',
        isValid: null,
    }
}
const loadingState = {
    isLoaded: true
}
const ConfirmModal = ({open, email, onHide, updateData, id}) => {

    const { logIn } = useContext(authContext);
    const [state, dispatch] = useCombineReducers({
        form: useReducer(formReducer, formState),
        loading: useReducer(loadingReducer, loadingState)
    }) ;

    const onCheckForm = ({target}) => dispatch({ type: 'CHECK_FORM', valid: target.checkValidity(), target });

    const onSubmit = (e) => {
        e.preventDefault();
        const valid = e.target.checkValidity();
        
        if(valid){
            const userData = updateData.reduce((acc, [key, {value}]) => ({ ...acc, [key]: value }),{});
            dispatch({ type: 'LOADING', isLoaded: false }, 'loading');
            onLoginUser({
                email: email,
                password: state.password.value
            }).then(data => {
                if(data.success){
                    updateUser(userData, id).then(data => {
                        if(data){ 
                            if(data.success){
                                onLoginUser({
                                    email: userData.email,
                                    password: state.password.value
                                }).then(data => {
                                    data.success && logIn(data.token)
                                })
                            }
                            dispatch({ type: 'LOADING', isLoaded: true }, 'loading'); 
                            dispatch({ type: 'SUBMIT_FORM', data: data }, 'form');
                        }
                    })
                } else {                    
                    dispatch({ type: 'LOADING', isLoaded: true }, 'loading');
                    dispatch({ type: 'SUBMIT_FORM', data: data }, 'form');
                }
            })
        } else {
            const invalidData = Object.entries(state).filter(([key, value]) => value.hasOwnProperty('isValid')).reduce((acc, [key, {isValid,...rest}]) => ({...acc, [key]:{ isValid: !!isValid, ...rest }}),{});
            dispatch({ type: 'SUBMIT_FORM', isInvalid: true, invalidData: invalidData });
        }
    };

    return (
        <ModalBootstrap show={open} onHide={onHide}>
            <ModalWrapper>
                <Form onSubmit={onSubmit} noValidate>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm changes</Modal.Title> 
                    </Modal.Header>
                    <Modal.Body>   
                        <Password onChange={onCheckForm} password={state.password} required/>
                    </Modal.Body>
                    <Modal.Footer>
                        <FloatWrapper>
                            <Button variant="success" type="submit">Save changes!</Button>
                        </FloatWrapper>
                        <AlertMessage success={state.success} open={state.open} message={state.message} isLoaded={state.isLoaded} loadingName={state.loadingName} />
                    </Modal.Footer>
                </Form>
            </ModalWrapper>                
        </ModalBootstrap>            
    )
}

export default ConfirmModal
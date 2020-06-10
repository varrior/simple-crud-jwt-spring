import React, { useReducer, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import { updateUser ,checkUsername, checkEmail } from '../../../api/api';
import Username from '../../SignUp/components/Username';
import Email from '../../SignUp/components/Email';
import FirstName from '../../SignUp/components/FirstName';
import LastName from '../../SignUp/components/LastName';
import useCombineReducers from '../../../Hook/useCombineReducers';
import signUpReducer from '../../../action/signUpReducer';
import loadingReducer from '../../../action/loadingReducer';

import AlertMesage from '../../AlertMessage';
import ConfirmModal from '../modals/ConfirmModal';
import modalReducer from '../../../action/modalReducer';


const Wrapper = styled.div`
    padding-top: 50px;
    margin-bottom: 50px;
    max-width:600px;
    margin-left: auto;
    margin-right: auto;

    & form {
        background-color: #fff;
        padding: 20px;
        margin-top: 15px;
        box-shadow: 0 0.4rem 0.8rem -0.1rem rgba(0,32,128,.1), 0 0 0 1px #f0f2f7;
    }
`
const H1 = styled.h1`
    font-size:28px;
    color: #333;
    text-align: center;
`


const formState = {
    message: false,
    open: false, 
    success: false, 
    username: {
        value: '',
        isValid: null,
        occupied: false,
    },
    email: {
        value: '',
        isValid: null,
        occupied: false,
    },
    firstName: {
        value: '',
        isValid: null,
    },
    lastName: {
        value: '',
        isValid: null,
    },
}
const loadingState = {
    isLoaded: true,
    loadingName: ''
}
const modalState = {
    modal: false,
}
const Profile = ({ username, email, firstName, lastName, id }) => {

    const editProfileRef = useRef(null);
    
    const [state, dispatch] = useCombineReducers({
        form: useReducer(signUpReducer, formState), 
        loading: useReducer(loadingReducer, loadingState),
        modal: useReducer(modalReducer, modalState)
    });

    useEffect(() => {
        dispatch({ 
            type: 'SET_VALUE', 
            initValue: {
                success: false, 
                username: {
                    ...state.username,
                    value: username,
                },
                email: {
                    ...state.email,
                    value: email,
                },
                firstName: {
                    ...state.firstName,
                    value: firstName
                },
                lastName: {
                    ...state.lastName,
                    value: lastName
                },
            } 
        });

        return () => clearTimeout(editProfileRef.current);

    },[username, email, firstName, lastName]);


    const onCheckForm = ({target}) => dispatch({ type: 'CHECK_FORM', valid: target.checkValidity(), target });
    const onUsernameOccupied = ({target}) => checkUsername([target.value]).then(data => dispatch({ type: 'CHECK_OCCUPIED', valid: target.checkValidity(), target, data , initValue: username}, 'form'));
    const onEmailOccupied = ({target}) => checkEmail([target.value]).then(data => dispatch({ type: 'CHECK_OCCUPIED', valid: target.checkValidity(), target, data, initValue: email }, 'form'));
    const openModal = () => dispatch({ type: 'OPEN_MODAL' });
    const hideModal = () => dispatch({ type: 'HIDE_MODAL' });
    const formData = Object.entries(state).filter(([key, value]) => value.hasOwnProperty('value') && value.hasOwnProperty('isValid'));

    const onSubmit = (e) => {
        e.preventDefault(); 
        const valid = formData.every(([key,value]) =>  (value.isValid || value.isValid === null));

        if(valid) {
            const userData = formData.reduce((acc, [key, {value}]) => ({...acc, [key]:value}),{}); 
            if(state.email.value !== email){
                openModal()
            } else {
                dispatch({ type: 'LOADING', isLoaded: false, loadingName: "Zapisuję zmiany..." });
                updateUser(userData, id).then(data => {
                    if(data){ 
                        dispatch({ type: 'LOADING', isLoaded: true }, 'loading');
                        dispatch({ type: 'SUBMIT_FORM', data: data }, 'form');

                        editProfileRef.current = setTimeout(() => {
                            dispatch({type: 'INITIAL_FORM', initialForm: {
                                message: false,
                                open: false, 
                                success: false
                            }})
                        },2000)
                    }
                })                
            }
        } else {
            const invalidData = formData.reduce((acc, [key, {isValid,...rest}]) => ({...acc, [key]:{ isValid: isValid, ...rest }}),{});
            dispatch({ type: 'SUBMIT_FORM', isInvalid: true, invalidData: invalidData });
        }
    };

    return (
        <Wrapper>
            <H1>Edit profile data</H1>
            <Form onSubmit={onSubmit} noValidate>
                <Username onChange={onCheckForm} onBlur={onUsernameOccupied} username={state.username} required/>
                <Email onChange={onCheckForm} onBlur={onEmailOccupied} email={state.email} label="Email" placeholder="Email" isCorrectLabel required/>
                <Form.Row>
                    <FirstName onChange={onCheckForm} firstName={state.firstName} required/>
                    <LastName onChange={onCheckForm} lastName={state.lastName} required/>
                </Form.Row>

                <Button variant="success" type="submit">Save changes!</Button>
                <AlertMesage isLoaded={state.isLoaded} success={state.success} open={state.open} message={state.message} loadingName={state.loadingName}/>
            </Form> 
            <ConfirmModal open={state.modal} onHide={hideModal} email={email} id={id} updateData={formData}/>
        </Wrapper>
    )
}

export default Profile
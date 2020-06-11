import React, { useReducer } from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import { register, checkUsername, checkEmail } from '../../api/api';
import Username from './components/Username';
import FirstName from './components/FirstName';
import LastName from './components/LastName';
import Email from './components/Email';
import Password from './components/Password';
import ConfirmPassword from './components/ConfirmPassword';
import AlertMesage from '../AlertMessage';

import signUpReducer from '../../action/signUpReducer';
import loadingReducer from '../../action/loadingReducer';

import useCombineReducers from '../../Hook/useCombineReducers';

const Container = styled.div`
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;

    @media (min-width: 576px)
    {
        max-width: 540px;
    }
    @media (min-width: 768px)
    {
        max-width: 720px;
    }
    @media (min-width: 992px)
    {
        max-width: 960px;
    }
`
const Wrapper = styled.div`
    padding-top: 100px;
    margin-bottom: 100px;
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
    password: {
        value: '',
        isValid: null,
    },
    confirmPassword: {
        value: '',
        isValid: null,
    }
}
const loadingState = {
    isLoaded: true,
    loadingName: ''
}
const SignUp = () => {

    const [state, dispatch] = useCombineReducers({
        form: useReducer(signUpReducer, formState), 
        loading: useReducer(loadingReducer, loadingState)
    });
    
    const onCheckForm = ({target}) => dispatch({ type: 'CHECK_FORM', valid: target.checkValidity(), target });
    const onUsernameOccupied = ({target}) => checkUsername([target.value]).then(data => dispatch({ type: 'CHECK_OCCUPIED', valid: target.checkValidity(), target, data }, 'form'));
    const onEmailOccupied = ({target}) => checkEmail([target.value]).then(data => dispatch({ type: 'CHECK_OCCUPIED', valid: target.checkValidity(), target, data }, 'form'));
    const onConfirmPassword = ({target}) => dispatch({ type: 'CONFIRM_PASSWORD', valid: target.checkValidity(), target });
    const onSubmit = (e) => {
        e.preventDefault(); 
        const formData = Object.entries(state).filter(([key, value]) => value.hasOwnProperty('value') && value.hasOwnProperty('isValid'));
        const valid = formData.every(([key,value]) => value.isValid);
        const passwordsMatch = state.password.value === state.confirmPassword.value;

        if(valid && passwordsMatch) {
            const userData = formData.reduce((acc, [key, {value}]) => ({...acc, [key]:value}),{}); 
            dispatch({ type: 'LOADING', isLoaded: false, loadingName: "Registration, wait a second..." });
            register(userData).then(data => {
                if(data){ 
                    dispatch({ type: 'LOADING', isLoaded: true }, 'loading');
                    dispatch({ type: 'SUBMIT_FORM', data: data }, 'form');
                    setTimeout(()=>{
                        dispatch({ type: 'INITIAL_FORM', initialForm: { ...formState, ...loadingState }}, 'form'); 
                    },5000)
                }
            })
        } else {
            const invalidData = formData.reduce((acc, [key, {isValid,...rest}]) => ({...acc, [key]:{ isValid: !!isValid, ...rest }}),{});            
            dispatch({ type: 'SUBMIT_FORM', isInvalid: true, invalidData: invalidData, passwordsMatch: passwordsMatch && state.confirmPassword.value.length > 0 });
        }
    };
    
    return(
        <Container>
            <Wrapper>
                <H1>Sign up</H1>
                <Form onSubmit={onSubmit} noValidate>
                    <Username onChange={onCheckForm} onBlur={onUsernameOccupied} username={state.username} required/>
                    <Email onChange={onCheckForm} onBlur={onEmailOccupied} email={state.email} label="Email" placeholder="Email" isCorrectLabel required/>
                    <Form.Row>
                        <FirstName onChange={onCheckForm} firstName={state.firstName} required/>
                        <LastName onChange={onCheckForm} lastName={state.lastName} required/>
                    </Form.Row>
                    <Password onChange={onCheckForm} password={state.password} required/>
                    <ConfirmPassword onChange={onConfirmPassword} confirmPassword={state.confirmPassword} required/>

                    <Button variant="danger" type="submit">Załóż konto!</Button>
                    <AlertMesage isLoaded={state.isLoaded} success={state.success} open={state.open} message={state.message} loadingName = {state.loadingName}/>
                </Form> 
            </Wrapper>
        </Container>
    )
}

export default SignUp
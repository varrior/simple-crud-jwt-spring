import React, { useReducer, useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { onLoginUser } from '../../api/api';
import Email from '../SignUp/components/Email';
import Password from './components/Pasword';
import AlertMessage from '../AlertMessage';
import formReducer from '../../action/formReducer';
import loadingReducer from '../../action/loadingReducer';
import checkboxReducer from '../../action/checkboxReducer';
import useCombineReducers from '../../Hook/useCombineReducers';
import { authContext } from '../../context/AuthContext';

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
    height: 100vh;
    background-color: #f6f6f6;
    & form {
        background-color: #fff;
        padding: 20px;
        margin-top: 15px;
        box-shadow: 0 0.4rem 0.8rem -0.1rem rgba(0,32,128,.1), 0 0 0 1px #f0f2f7;
    }
`
const FormWrapper = styled.div`
    padding-top: 150px;
    margin-left: auto;
    margin-right: auto;
    max-width: 500px;

    & button[type='submit']{
        display:block;
        width: 100%;
        background-color: #1b3e6e;
        border-color: #1b3e6e;
        border-radius: 20px;
        transition: all 0.5s ease;

        &:active {
            background-color: #1b3e6e !important;
            border-color: #1b3e6e !important;
            box-shadow: none !important;
        }
        &:hover {
            background-color: #1b3e90;
            border-color: #1b3e90;
        }
        &:focus {
            box-shadow: none !important;
        }
    } 
`
const SignUpLink = styled.div`
    text-align: center;
    margin-top: 15px;
    & a {
        color: #666;
        margin-left: auto;
        margin-right: auto;
        margin-top: 15px;
        text-align: center;
        &:hover {
            color: #000;
        }        
    }
`
const H1 = styled.h1`
    font-size:28px;
    color: #1b3e6e;
    font-weight: inherit;
    text-align: center;
`
const ForgetPasswordWrapper = styled.div`
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    
    & .form-group {
        margin-bottom: 0;
    }
    & label {
        color: #666;
        padding: 0;
        border: none;
        margin-bottom: 15px;
    }
    & label:hover{
        color: #000;
        cursor: pointer;
    }
`
const formState = {
    message: false,
    open: false, 
    success: false, 
    expired: false,

    email: {
        value: '',
        isValid: null,
    },
    password: {
        value: '',
        isValid: null,
    }
}
const loadingState = {
    isLoaded: true,
    loadingName: ''
}
const checkedState = {
    checked: false,
}
const Login = (props) => {
    const { logIn } = useContext(authContext);
    const timeoutRef = useRef(null);
    const [state, dispatch] = useCombineReducers({
        form: useReducer(formReducer, formState), 
        loading: useReducer(loadingReducer, loadingState), 
        checkbox: useReducer(checkboxReducer, checkedState)
    }); 

    const onRememberMe = () => dispatch({ type: 'TOGGLE_CHECKBOX' })
    const onCheck = ({target}) => dispatch({ type: 'CHECK_FORM', valid: target.checkValidity(), target });
    
    const onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = state;
        const valid = e.target.checkValidity();
         
        if(valid){
            dispatch({ type: 'LOADING', isLoaded: false, loadingName:"Logging, wait a moment..." }, 'loading');
            onLoginUser({
                email: email.value,
                password: password.value,
                rememberMe: state.checked
            }).then(data => {
                if(data){ 
                    dispatch({ type: 'LOADING', isLoaded: true }, 'loading');
                    dispatch({ type: 'LOGIN_FORM', data: data }, 'form');
                     
                    if(data.success){
                        logIn(data.token);
                        timeoutRef.current = setTimeout(() => { 
                            dispatch({ type: 'INITIAL_FORM', initialForm: { ...formState, ...loadingState }}, 'form');
                            props.history.push('/user/profile');
                        }, 3000);
                    };
                }
            })
        } else {
            const invalidData = Object.entries(state).filter(([key, value]) => value.hasOwnProperty('isValid')).reduce((acc, [key, {isValid,...rest}]) => ({...acc, [key]:{ isValid: !!isValid, ...rest }}),{});
            dispatch({ type: 'LOGIN_FORM', isInvalid: true, invalidData: invalidData });
        }
    };

    useEffect(()=>{
        return () => clearTimeout(timeoutRef.current);
    },[]) 

    return (
        <Wrapper>
            <Container> 
                <FormWrapper>
                    <H1>Log in</H1>
                    <Form onSubmit={onSubmit} noValidate>
                        <Email onChange={onCheck} email={state.email} label="Email" placeholder="Email" autofocus required/>
                        <Password onChange={onCheck} password={state.password} label="Password"/>

                        <ForgetPasswordWrapper>
                            <Form.Group controlId="remeberMe">
                                <Form.Check onChange={onRememberMe} type="checkbox" name="rememberMe" label="Remember me" checked={state.checked}></Form.Check>    
                            </Form.Group>
                        </ForgetPasswordWrapper>
                        <Button variant="success" type="submit">Sign in</Button>
                        <SignUpLink>
                            <Link to="/signup">Sign up</Link>
                        </SignUpLink>
                        <AlertMessage success={state.success} open={state.open} message={state.message} isLoaded={state.isLoaded} loadingName={state.loadingName} />
                    </Form>
                </FormWrapper>
        </Container>
    </Wrapper>
    )
}


export default Login

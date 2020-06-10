import React from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';

const UL = styled.ul`
    padding-left: 0;
    padding-top: 5px;
    margin-bottom: 0;
    color: ${({valid}) => (valid === true) ? '#28a745' : 'red'};
`
const LI = styled.li`
    list-style: none;
`
const InputEmail = styled.input`
    display: block;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    border-color: ${({valid}) => (valid === false) && 'red'};

    &:focus {
        color: #495057;
        background-color: #fff;
        border-color: #80bdff;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
    }
`
const Email = ({ onChange, onBlur, email: { value, isValid, occupied = false }, children, label='', placeholder, isCorrectLabel, autofocus, required }) => {

    return (
        <Form.Group controlId="email">
            {label && <Form.Label>{label}</Form.Label>}
            <InputEmail 
                onChange={onChange} 
                onBlur={onBlur}
                valid={isValid}
                type="email" 
                name="email" 
                pattern="(?=.{8,50}$)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                value={value}
                placeholder={placeholder} 
                autoFocus={autofocus}
                required={required}>
            </InputEmail>
            {(isValid === false && occupied === false) && <div>
                <UL>
                    <LI>This is not correct email address</LI>
                    {required && <LI>Email address is required!</LI>}
                </UL>                            
            </div>}
            {(isValid === true && isCorrectLabel) && <UL valid={isValid}><LI>Looks good!</LI></UL>}
            {occupied && <UL><LI>This email address is already taken</LI></UL>}
            {children}
        </Form.Group>
    )
} 

export default Email
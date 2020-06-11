import React from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';

const UL = styled.ul`
    padding-left: 0;
    padding-top: 5px;
    margin-bottom: 0;
    color: red;
`
const LI = styled.li`
    list-style: none;
`
const InputPassword = styled.input`
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

const Password = ({ onChange, password: { value, isValid }, label=''}) => {
    return (
        <Form.Group controlId="password">
            {label && <Form.Label>{label}</Form.Label>} 
            <InputPassword 
                valid={isValid}
                name="password" 
                type="password" 
                value={value}
                placeholder="Password" 
                onChange={onChange} 
                required>
            </InputPassword>
            {isValid === false && <UL><LI>Password id required!</LI></UL>}
        </Form.Group>
    )
}
 
export default Password
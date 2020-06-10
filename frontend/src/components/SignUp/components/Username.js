import React from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';

const UL = styled.ul`
    padding-left: 0;
    padding-top: 5px;
    margin-bottom: 0;
    color: ${({valid}) => valid ? '#28a745' : 'red'};
`
const LI = styled.li`
    list-style: none;
`
const Input = styled.input`
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
    border-color: ${({valid}) => (valid === true) && '#28a745'};

    &:focus {
        color: #495057;
        background-color: #fff;
        border-color: #80bdff;
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
    }
`

const Username = ({ onChange, onBlur, username: { value='', isValid, occupied }, required }) => {
 
    return (
        <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Input 
                valid={isValid}
                type="text" 
                placeholder="Username" 
                name="username" 
                value={value || ''}
                pattern="[a-zA-Z0-9_-]{3,30}" 
                onChange={onChange} 
                onBlur={onBlur}
                required={required}>
            </Input>
            {(isValid === false && occupied === false) && <div>
                <UL>
                    <LI>Can contain upper case letters, lower case letters, numbers or _ - characters</LI>
                    <LI>Must be between 3 and 30 characters</LI>
                    <LI>First name is required</LI>
                </UL>                            
            </div>}
            {isValid === true && <UL valid={isValid}><LI>Looks good!</LI></UL>}
            {occupied && <UL><LI>This username is already taken!</LI></UL>}
        </Form.Group>
    )
}
 
export default Username
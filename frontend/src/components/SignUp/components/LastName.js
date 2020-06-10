import React from 'react';
import styled from 'styled-components';
import { Form, Col } from 'react-bootstrap';

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

const LastName = ({ onChange, lastName:{ value='', isValid }, required }) => {
    return (
        <Form.Group as={Col} controlId="lastName">
            <Form.Label>Last name</Form.Label>
            <Input 
                valid={isValid}
                type="text" 
                placeholder="Last name" 
                name="lastName" 
                value={value || ''}
                pattern="[a-zA-Z-,ą,ę,ó,ć,ż,ź,ł,ń,Ą,Ę,Ó,Ć,Ż,Ź,Ł,Ń]{3,30}" 
                onChange={onChange} 
                required={required}>
            </Input>
            {isValid === false && <div>
                <UL>
                    <LI>Must contain only letters</LI>
                    <LI>Must be between 3 and 30 characters</LI>
                    <LI>First name is required</LI>
                </UL>                            
            </div>}
            {isValid === true && <UL valid={isValid}><LI>Looks good!</LI></UL>}
        </Form.Group> 
    )
}

export default LastName 
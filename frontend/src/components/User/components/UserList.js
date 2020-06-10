import React, { useState } from 'react'
import styled from 'styled-components';
import { Table, Button } from 'react-bootstrap';
import {
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RemoveUser from '../modals/RemoveUser';
import AlertMessage from '../../AlertMessage';

const Wrapper = styled.div`
    padding-top: 30px;
    margin-bottom: 100px;
    margin-left: auto;
    margin-right: auto;

    & form {
        background-color: #fff;
        padding: 20px;
        margin-top: 15px;
        box-shadow: 0 0.4rem 0.8rem -0.1rem rgba(0,32,128,.1), 0 0 0 1px #f0f2f7;
    }

    & .table {
        border-color: #bbb;

        & thead th {
            border: 1px solid;
            border-color: inherit;
            background-color: #dedede;
            text-align: center;
        }
        & tbody tr {
            & td {
                border: 1px solid;
                border-color: inherit;
                text-align: center;
            }
        }
        & button{
            color: #666;
            background-color: transparent;
            border-color: transparent;
            border: none;

            &:hover{
                color: #000;
            }

            &:focus, &:active {
                color: #666 !important;
                background-color: transparent !important;
                box-shadow:none !important;
                border: none;
                outline: none;
            }
        }
    }
`
const H1 = styled.h1`
    font-size:28px;
    color: #333;
    text-align: center;
    padding-bottom: 20px;
`

const initialState = {
    open: false,
    id: '',
    username: '',
    email: ''
}

const UserList = ({users=[], onRemoveMessage, userListState}) => {

    const [modalaData, setModalData] = useState(initialState);
    const openModal = (postaDataObj) => setModalData(() => ({ ...postaDataObj, open: true }));
    const onHide = () => setModalData(() => ({ ...initialState }));
    
    return (
        <Wrapper>
            <H1>List of users</H1>
            <Table responsive>
                <thead>
                    <tr>
                        <th name=""></th>
                        <th name="username">Username</th>
                        <th name="firstName">First name</th>
                        <th name="lastName">Last name</th>
                        <th name="email">Email</th>
                        <th name=""></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(([ id, username, firstName, lastName, email ], index)=>{
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{username}</td>
                                <td>{firstName}</td>
                                <td>{lastName}</td>
                                <td>{email}</td>
                                <td className="remove-post"><Button title="Remove" onClick={() => openModal({ id, username, email })}><FontAwesomeIcon icon={faTrashAlt}/></Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>            
            <AlertMessage success={userListState.success} open={userListState.open} message={userListState.message} isLoaded={userListState.isLoaded} />
            <RemoveUser onConfirm={onRemoveMessage} modalData={modalaData} onHide={onHide}/>
        </Wrapper>
    )
}

export default UserList
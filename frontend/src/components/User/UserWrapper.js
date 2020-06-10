import React, {useContext, useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import Profile from './components/Profile';
import { Col, Row } from 'react-bootstrap';
import { authContext } from '../../context/AuthContext';
import UserList from './components/UserList';
import { getAllUsers, removeUser } from '../../api/api';

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

const UserWrapper = () => {
    const { email, username, firstName, lastName, id } = useContext(authContext);
    const removeProfileRef = useRef(null);

    const [users, setUsers] = useState({
        data: []
    });
    const [state, setState] = useState({
        success: false,
        open: false,
        message: '',
        isLoaded: true,
    });

    useEffect(() => {
        let isMounted = true;

        if(id !== undefined){
            getAllUsers(id).then(data => {
                if(isMounted){
                    data.length > 0 && setUsers(state => ({ ...state, data }))
                }
            })            
        }

        return () => {
            clearTimeout(removeProfileRef.current);
            isMounted = false
        }

    },[id, users.data.length])

    const onRemoveMessage = (id) => {
        setState(state => ({ ...state, isLoaded: false }));

        removeUser(id).then(data => {
            setUsers(state => ({ ...state,  data: state.data.filter(element => element[0] !== id)})); 
            setState(state => {
                return ({
                    ...state,
                    success: data.success,
                    message: data.message,
                    open: true,
                    isLoaded: true
                })
            })
            removeProfileRef.current = setTimeout(() =>{
                setState(state => ({ ...state, open: false }))
            },2000)
        })
    }

    return (
        <Container>
            <Row>
                <Col className="col-8 offset-2">
                    <Profile username={username} email={email} firstName={firstName} lastName={lastName} id={id}/>
                </Col>
                <Col xs={12}>
                    <UserList users={users.data} userListState={state} onRemoveMessage={onRemoveMessage}/>
                </Col>                
            </Row>
        </Container>
    )
}

export default UserWrapper
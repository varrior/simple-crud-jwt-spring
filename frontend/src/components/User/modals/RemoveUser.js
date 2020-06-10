import React from 'react';
import styled from 'styled-components';
import { Modal, Button } from 'react-bootstrap';

const ModalBootstrap = styled(Modal)`
    & .modal-dialog {
        padding-top: 200px;
        max-width: 450px;
        margin-top: 0;
        color: #333;
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;

        & .modal-content {
            background-color: #f9f9f9;

            & .modal-header {
                border-bottom: 1px solid #999;

                & .close {
                    color: #333;
                    font-size: 30px;
                    padding: 15px;
                }
            }
        }
    }
`
const ModalWrapper = styled.div`    
    & .modal-title {
        color: #333;
        font-weight: 700;
        font-size: 20px;
    }
    & .modal-footer {
        border-top: none;
        display: block;
        
    }
    & button {
        box-shadow: none !important;
    }
    & .modal-body {
        padding: 20px 15px 20px 15px;

        p {
            display: contents;
        }
    }
`
const FloatWrapper = styled.div`
    text-align: right;
    margin-right: 0;

    & button {
        color: #000;
        border-radius: 2px;
        transition: all 0.5s ease;
        background-color: #f9f9f9;
        border-color: #666;
        margin: 3px;

        &.confirm {
            background-color: #1b2431;
            color: #ddd;
            padding-left:25px;
            padding-right: 25px;

            &:hover, &:active, &:focus {
                background-color: #1b2431 !important;
                color: #fff !important;
            }

        }

        &:hover, &:active, &:focus {
            background-color: #f0f0f0 !important;
            border-color: #666 !important;
            color: #000 !important;
        }
    }
`
const SPAN = styled.span`
    font-size: 18px;
    color: #333;
    display: block;
`

const RemoveUser = ({modalData: { open, id, username, email }, onHide, onConfirm}) => {

    const onRemoveMessage = () => {
        onConfirm(id);
        onHide()
    }

    return (
        <ModalBootstrap show={open} onHide={onHide}>
            <ModalWrapper>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm remove user</Modal.Title> 
                </Modal.Header> 
                <Modal.Body>   
                    <SPAN>Are you sure that you want to remove a user: <br/> <b>{username}, {email}</b></SPAN>
                </Modal.Body>
                <Modal.Footer>
                    <FloatWrapper>
                        <Button onClick={onHide}>No</Button>
                        <Button className="confirm" onClick={onRemoveMessage}>Yes</Button>
                    </FloatWrapper>
                </Modal.Footer>
            </ModalWrapper>                
        </ModalBootstrap> 
    )
}

export default RemoveUser
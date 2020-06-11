import React from 'react';
import styled from 'styled-components';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthNav from './components/AuthNav';

const CustomLink = styled(Link)`
    color: rgba(255,255,255,.5);
    display: block;
    padding: .5rem 10px;

    &:hover {
        color: rgba(255,255,255,.8);
    }
`
const Navbar = () => {

    return (
        <BootstrapNavbar bg="dark" variant="dark" expand="lg">
            <BootstrapNavbar.Brand href="#">Simple CRUD App</BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <CustomLink title="sign up" to="/signup">Sign up</CustomLink>
                        <AuthNav />
                    </Nav>
                </BootstrapNavbar.Collapse>
        </BootstrapNavbar>    
    )
}

export default Navbar
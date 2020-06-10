import React from "react";
import styled from 'styled-components';
import error404 from './404.svg';

const Image = styled.img`
    max-width: 350px;
    text-align: center;
    display: block;
    padding-top: 150px;
    margin: 0px auto 10px auto;
`
const H1 = styled.h1`
    text-align: center;
    font-size: 36px;
    margin-top: 30px
`
const Page404 =() => {
    return(
        <div id="not-found-404">
            <Image alt="Page not found" src={error404}></Image>
            <H1>This page no exists!</H1>
        </div>
    )

} 

export default Page404 
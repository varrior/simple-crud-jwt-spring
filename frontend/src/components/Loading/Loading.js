import React from 'react';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import styled from 'styled-components';
import * as legoData from "./410-lego-loader.json";
import * as doneData from "./433-checked-done.json";

const loadingOptions = {
  loop: true,
  autoplay: true,
  animationData: legoData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};
const doneOptions = { 
  loop: false,
  autoplay: true,
  animationData: doneData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};


const LoadingWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: ${({height}) => height && `${height}`}
`
const H3 = styled.h3`
  font-size: 16px;
`
const FlexAlign = styled.div`
  display: flex;
  align-items: center;
`
const Loading = ({ loadingName, isLoaded, loadingHeight }) => {

      return (
        <LoadingWrapper height={loadingHeight}> 
          <FadeIn>
              <FlexAlign>
                  <H3>{loadingName}</H3>
                  {!isLoaded ? <Lottie options={loadingOptions} height={90} width={90}/> : <Lottie options={doneOptions} height={90} width={90}/>}
              </FlexAlign>
          </FadeIn>              
        </LoadingWrapper>
      )      
  
}

export default Loading
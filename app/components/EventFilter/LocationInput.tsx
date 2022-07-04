import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
`;

const Input = styled.input`
    border: none;
    border-bottom: 1px solid black;

    font-family: 'Inter';
    font-size: 36px;
    font-weight: 400;
    line-height: 44px;
    width: 100%;
    &:focus {
        color: grey;
        outline: none;
    }
`;

const Img = styled.div`
    width: 22px;
    height: 22px;
    background-color: grey;
    margin-left: 24px;
`;

function LocationInput() {

  return (
    <Wrapper>
        <Input type="text"/>
        <Img />        
    </Wrapper>
  );
}

export default LocationInput;
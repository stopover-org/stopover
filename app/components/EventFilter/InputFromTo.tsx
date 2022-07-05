import React from "react";
import DropDownList from "./DropDownList";

import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const Input = styled.input`
    outline: none;
    border: 2px solid #FF8A00;
    width: 100%;
    height: 49px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 29px;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Description = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
`;

function InputFromTo() {

  return (
    <Wrapper>
        <Description>Выберите дату</Description>
        <InputWrapper>
          <Input placeholder="Начало"/>
        
          <Input placeholder="Конец"/>
        </InputWrapper>
             
    </Wrapper>
  );
}

export default InputFromTo;
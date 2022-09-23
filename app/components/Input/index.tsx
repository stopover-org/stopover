import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Column from "../Column";
import Row from "../Row";
import CaretUp from "../icons/Outline/Interface/Caret up.svg";
import CaretDown from "../icons/Outline/Interface/Caret down.svg";
import Typography from "../Typography";

const Wrapper = styled(Row)`
  border: 2px solid black;
`;

const Arrow = styled(Image)`
  cursor: pointer;
`;

const InputStyle = styled.input`
  border: 3px solid red;
`;

const Input = () => (
  <Wrapper>
    <InputStyle type="text" />
    <Column>
      <Arrow width="25px" height="25px" src={CaretUp.src} alt="caret up" />
      <Arrow width="25px" height="25px" src={CaretDown.src} alt="caret down" />
    </Column>
    <Typography>it very long sentence</Typography>
  </Wrapper>
);

export default Input;

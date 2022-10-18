import React, { useState } from "react";
import styled, { keyframes, Keyframes } from "styled-components";
import Row from "../Row";

const MoveRight = (width: number) => keyframes`
  0%{
    transform: translateX(-100px);
    width: ${width}px;
  }
  50%{
    width: calc(1.9 * ${width}px);
  }
  100%{
    transform: translateX(100px);
    width: ${width}px;
  }
`;

const MoveLeft = (width: number) => keyframes`
  0%{
    transform: translateX(100px);
    width: ${width}px;
  }
  50%{
    width: calc(1.9 * ${width}px);
  }
  100%{
    transform: translateX(-100px);
    width: ${width}px;
  }
`;

const Wrapper = styled.div`
  border: 1px solid green;
  width: 500px;
  display: flex;
  justify-content: center;
`;

const MainBody = styled(Row)`
  border: 1px solid;
  background-color: blue;
  width: 300px;
  height: 101px;
  border-radius: 50px;
  position: relative;
`;

const Actuator = styled.div<{ animation: Keyframes }>`
  transform: translateX(-100px);
  border: 1px solid red;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  z-index: 3;
  animation: ${(props) => props.animation} forwards 1s ease-in-out;
`;

const Switch = () => {
  const [animation, setAnimation] = useState(true);
  const clickHandler = () => {
    setAnimation(!animation);
  };
  return (
    <Wrapper>
      <MainBody
        onClick={clickHandler}
        justifyContent="center"
        height="101px"
        width="300px"
      >
        <Actuator animation={animation ? MoveRight(100) : MoveLeft(100)} />
      </MainBody>
    </Wrapper>
  );
};

export default Switch;

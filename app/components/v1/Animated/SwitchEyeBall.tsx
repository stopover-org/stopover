import React, { useState } from "react";
import styled, { keyframes, Keyframes } from "styled-components";
import Row from "../../Layout/Row";

const MoveRight = (width: number) => keyframes`
  0%{
   // transform: translateX(-100px);
    width: ${width}px;
  }
  50%{
    width: 100%;
  }
  100%{
   // transform: translateX(100px);
    width: ${width}px;
  }
`;

const MoveLeft = (width: number) => keyframes`
  0%{
    //transform: translateX(100px);
    width: ${width}px;
  }
  50%{
    width: calc(1.5 * ${width}px);
  }
  100%{
    //transform: translateX(-100px);
    width: ${width}px;
  }
`;

const MainBody = styled(Row)`
  //border: 1px solid;
  //background-color: blue;
  width: 300px;
  height: 101px;
  border-radius: 50px;
  position: relative;
`;

const Actuator = styled.div<{ animation: Keyframes }>`
  //transform: translateX(-100px);
  background-color: black;
  border: 1px solid;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  z-index: 3;
  animation: ${(props) => props.animation} forwards 1s ease-in-out;
`;

const SwitchEyeBall = () => {
  const [animation, setAnimation] = useState(true);
  const clickHandler = () => {
    setAnimation(!animation);
  };
  return (
    <MainBody
      onClick={clickHandler}
      height="101px"
      width="300px"
      justifyContent="end"
    >
      <Actuator animation={animation ? MoveRight(100) : MoveLeft(100)} />
    </MainBody>
  );
};

export default SwitchEyeBall;

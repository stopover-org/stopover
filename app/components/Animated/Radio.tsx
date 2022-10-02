import React from "react";
import styled, { keyframes, Keyframes } from "styled-components";

const onCheckedRadioAnimation = keyframes`
    0% {
        scale: 0;
    }
    80% {
        scale: 1.1;
    }
    100% {
        opacity: 1;
    }
`;

const onUncheckedRadioAnimation = keyframes`
    0% {
        opacity: 1;
    }

    100% {
        scale: 0;
    }
`;

const breathAnimation = keyframes`
    0% {
        
        scale: 1;
    }
    80% {
        scale: 1.2;
    }
    100% {
        opacity: 1;
    }
`;

const exhailAnimation = keyframes`
    0% {
        
        scale: 1;
    }
    80% {
        scale: 0.8;
    }
    100% {
        opacity: 1;
    }
`;

const Wrapper = styled.div`
  padding: 3px;
`;

const CustomRadio = styled.div<{ animation: Keyframes; border: string }>`
  padding: 4px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid ${(props) => props.border};
  transition: border 0.8s ease-in-out;
  animation: ${(props) => props.animation} forwards 0.8s ease-in-out;
`;

const RadioCircle = styled.div<{ animation: Keyframes }>`
  background-color: #ff8a00;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  animation: ${(props) => props.animation} forwards 0.8s ease-in-out;
`;

type Props = {
  animateOnClick: boolean;
  disabled?: boolean;
};

const Radio = ({ animateOnClick, disabled }: Props) => (
  <Wrapper>
    <CustomRadio
      border={!disabled && animateOnClick ? "#FF8A00" : "black"}
      animation={
        !disabled && animateOnClick ? breathAnimation : exhailAnimation
      }
    >
      <RadioCircle
        animation={
          !disabled && animateOnClick
            ? onCheckedRadioAnimation
            : onUncheckedRadioAnimation
        }
      />
    </CustomRadio>
  </Wrapper>
);

export default React.memo(Radio);

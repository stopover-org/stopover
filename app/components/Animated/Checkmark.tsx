import React from "react";
import styled, { keyframes, Keyframes } from "styled-components";
import Image from "next/image";
import icon from "../icons/Checkmark.svg";

const onCheckedCheckMarkAnimation = keyframes`
    0% {
        rotate: 0deg;
        scale: 0;
    }
    80% {
        scale: 1.1;
    }
    100% {
        rotate: 360deg;
        opacity: 1;
    }
`;

const onUncheckedCheckMarkAnimation = keyframes`
    0% {
        rotate: 360deg;
        opacity: 1;
    }

    100% {
        rotate: 0deg;
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

const CustomCheckbox = styled.div<{ animation: Keyframes; border: string }>`
  padding: 4px;
  width: 25px;
  height: 25px;
  border-radius: 3px;
  border: 1px solid ${(props) => props.border};
  transition: border 0.8s ease-in-out;
  animation: ${(props) => props.animation} forwards 0.8s ease-in-out;
`;

const CheckMark = styled.div<{ animation: Keyframes }>`
  width: 100%;
  height: 100%;
  animation: ${(props) => props.animation} forwards 0.8s ease-in-out;
`;

type Props = {
  animateOnClick: boolean;
  disabled?: boolean;
};

const Checkmark = ({ animateOnClick, disabled }: Props) => (
  <Wrapper>
    <CustomCheckbox
      border={!disabled && animateOnClick ? "green" : "black"}
      animation={
        !disabled && animateOnClick ? breathAnimation : exhailAnimation
      }
    >
      <CheckMark
        animation={
          !disabled && animateOnClick
            ? onCheckedCheckMarkAnimation
            : onUncheckedCheckMarkAnimation
        }
      >
        <Image width="100%" height="100%" alt="checkmark" src={icon.src} />
      </CheckMark>
    </CustomCheckbox>
  </Wrapper>
);

export default React.memo(Checkmark);

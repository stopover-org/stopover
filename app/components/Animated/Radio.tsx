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
      scale: 1.1;
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
      scale: 0.9;
  }
  100% {
      opacity: 1;
  }
`;

const CustomRadio = styled.div<{ animation: Keyframes; border: string }>`
  padding: 15%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid ${(props) => props.border};
  transition: border 0.8s ease-in-out;
  animation: ${(props) => props.animation} forwards 0.8s ease-in-out;
`;

const RadioCircle = styled.div<{
  animation: Keyframes;
  backgroundColor: string;
}>`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.backgroundColor};
  animation: ${(props) => props.animation} forwards 0.8s ease-in-out;
`;

const CustomRadioNoAnimation = styled.div<{ border: string }>`
  padding: 15%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid ${(props) => props.border};
`;

const RadioCircleNoAnimation = styled.div<{
  display: string;
  backgroundColor: string;
}>`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  display: ${(props) => props.display};
  background-color: ${(props) => props.backgroundColor};
`;

type Props = {
  animateOnClick: boolean;
  disabled?: boolean;
  animate?: boolean;
};

const Radio = ({ animateOnClick, disabled, animate }: Props) => {
  // colors used in component
  const mainColor = "#ff8a00";
  const disabledColor = "grey";

  if (disabled)
    return (
      // disable. Cant click
      <CustomRadioNoAnimation border={disabledColor}>
        <RadioCircleNoAnimation
          display={animateOnClick ? "block" : "none"}
          backgroundColor={disabledColor}
        />
      </CustomRadioNoAnimation>
    );

  if (animate)
    return (
      // animate
      <CustomRadio
        border={animateOnClick ? mainColor : "black"}
        animation={animateOnClick ? breathAnimation : exhailAnimation}
      >
        <RadioCircle
          animation={
            animateOnClick ? onCheckedRadioAnimation : onUncheckedRadioAnimation
          }
          backgroundColor={mainColor}
        />
      </CustomRadio>
    );

  return (
    // default state. No animation
    <CustomRadioNoAnimation border={animateOnClick ? mainColor : "black"}>
      <RadioCircleNoAnimation
        display={animateOnClick ? "block" : "none"}
        backgroundColor={mainColor}
      />
    </CustomRadioNoAnimation>
  );
};

export default React.memo(Radio);

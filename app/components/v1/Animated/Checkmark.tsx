import React from "react";
import styled, { keyframes, Keyframes } from "styled-components";

const onCheckedCheckMarkAnimation = keyframes`
  0%{
    opacity: 0;
    scale: 2;
  }
  30%{
    opacity: 1;
  }
  100%{
    opacity: 1;
    scale: 1;
  }
`;

const onUncheckedCheckMarkAnimation = keyframes`
  0%{
    opacity: 1;
    scale: 1;
  }
  80%{
    opacity: 0.2;
    scale: 2;
  }
  100%{
    opacity: 0;
    scale: 1.9;
  }
`;

const breathAnimation = keyframes`
  0%{
    scale: 1;
  }
  50%{
    scale: 0.8;
  }
  100%{
    scale: 1;
  }
`;

const exhailAnimation = keyframes`
  0%{
    scale: 1;
  }
  80%{
    scale: 1.2;
  }
  100%{
    scale: 1;
  }
`;

const CustomCheckbox = styled.div<{ animation: Keyframes; border: string }>`
  width: 100%;
  height: 100%;
  border-radius: 3px;
  transition: border 0.8s ease-in-out;
  animation: ${(props) => props.animation} forwards 0.8s ease-in-out;
  border: 1px solid ${(props) => props.border};
`;

const CheckMark = styled.div<{ animation: Keyframes }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2%;
  animation: ${(props) => props.animation} forwards 0.8s ease-in-out;
`;

const CustomCheckboxNoAnimation = styled.div<{ border: string }>`
  width: 100%;
  height: 100%;
  border-radius: 3px;
  border: 1px solid ${(props) => props.border};
`;

const CheckMarkNoAnimation = styled.div<{ display: string }>`
  display: ${(props) => props.display};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 22%;
`;

type Props = {
  animateOnClick?: boolean;
  disabled?: boolean;
  animate?: boolean;
};

const Checkmark = ({ animateOnClick, disabled, animate }: Props) => {
  // colors used in component
  const mainColor = "black";
  const disabledColor = "grey";
  // to controle fill property
  const icon = (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.77982 15L0 7.11538L1.65138 5L5.77982 10.7692L13.4862 0L15 2.11538L5.77982 15Z"
        // eslint-disable-next-line react/no-unknown-property
        fill={disabled ? disabledColor : mainColor}
      />
    </svg>
  );

  if (disabled)
    return (
      <CustomCheckboxNoAnimation border={disabledColor}>
        <CheckMarkNoAnimation display={animateOnClick ? "flex" : "none"}>
          {icon}
        </CheckMarkNoAnimation>
      </CustomCheckboxNoAnimation>
    );

  if (animate)
    return (
      <CustomCheckbox
        border={animateOnClick ? mainColor : "black"}
        animation={animateOnClick ? breathAnimation : exhailAnimation}
      >
        <CheckMark
          animation={
            animateOnClick
              ? onCheckedCheckMarkAnimation
              : onUncheckedCheckMarkAnimation
          }
        >
          {icon}
        </CheckMark>
      </CustomCheckbox>
    );

  return (
    <CustomCheckboxNoAnimation border={animateOnClick ? mainColor : "black"}>
      <CheckMarkNoAnimation display={animateOnClick ? "flex" : "none"}>
        {icon}
      </CheckMarkNoAnimation>
    </CustomCheckboxNoAnimation>
  );
};

export default React.memo(Checkmark);

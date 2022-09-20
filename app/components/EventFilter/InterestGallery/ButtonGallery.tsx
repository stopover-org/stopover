import React from "react";
import styled from "styled-components";
import right from "../../icons/Solid/Interface/Caret right.svg";
import left from "../../icons/Solid/Interface/Caret left.svg";

const Wrapper = styled.div<{ gradient: string }>`
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  width: 45px;
  height: inherit;
  background: linear-gradient(
    ${(props) => props.gradient},
    #ffffff 25%,
    rgba(0, 212, 255, 0) 100%
  );
  img {
    width: 32px;
    height: 32px;
  }
`;

const Circle = styled.div`
  border-radius: 50%;
  background: black;
  width: 32px;
  height: 32px;
`;

type Props = {
  buttonDirection: string;
  onClick: (buttonDirection: string) => void;
};

const ButtonGallery = (props: Props) => {
  const leftGradient = "-90deg";
  const rightGradient = "90deg";

  return (
    <Wrapper
      gradient={props.buttonDirection === "left" ? rightGradient : leftGradient}
      onClick={() => props.onClick(props.buttonDirection)}
    >
      <Circle>
        <img
          alt="придумай название"
          src={props.buttonDirection === "left" ? left.src : right.src}
        />
      </Circle>
    </Wrapper>
  );
};

export default ButtonGallery;

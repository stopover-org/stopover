import React from "react";
import styled from "styled-components";
import Image from "next/image";
import right from "../icons/Solid/Interface/Caret right.svg";
import left from "../icons/Solid/Interface/Caret left.svg";

const Wrapper = styled.div<{ gradient: string }>`
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Circle = styled.div<{ color: string; active: string }>`
  border-radius: 50%;
  background: ${(props) => props.color};
  cursor: ${(props) => props.active};
  width: 49px;
  height: 49px;
`;

type Props = {
  buttonDirection: string;
  onClick: (buttonDirection: string) => void;
  active: boolean;
};

const RightLeftButton = ({ buttonDirection, onClick, active }: Props) => {
  const leftGradient = "-90deg";

  const rightGradient = "90deg";

  return (
    <Wrapper
      gradient={buttonDirection === "left" ? rightGradient : leftGradient}
    >
      <Circle
        color={active ? "black" : "grey"}
        active={active ? "pointer" : "auto"}
        onClick={() => onClick(buttonDirection)}
      >
        <Image
          width={49}
          height={49}
          alt="arrow"
          src={buttonDirection === "left" ? left.src : right.src}
        />
      </Circle>
    </Wrapper>
  );
};

export default RightLeftButton;

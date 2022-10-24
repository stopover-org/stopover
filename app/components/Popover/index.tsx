import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";
import Row from "../Row";
import crossIcon from "../icons/Solid/Interface/Cross.svg";
import { PopoverSizes } from "../StatesEnum";

const Wrapper = styled.button`
  outline: none;
  background-color: transparent;
  border: none;
  padding: 0px;
  margin: 0px;
  &:hover {
    background-color: transparent;
    border: none;
  }
`;

const ContentWrapper = styled(Row)<{ padding: string }>`
  border-radius: 10px;
  position: relative;
  background-color: #ededed;
  padding: ${(props) => props.padding};
  cursor: pointer;
`;

// Added additional container because overfloww hidden hides popover window.
// This is parent and i can use top and left.
// In popover window i cant use it
const PopoverWindowContainer = styled.div`
  top: 70%;
  left: 0px;
  position: absolute;
`;

const PopoverWindow = styled.div<{ opacity: number; padding: string }>`
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  background: white;
  position: fixed;
  padding: ${(props) => props.padding};
  opacity: ${(props) => props.opacity};
`;

const ImageWrapper = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  overflow: hidden;
  margin-right: 7px;
  min-width: 17px;
  min-height: 17px;
  max-width: 17px;
  max-height: 17px;
`;
type Props = {
  icon?: boolean;
  children: React.ReactElement;
  component: React.ReactElement;
  isOpen: boolean;
  size?: PopoverSizes;
  onOpen: () => void;
  onClose: () => void;
};
const Popover = ({
  icon,
  children,
  component,
  isOpen,
  onOpen,
  onClose,
  size = PopoverSizes.SMALL,
}: Props) => {
  const popoverWindowRef = useRef();

  useEffect(() => {
    const handler = (event: Event) => {
      if (
        popoverWindowRef.current &&
        !popoverWindowRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <Wrapper>
      <ContentWrapper
        padding={size}
        onClick={() => {
          if (!isOpen) onOpen();
          if (isOpen) onClose();
        }}
      >
        {icon && (
          <ImageWrapper>
            <Image src={crossIcon.src} width="25px" height="25px" />
          </ImageWrapper>
        )}
        {children}
        <PopoverWindowContainer>
          <PopoverWindow
            ref={popoverWindowRef}
            padding={size}
            opacity={isOpen ? 1 : 0}
          >
            {component}
          </PopoverWindow>
        </PopoverWindowContainer>
      </ContentWrapper>
    </Wrapper>
  );
};

export default React.memo(Popover);

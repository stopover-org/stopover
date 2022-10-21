import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Row from "../Row";
import icon from "../icons/Solid/Interface/Cross.svg";
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

const PopoverWindow = styled.div<{ opacity: number }>`
  top: 70%;
  left: 0px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  background: white;
  position: absolute;
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
  children: React.ReactElement;
  component: React.ReactElement;
  isOpen: boolean;
  size?: PopoverSizes;
  onOpen: () => void;
  onClose: () => void;
};
const Popover = ({
  children,
  component,
  isOpen,
  onOpen,
  onClose,
  size = PopoverSizes.SMALL,
}: Props) => (
  <Wrapper>
    <ContentWrapper
      padding={size}
      onClick={() => {
        if (!isOpen) onOpen();
        if (isOpen) onClose();
      }}
    >
      <ImageWrapper>
        <Image src={icon.src} width="25px" height="25px" />
      </ImageWrapper>
      {children}
      <PopoverWindow opacity={isOpen ? 1 : 0}>{component}</PopoverWindow>
    </ContentWrapper>
  </Wrapper>
);

export default React.memo(Popover);

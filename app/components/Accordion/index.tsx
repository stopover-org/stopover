import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import CaretUp from "../icons/Outline/Interface/Caret_up.svg";
import Column from "../Column";
import Row from "../Row";

const Wrapper = styled(Column)``;
const Caret = styled(Image)<{ rotate: string }>`
  rotate: ${(props) => props.rotate};
  transition: rotate 0.5s ease-in-out;
`;

const Header = styled(Row)`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const Content = styled(Column)<{ animation: string }>`
  animation-duration: 0.5s;
  animation-name: ${(props) => props.animation};
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  @keyframes open {
    0% {
      max-height: 0px;
    }
    99% {
      max-height: 300px;
    }
    100% {
      max-height: auto;
    }
  }
  @keyframes close {
    0% {
      max-height: 300px;
      overflow: hidden;
    }
    99% {
      opacity: 1;
      overflow: hidden;
    }
    100% {
      max-height: 0px;
      opacity: 0;
      overflow: hidden;
    }
  }
`;

const SlideWrapper = styled.div`
  overflow: hidden;
`;

const Divider = styled.div`
  height: 0px;
  border-bottom: 1px solid black;
  width: 100%;
`;

type Props = {
  opened?: boolean;
  showChevron?: boolean;
  content: React.ReactElement;
  header: React.ReactElement;
  onOpen: () => void;
  onClose: () => void;
};

const Accordion = ({
  opened = false,
  showChevron = true,
  content,
  header,
  onOpen,
  onClose,
}: Props) => {
  const [isOpen, setIsOpen] = useState(opened);
  const clickHandler = () => {
    if (!isOpen) onOpen();
    if (isOpen) onClose();
    setIsOpen(!isOpen);
  };

  return (
    <Wrapper>
      <Header onClick={() => clickHandler()}>
        {header}
        {showChevron && (
          <Caret
            height="25px"
            width="25px"
            alt="caret"
            src={CaretUp.src}
            rotate={isOpen ? "180deg" : "0deg"}
          />
        )}
      </Header>
      <Divider />
      <SlideWrapper>
        <Content animation={isOpen ? "close" : "open"}>{content}</Content>
      </SlideWrapper>
    </Wrapper>
  );
};

export default Accordion;

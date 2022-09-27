import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import CaretUp from "../icons/Outline/Interface/Caret up.svg";
import Column from "../Column";
import Row from "../Row";

const Wrapper = styled(Column)`
  .closed {
    overflow: hidden;
    animation-duration: 0.5s;
    animation-name: close;
    animation-fill-mode: forwards;
    @keyframes close {
      0% {
        max-height: 300px;
      }
      99% {
        opacity: 1;
      }
      100% {
        max-height: 0px;
        opacity: 0;
      }
    }
  }
  .opened {
    animation-duration: 0.5s;
    animation-name: open;
    animation-fill-mode: forwards;
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
  }
`;

const Caret = styled(Image)<{ rotate: string }>`
  rotate: ${(props) => props.rotate};
  transition: rotate 0.5s ease-in-out;
`;

const Header = styled(Row)`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;
const Content = styled(Column)``;
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
        <Content className={isOpen ? "closed" : "opened"}>{content}</Content>
      </SlideWrapper>
    </Wrapper>
  );
};

export default Accordion;

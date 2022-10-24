import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import CaretUp from "../icons/Outline/Interface/Caret_up.svg";
import Column from "../Column";
import Row from "../Row";
import Typography from "../Typography";
import { TypographySize, TypographyTags } from "../StatesEnum";

const Wrapper = styled(Column)``;
const Caret = styled(Image)<{ rotate: string }>`
  rotate: ${(props) => props.rotate};
  transition: rotate 0.5s ease-in-out;
`;

const Header = styled(Row)`
  cursor: pointer;
`;

const Content = styled(Row)<{ animation: string; height?: number }>`
  animation-duration: 0.5s;
  animation-name: ${(props) => props.animation};
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  @keyframes open {
    0% {
      max-height: 0px;
    }
    100% {
      max-height: ${(props) => props.height}px;
    }
  }
  @keyframes close {
    0% {
      max-height: ${(props) => props.height}px;

      overflow: hidden;
    }
    99% {
      opacity: 1;
    }
    100% {
      max-height: 0px;
      opacity: 0;
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

const Collapse = styled(Row)`
  cursor: pointer;
`;

type Props = {
  opened?: boolean;
  showChevron?: boolean;
  showCollapse?: boolean;
  divider?: boolean;
  content: React.ReactElement;
  header: React.ReactElement;
  height?: number;
  onOpen: () => void;
  onClose: () => void;
};

const Accordion = ({
  opened = false,
  showChevron,
  showCollapse,
  divider,
  content,
  header,
  height,
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
    <Wrapper container>
      <Header alignItems="center" onClick={() => clickHandler()}>
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
      {divider && <Divider />}
      <SlideWrapper>
        <Content
          container
          alignItems="start"
          height={height}
          animation={isOpen ? "close" : "open"}
        >
          {content}
        </Content>
      </SlideWrapper>
      {showCollapse && (
        <Collapse alignItems="center" onClick={() => clickHandler()}>
          <Typography size={TypographySize.SMALL} as={TypographyTags.SMALL}>
            Свернуть
          </Typography>
          <Caret
            height="25px"
            width="25px"
            alt="caret"
            src={CaretUp.src}
            rotate={isOpen ? "180deg" : "0deg"}
          />
        </Collapse>
      )}
    </Wrapper>
  );
};

export default Accordion;

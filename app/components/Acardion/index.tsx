import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import CaretUp from "../icons/Outline/Interface/Caret up.svg";
import Column from "../Column";
import Row from "../Row";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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

const Content = styled(Column)<{ height: number }>`
  overflow: hidden;
  max-height: ${(props) => props.height}px;
  transition: all 0.5s ease-in-out;
  z-index: -9999;
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
  contentHeight?: number;
  onOpen: (text: string) => void;
  onClose: (text: string) => void;
};

const Acardion = ({
  opened = false,
  showChevron = true,
  content,
  header,
  contentHeight,
  onOpen,
  onClose,
}: Props) => {
  const [isOpen, setIsOpen] = useState(opened);
  const clickHandler = () => {
    if (!isOpen) onOpen("i am opened");
    if (isOpen) onClose("i am closed");
    setIsOpen(!isOpen);
  };

  console.log(contentHeight);
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
      <Content height={isOpen ? contentHeight : 0}>{content}</Content>
    </Wrapper>
  );
};

export default Acardion;

import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import CaretUp from "../icons/Outline/Interface/Caret up.svg";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid green;
`;

const Caret = styled(Image)<{ rotate: string }>`
  rotate: ${(props) => props.rotate};
  transition: rotate 1s ease-in-out;
`;

const Header = styled.div`
  border: 1px solid black;
  width: 100%;
  cursor: pointer;
`;

const Content = styled.div<{ opacity: number }>`
  position: absolute;
  background-color: red;
  top: 100%;
  left: 0px;
  opacity: ${(props) => props.opacity};
  transition: opacity 1s ease-in-out;
  width: 100%;
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
};

const Acardion = ({
  opened = false,
  showChevron = true,
  content,
  header,
}: Props) => {
  const [isOpen, setIsOpen] = useState(opened);

  const clickHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Wrapper>
      <Header onClick={clickHandler}>
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
      <Content opacity={+isOpen}>{content}</Content>
    </Wrapper>
  );
};

export default Acardion;

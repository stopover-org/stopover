import React from "react";
import styled from "styled-components";
import Image from "next/image";
import CaretUp from "../../icons/Outline/Interface/Caret_up.svg";
import Column from "../../Layout/Column";
import Row from "../../Layout/Row";

const Wrapper = styled(Column)``;
const Caret = styled(Image)<{ rotate: string }>`
  rotate: ${({ rotate }) => rotate};
  transition: rotate 0.5s ease-in-out;
`;

const Header = styled(Row)`
  cursor: pointer;
`;

const Content = styled(Row)<{ maxHeight: number }>`
  max-height: ${({ maxHeight }: { maxHeight: number }) => `${maxHeight}px`};
  transition: max-height 0.5s ease-in-out;
`;

const SlideWrapper = styled.div`
  overflow: hidden;
`;

const Divider = styled.div`
  height: 0px;
  border-bottom: 1px solid black;
  width: 100%;
`;

export type AccordionProps = {
  opened?: boolean;
  showChevron?: boolean;
  showDivider?: boolean;
  content: React.ReactElement;
  header: React.ReactElement;
  height?: number;
  onOpen: () => void;
  onClose: () => void;
};

const Accordion = ({
  opened = false,
  showChevron,
  showDivider,
  content,
  header,
  height = 0,
  onOpen,
  onClose,
}: AccordionProps) => {
  const clickHandler = () => {
    if (!opened) onOpen();
    if (opened) onClose();
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
            rotate={opened ? "0deg" : "180deg"}
          />
        )}
      </Header>
      {showDivider && <Divider />}
      <SlideWrapper>
        <Content container alignItems="start" maxHeight={opened ? height : 0}>
          {content}
        </Content>
      </SlideWrapper>
    </Wrapper>
  );
};

export default Accordion;

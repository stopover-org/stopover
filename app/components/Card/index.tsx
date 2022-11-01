import React from "react";
import styled from "styled-components";
import Row from "../Row";
import Column from "../Column";
import { CardImageLocation } from "../StatesEnum";

const Wrapper = styled.div``;
const SRow = styled(Row)<{ width: string; height: string; padding: string }>`
  position: relative;
  padding: ${(props) => props.padding};
  border: 1px solid #d9d9d9;
  width: ${(props) => props.width};
  min-width: ${(props) => props.width};
  max-width: ${(props) => props.width};
  height: ${(props) => props.height};
  min-height: ${(props) => props.height};
  max-height: ${(props) => props.height};
`;

const SChildren = styled.div<{ top: string; right: string }>`
  position: absolute;
  top: ${(props) => props.top};
  right: ${(props) => props.right};
`;

const SColumn = styled(Column)<{
  width?: string;
  height: string;
  padding: string;
}>`
  position: relative;
  padding: ${(props) => props.padding};
  border: 1px solid #d9d9d9;
  width: ${(props) => props.width};
  min-width: ${(props) => props.width};
  max-width: ${(props) => props.width};
  height: ${(props) => props.height};
  min-height: ${(props) => props.height};
  max-height: ${(props) => props.height};
`;
type Props = {
  imageLocation?: CardImageLocation;
  content?: React.ReactNode;
  image?: React.ReactNode;
  children?: React.ReactNode;
  width?: string;
  height?: string;
  padding?: string;
  childrenTop?: string;
  childrenRight?: string;
};

const Card = ({
  imageLocation = CardImageLocation.LEFT,
  content,
  image,
  children,
  childrenTop = "0px",
  childrenRight = "0px",
  width = "auto",
  height = "auto",
  padding = "0px",
  ...props
}: Props) => {
  const startPosition =
    imageLocation === CardImageLocation.TOP ||
    imageLocation === CardImageLocation.LEFT;

  const Tag =
    CardImageLocation.TOP || CardImageLocation.BOTTOM ? SColumn : SRow;
  const leftContent = startPosition ? image : content;
  const rightContent = startPosition ? content : image;
  const justifyContent = startPosition ? "start" : "end";
  return (
    <Wrapper {...props}>
      <Tag
        width={width}
        height={height}
        padding={padding}
        justifyContent={justifyContent}
      >
        {leftContent}
        {rightContent}
        <SChildren top={childrenTop} right={childrenRight}>
          {children}
        </SChildren>
      </Tag>
    </Wrapper>
  );
};

export default Card;

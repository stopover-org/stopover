import React from "react";
import styled from "styled-components";
import Row from "../../Layout/Row";
import Column from "../../Layout/Column";
import { CardImageLocation } from "../../StatesEnum";

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

const SColumn = styled(Column)<{
  width?: string;
  height: string;
  padding: string;
}>`
  position: relative;
  padding: ${({ padding }) => padding};
  border: 1px solid #d9d9d9;

  width: ${({ width }) => width};
  min-width: ${({ width }) => width};
  max-width: ${({ width }) => width};

  height: ${({ height }) => height};
  min-height: ${({ height }) => height};
  max-height: ${({ height }) => height};
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
  as?: string;
};

const Card = ({
  imageLocation = CardImageLocation.LEFT,
  content,
  image,
  children,
  width = "auto",
  height = "auto",
  padding = "0px",
  as = "div",
  ...props
}: Props) => {
  const startPosition =
    imageLocation === CardImageLocation.TOP ||
    imageLocation === CardImageLocation.LEFT;

  const isColumn =
    imageLocation === CardImageLocation.TOP ||
    imageLocation === CardImageLocation.BOTTOM;
  const Component = isColumn ? SColumn : SRow;
  const leftContent = startPosition ? image : content;
  const rightContent = startPosition ? content : image;
  const justifyContent = startPosition ? "start" : "end";

  return (
    <Wrapper as={as} {...props}>
      <Component
        width={width}
        height={height}
        padding={padding}
        justifyContent={justifyContent}
      >
        {leftContent}
        {rightContent}
        {children}
      </Component>
    </Wrapper>
  );
};

export default Card;

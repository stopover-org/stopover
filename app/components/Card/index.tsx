import React from "react";
import styled from "styled-components";
import Row from "../Row";
import Column from "../Column";
import { CardImageLocation } from "../StatesEnum";

const Wrapper = styled.div``;
const SRow = styled(Row)<{ width: string; height: string; padding: string }>`
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
  width?: string;
  height?: string;
  padding?: string;
};

const Card = ({
  imageLocation = CardImageLocation.LEFT,
  content,
  image,
  width = "auto",
  height = "auto",
  padding = "0px",
  ...props
}: Props) => (
  <Wrapper {...props}>
    {imageLocation === CardImageLocation.LEFT && (
      <SRow
        width={width}
        height={height}
        padding={padding}
        justifyContent="start"
      >
        {image}
        {content}
      </SRow>
    )}
    {imageLocation === CardImageLocation.RIGHT && (
      <SRow
        width={width}
        height={height}
        padding={padding}
        justifyContent="end"
      >
        {content}
        {image}
      </SRow>
    )}
    {imageLocation === CardImageLocation.TOP && (
      <SColumn
        width={width}
        height={height}
        padding={padding}
        justifyContent="start"
      >
        {image}
        {content}
      </SColumn>
    )}
    {imageLocation === CardImageLocation.BOTTOM && (
      <SColumn
        width={width}
        height={height}
        padding={padding}
        justifyContent="end"
      >
        {content}
        {image}
      </SColumn>
    )}
  </Wrapper>
);

export default Card;

import React from "react";
import styled from "styled-components";
import { TypographySize } from "./StatesEnum";

const Wrapper = styled.div``;

const TextStyle = styled.span<{
  size: string;
  textDecoration: string;
  fontWeight: string;
  fontStyle: string;
  color: string;
}>`
  display: flex;
  justify-content: center;
  font-family: "Roboto";
  font-style: ${(props) => props.fontStyle};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.size};
  text-decoration: ${(props) => props.textDecoration};
  color: ${(props) => props.color};
  line-height: 42px;
`;

type Props = {
  children: string | React.ReactElement;
  size?: TypographySize;
  strikeThrough?: boolean;
  bold?: boolean;
  italic?: boolean;
  color?: string;
};

const getTag = (size: TypographySize = TypographySize.MEDIUM) => {
  if (
    [
      TypographySize.H1,
      TypographySize.H2,
      TypographySize.H3,
      TypographySize.H4,
      TypographySize.H5,
      TypographySize.H6,
    ].includes(size)
  ) {
    return Object.keys(TypographySize)[
      Object.values(TypographySize).indexOf(size)
    ].toLocaleLowerCase();
  }
  return "span";
};

const Typography = ({
  color,
  italic,
  bold,
  strikeThrough,
  size,
  children,
}: Props) => (
  <Wrapper>
    <TextStyle
      as={getTag(size)}
      size={size || TypographySize.MEDIUM.toString()}
      textDecoration={strikeThrough ? "line-through" : "none"}
      fontWeight={bold ? "700" : "none"}
      fontStyle={italic ? "italic" : "none"}
      color={color || "black"}
    >
      {children}
    </TextStyle>
  </Wrapper>
);
export default Typography;

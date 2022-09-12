import React from "react";
import styled from "styled-components";
import { TypographySize, TypographyTags } from "./StatesEnum";

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
  as: TypographyTags;
  strikeThrough?: boolean;
  bold?: boolean;
  italic?: boolean;
  color?: string;
};

const Index = ({
  color,
  italic,
  bold,
  strikeThrough,
  size,
  children,
  as = TypographyTags.MEDIUM,
}: Props) => (
  <Wrapper>
    <TextStyle
      as={as}
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

export default Index;

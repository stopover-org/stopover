import React from "react";
import styled from "styled-components";
import { TypographySize, TypographyTags } from "../StatesEnum";

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
  line-height: 1em;
`;

type Props = {
  children: string | React.ReactElement;
  size?: TypographySize;
  as?: TypographyTags;
  fontWeight?: string;
  strikeThrough?: boolean;
  italic?: boolean;
  color?: string;
};

const Typography = ({
  color,
  italic,
  fontWeight = "100",
  strikeThrough,
  size,
  children,
  as = TypographyTags.MEDIUM,
}: Props) => (
  <TextStyle
    as={as}
    size={size || TypographySize.MEDIUM.toString()}
    textDecoration={strikeThrough ? "line-through" : "none"}
    fontWeight={fontWeight}
    fontStyle={italic ? "italic" : "none"}
    color={color || "black"}
  >
    {children}
  </TextStyle>
);

export default Typography;

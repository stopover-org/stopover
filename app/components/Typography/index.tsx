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
  text-align: justify;
  font-family: "Roboto";
  font-style: ${(props) => props.fontStyle};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.size};
  text-decoration: ${(props) => props.textDecoration};
  color: ${(props) => props.color};
  line-height: 1em;
  max-height: 195px;
  word-break: break-word;
`;

type Props = {
  children: React.ReactNode;
  color?: string;
  size?: TypographySize | string;
  as?: TypographyTags;
  fontWeight?: string;
  strikeThrough?: boolean;
  italic?: boolean;
};

const Typography = ({
  color = "inherit",
  italic,
  fontWeight = "300",
  strikeThrough,
  size,
  children,
  as = TypographyTags.MEDIUM,
  ...props
}: Props) => (
  <TextStyle
    as={as}
    size={size || TypographySize.MEDIUM.toString()}
    textDecoration={strikeThrough ? "line-through" : "none"}
    fontWeight={fontWeight}
    fontStyle={italic ? "italic" : "none"}
    color={color || "black"}
    {...props}
  >
    {children}
  </TextStyle>
);

export default Typography;

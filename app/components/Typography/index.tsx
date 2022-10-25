import React from "react";
import styled from "styled-components";
import { TypographySize, TypographyTags } from "../StatesEnum";

const TextStyle = styled.span<{
  size: string;
  textDecoration: string;
  fontWeight: string;
  fontStyle: string;
  color: string;
  underline: string;
  lineHeight?: string;
}>`
  display: flex;
  justify-content: flex-start;
  text-align: justify;
  font-family: "Roboto";
  font-style: ${(props) => props.fontStyle};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.size};
  text-decoration: ${(props) => props.textDecoration};
  text-decoration: ${(props) => props.underline};
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight || "1.2em"};
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
  underline?: boolean;
  lineHeight?: string;
};

const Typography = ({
  color = "inherit",
  italic,
  strikeThrough,
  size = TypographySize.MEDIUM,
  children,
  underline,
  as = TypographyTags.MEDIUM,
  fontWeight = "300",
  ...props
}: Props) => (
  <TextStyle
    as={as}
    size={size}
    color={color}
    fontWeight={fontWeight}
    textDecoration={strikeThrough ? "line-through" : "none"}
    fontStyle={italic ? "italic" : "none"}
    underline={underline ? "underline" : "none"}
    {...props}
  >
    {children}
  </TextStyle>
);

export default Typography;

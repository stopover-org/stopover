import React from "react";
import styled from "styled-components";
import { TypographySize, TypographyTags } from "../StatesEnum";

const TextStyle = styled.span<{
  size: string;
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
  color: ${(props) => props.color};
  line-height: ${(props) => props.lineHeight};
  max-height: 195px;
  word-break: break-word;
`;

const UnderlineStyle = styled.span<{ textDecoration: string }>`
  text-decoration: ${(props) => props.textDecoration};
`;

const SrikeThroughStyle = styled.span<{ textDecoration: string }>`
  text-decoration: ${(props) => props.textDecoration};
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
  lineHeight = "1.2em",
  ...props
}: Props) => (
  <TextStyle
    as={as}
    size={size}
    color={color}
    fontWeight={fontWeight}
    fontStyle={italic ? "italic" : "none"}
    lineHeight={lineHeight}
    {...props}
  >
    <UnderlineStyle textDecoration={strikeThrough ? "line-through" : "none"}>
      <SrikeThroughStyle textDecoration={underline ? "underline" : "none"}>
        {children}
      </SrikeThroughStyle>
    </UnderlineStyle>
  </TextStyle>
);

export default Typography;

import React from "react";
import styled from "styled-components";

const Wrapper = styled.a<{ width?: string }>`
  padding: 10px;
  border: 1px solid #d9d9d9;
  width: ${(props) => props.width || "auto"};
  display: flex;
  flex-direction: row;
`;

type Props = {
  rightToLeft?: boolean;
  content?: React.ReactElement;
  image?: React.ReactElement;
  width?: string;
};

const Card = ({ rightToLeft, content, image, width }: Props) => (
  <Wrapper width={width}>
    {rightToLeft && content}
    {!rightToLeft && image}
    {rightToLeft && image}
    {!rightToLeft && content}
  </Wrapper>
);

export default Card;

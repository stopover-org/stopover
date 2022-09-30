import React from "react";
import styled from "styled-components";

const Wrapper = styled.a<{ width?: string; padding: string }>`
  padding: ${(props) => props.padding};
  border: 1px solid #d9d9d9;
  width: ${(props) => props.width};
  min-width: ${(props) => props.width};
  max-width: ${(props) => props.width};
  display: flex;
  flex-direction: row;
`;

type Props = {
  rightToLeft?: boolean;
  content?: React.ReactNode;
  image?: React.ReactNode;
  width?: string;
  padding?: string;
};

const Card = ({
  rightToLeft,
  content,
  image,
  width = "auto",
  padding = "0px",
  ...props
}: Props) => (
  <Wrapper width={width} padding={padding} {...props}>
    {!!rightToLeft && (
      <>
        {content}
        {image}
      </>
    )}
    {!rightToLeft && (
      <>
        {image}
        {content}
      </>
    )}
  </Wrapper>
);

export default Card;

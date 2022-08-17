import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;
const ButtonStyle = styled.div``;

function Button(props: { content: string }) {
  return (
    <Wrapper>
      <ButtonStyle>{props.content}</ButtonStyle>
    </Wrapper>
  );
}

export default Button;

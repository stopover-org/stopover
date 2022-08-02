import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 10px 0px;
  input {
    width: 20px;
    height: 20px;
  }
`;

function IndividualEvents() {
  return (
    <Wrapper>
      <input type="checkbox" />
    </Wrapper>
  );
}

export default IndividualEvents;

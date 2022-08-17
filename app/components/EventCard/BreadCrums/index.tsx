import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 0px 0px 15px 0px;
`;
const Path = styled.p`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
`;

function BreadCrums() {
  return (
    <Wrapper>
      <Path>{"Home > Events > Choose Event > Event"}</Path>
    </Wrapper>
  );
}

export default BreadCrums;

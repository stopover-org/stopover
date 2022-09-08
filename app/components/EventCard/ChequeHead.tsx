import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;
const Layout = styled.div<{ color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  border-top: 1px solid ${(props) => props.color};
  border-right: 1px solid ${(props) => props.color};
  border-left: 1px solid ${(props) => props.color};
  height: 100px;
`;
const Circle = styled.div<{ color: string }>`
  border-radius: 50%;
  border: 1px solid ${(props) => props.color};
  height: 35px;
  width: 35px;
`;

const ChequeHead = ({ color }: { color: string }) => (
  <Wrapper>
    <Layout color={color}>
      <Circle color={color} />
    </Layout>
  </Wrapper>
);
export default ChequeHead;

import React from "react";
import styled from "styled-components";

const Wrapper = styled.div<{ color: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  //background-color: #c2e0fe;
  border-left: 1px solid ${(props) => props.color};
  border-right: 1px solid ${(props) => props.color};
  padding: 12px;
`;

type Props = {
  children: React.ReactElement;
  color: string;
};

const Layout = ({ children, color }: Props) => (
  <Wrapper color={color}>{children}</Wrapper>
);
export default Layout;

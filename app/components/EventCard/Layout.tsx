import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #c2e0fe;
  padding: 12px;
`;

type Props = {
  children: React.ReactElement;
};

const Layout = ({ children }: Props) => <Wrapper>{children}</Wrapper>;
export default Layout;

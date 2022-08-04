import React from "react";
import styled from "styled-components";
import Footer from "./EventCard/Footer";
import Header from "./Events/EventFilter/Header";

const Wrapper = styled.div`
  border: 1px solid red;
  width: 1600px;
  margin: auto;
`;

type Props = {
  children: React.ReactElement;
};

function Layout({ children }: Props) {
  return (
    <Wrapper>
      <Header />
      {children}
      <Footer />
    </Wrapper>
  );
}

export default Layout;

import React from "react";
import styled from "styled-components";
import Footer from "./EventCard/Footer";
import Header from "./Events/EventFilter/Header";

const Wrapper = styled.div`
  width: 1600px;
  padding: 0px 38px 0px 0px;
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

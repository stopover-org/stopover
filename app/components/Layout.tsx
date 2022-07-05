import React from "react";
import styled from "styled-components";
import Footer from "./EventCard/Footer";
import Header from "./EventFilter/Header";

const Wrapper = styled.div`
  width: 1600px;
`;

type Props = {
    children: JSX.Element,
};

function Layout({children} : Props) {

  return (
    <Wrapper>
        <Header />
        {children}
        <Footer />
    </Wrapper>
  );
}

export default Layout;
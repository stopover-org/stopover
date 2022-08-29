import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

const Wrapper = styled.div`
  max-width: 1600px;
  min-width: 1024px;
  margin: auto;
`;

type Props = {
  children: React.ReactElement;
};

function Layout({ children }: Props) {
  const [isSSR, setIsSSR] = React.useState(true);

  React.useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <Wrapper>
      <div id="galleryOfPhotoes" />
      <Header />
      {!isSSR ? children : null}
      <Footer />
    </Wrapper>
  );
}

export default Layout;

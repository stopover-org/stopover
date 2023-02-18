import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

const Wrapper = styled.div`
  width: 90%; //added by me;
  max-width: 1600px;
  min-width: 1024px;
  margin: auto;
`;

type Props = {
  children: React.ReactElement;
};

const Layout = ({ children }: Props) => {
  const [isSSR, setIsSSR] = React.useState(true);

  React.useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <Wrapper>
      <div id="gallery-portal" />
      <Header />
      {!isSSR ? children : null}
      <Footer />
    </Wrapper>
  );
};

export default Layout;

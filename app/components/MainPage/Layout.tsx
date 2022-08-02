import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1600px;
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
      <Header />
      {!isSSR ? children : null}
      <Footer />
    </Wrapper>
  );
}

export default Layout;

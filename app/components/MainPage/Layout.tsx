import React from "react";
import { Sheet } from "@mui/joy";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children: React.ReactElement;
};

const Layout = ({ children }: Props) => {
  const [isSSR, setIsSSR] = React.useState(true);

  React.useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <Sheet>
      <div id="gallery-portal" />
      <Header />
      {!isSSR ? children : null}
      <Footer />
    </Sheet>
  );
};

export default Layout;

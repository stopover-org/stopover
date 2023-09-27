import React from "react";
import { Sheet } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import Footer from "./Footer";
import Header from "./Header";
import { Layout_CurrentUserFragment$key } from "../../artifacts/Layout_CurrentUserFragment.graphql";
import GlobalSidebarProvider from "../GlobalSidebarProvider";

type LayoutProps = {
  children:
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactNode
    | React.ReactNode[];
  currentUserFragment: Layout_CurrentUserFragment$key;
  showRegisterFirm?: boolean;
};

const Layout = ({
  children,
  currentUserFragment,
  showRegisterFirm = true,
}: LayoutProps) => {
  const [isSSR, setIsSSR] = React.useState(true);

  React.useEffect(() => {
    setIsSSR(false);
  }, []);

  const currentUser = useFragment(
    graphql`
      fragment Layout_CurrentUserFragment on User {
        ...Header_CurrentUserFragment
      }
    `,
    currentUserFragment
  );

  return (
    <GlobalSidebarProvider>
      <Sheet>
        <div id="gallery-portal" />
        <Header
          currentUserFragment={currentUser}
          showRegisterFirm={showRegisterFirm}
        />
        {!isSSR ? children : null}
        <Footer />
      </Sheet>
    </GlobalSidebarProvider>
  );
};

export default Layout;

import React from "react";
import { Sheet } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import Footer from "./Footer";
import Header from "./Header";
import { Layout_CurrentUserFragment$key } from "./__generated__/Layout_CurrentUserFragment.graphql";

type LayoutProps = {
  children: React.ReactElement;
  currentUserFragment: Layout_CurrentUserFragment$key;
};

const Layout = ({ children, currentUserFragment }: LayoutProps) => {
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
    <Sheet>
      <div id="gallery-portal" />
      <Header currentUserFragment={currentUser} />
      {!isSSR ? children : null}
      <Footer />
    </Sheet>
  );
};

export default Layout;

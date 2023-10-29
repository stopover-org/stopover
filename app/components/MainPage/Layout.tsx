import React from "react";
import { Sheet } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
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
  CSN?: boolean;
};

const Layout = ({
  children,
  currentUserFragment,
  showRegisterFirm = true,
  CSN = false,
}: LayoutProps) => {
  const [isSSR, setIsSSR] = React.useState(true);

  React.useEffect(() => {
    setIsSSR(false);
  }, []);

  React.useEffect(() => {
    if (CSN) {
      window.location.reload();
    }
  }, []);

  const currentUser = useFragment(
    graphql`
      fragment Layout_CurrentUserFragment on User {
        ...Header_CurrentUserFragment
        account {
          firm {
            ...GlobalSidebarProvider_FirmFragment
          }
        }
      }
    `,
    currentUserFragment
  );
  const { i18n } = useTranslation();
  const [value] = useCookies();

  React.useEffect(() => {
    i18n.changeLanguage(value.i18next || "ru");
  }, []);

  if (CSN) {
    return null;
  }

  return (
    <GlobalSidebarProvider firmFragmentRef={currentUser.account.firm!}>
      <Sheet>
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

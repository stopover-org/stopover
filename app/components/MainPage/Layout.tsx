import React from "react";
import { Sheet } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
// @ts-ignore
import Chatra from "@chatra/chatra";
import Footer from "components/MainPage/Footer";
import Header from "components/MainPage/Header";
import GlobalSidebarProvider from "components/GlobalSidebarProvider";
import { Layout_CurrentUserFragment$key } from "artifacts/Layout_CurrentUserFragment.graphql";

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

  const chatraApiKey = process.env.NEXT_PUBLIC_CHATRA_API_KEY;

  React.useEffect(() => {
    const config = {
      ID: chatraApiKey,
    };

    Chatra("init", config);
  }, [chatraApiKey]);

  return (
    <GlobalSidebarProvider firmFragmentRef={currentUser?.account?.firm!}>
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

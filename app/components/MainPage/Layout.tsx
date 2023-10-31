import React from "react";
import { Sheet } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
// @ts-ignore
import Chatra from "@chatra/chatra";
import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";
import { Layout_CurrentUserFragment$key } from "../../artifacts/Layout_CurrentUserFragment.graphql";
import GlobalSidebarProvider from "../GlobalSidebarProvider";
import { useApiKey } from "../../lib/hooks/useApiKey";

type LayoutProps = {
  children:
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactNode
    | React.ReactNode[];
  currentUserFragment: Layout_CurrentUserFragment$key;
  showRegisterFirm?: boolean;
  CSN?: boolean;
  title?: string;
};

const Layout = ({
  children,
  currentUserFragment,
  showRegisterFirm = true,
  CSN = false,
  title,
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
  const { i18n, t } = useTranslation();
  const [value] = useCookies();

  React.useEffect(() => {
    i18n.changeLanguage(value.i18next || "ru");
  }, []);

  const chatraApiKey = useApiKey("chatraApiKey");

  React.useEffect(() => {
    const config = {
      ID: chatraApiKey,
    };

    Chatra("init", config);
  }, [chatraApiKey]);

  const titleString = React.useMemo(() => {
    if (title) return title;
    if (currentUser?.account?.firm) {
      return t("layout.metadata.firmTitle");
    }
    return t("layout.metadata.commonTitle");
  }, [currentUser]);

  if (CSN) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{titleString}</title>
      </Head>
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
    </>
  );
};

export default Layout;

import React from "react";
import { Sheet } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { useCookies } from "react-cookie";
// @ts-ignore
import Chatra from "@chatra/chatra";
import Footer from "components/MainPage/Footer";
import Header from "components/MainPage/Header";
import GlobalSidebarProvider from "components/GlobalSidebarProvider";
import { Layout_CurrentUserFragment$key } from "artifacts/Layout_CurrentUserFragment.graphql";
import ReactGA from "react-ga4";
import i18n, { changeLanguage } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { useSearchParams } from "next/navigation";
import englishTranslations from "config/locales/en";
import russianTranslations from "config/locales/ru";

type LayoutProps = {
  children:
    | React.ReactElement
    | React.ReactElement[]
    | React.ReactNode
    | React.ReactNode[];
  currentUserFragment: Layout_CurrentUserFragment$key;
  showRegisterFirm?: boolean;
};

ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID!);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: englishTranslations,
      },
      ru: {
        translation: russianTranslations,
      },
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

const Layout = ({
  children,
  currentUserFragment,
  showRegisterFirm = true,
}: LayoutProps) => {
  const currentUser = useFragment(
    graphql`
      fragment Layout_CurrentUserFragment on User {
        ...Header_CurrentUserFragment
      }
    `,
    currentUserFragment
  );
  const [value] = useCookies();
  const searchParams = useSearchParams();
  const queryLanguage = searchParams.get("language");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookieValue, setCookie] = useCookies(["i18next"]);
  const language = React.useMemo(
    () => queryLanguage || value.i18next || "en",
    [queryLanguage, value]
  );

  React.useEffect(() => {
    if (queryLanguage !== value.i18next || !value.i18next) {
      changeLanguage(language);

      setCookie("i18next", language);

      if (queryLanguage || !value.i18next) {
        window.location.reload();
      }
    }
  }, [language, changeLanguage, setCookie]);

  const chatraApiKey = process.env.NEXT_PUBLIC_CHATRA_API_KEY;

  React.useEffect(() => {
    const config = {
      ID: chatraApiKey,
    };

    Chatra("init", config);
  }, [chatraApiKey]);

  return (
    <GlobalSidebarProvider>
      <Sheet sx={{ minHeight: "calc(100vh - 150px)" }}>
        <Header
          currentUserFragment={currentUser}
          showRegisterFirm={showRegisterFirm}
        />
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </Sheet>
      <Footer />
    </GlobalSidebarProvider>
  );
};

export default Layout;

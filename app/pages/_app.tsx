import "../styles/globals.css";
import { AppProps } from "next/app";
import { RelayEnvironmentProvider } from "react-relay";
import { getInitialPreloadedQuery, getRelayProps } from "relay-nextjs/app";
import { CssVarsProvider } from "@mui/joy";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React from "react";
import { Toaster } from "sonner";
import "rc-slider/assets/index.css";
import "react-phone-input-2/lib/style.css";
import "@fontsource/public-sans";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getClientEnvironment } from "../lib/clientEnvironment";
import { theme } from "../lib/theme";
import ApiKeysProvider from "../components/ApiKeysProvider";
import englishTranslations from "../config/locales/en";
import russianTranslations from "../config/locales/ru";
import QueryProvider from "../components/QueryProvider";

const clientEnv = getClientEnvironment();
const initialPreloadedQuery = getInitialPreloadedQuery({
  createClientEnvironment: () => getClientEnvironment()!,
});

i18n.use(initReactI18next).init({
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

const MyApp = ({ Component, pageProps }: AppProps) => {
  const relayProps = getRelayProps(pageProps, initialPreloadedQuery);
  const env = relayProps.preloadedQuery?.environment ?? clientEnv!;

  return (
    <QueryProvider>
      <ApiKeysProvider>
        <Toaster richColors />
        <RelayEnvironmentProvider environment={env}>
          <CssVarsProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Component {...pageProps} {...relayProps} />
            </LocalizationProvider>
          </CssVarsProvider>
        </RelayEnvironmentProvider>
      </ApiKeysProvider>
    </QueryProvider>
  );
};

export default MyApp;

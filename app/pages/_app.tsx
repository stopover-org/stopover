import "../styles/globals.css";
import { AppProps } from "next/app";
import { RelayEnvironmentProvider } from "react-relay";
import { getInitialPreloadedQuery, getRelayProps } from "relay-nextjs/app";
import { CssVarsProvider } from "@mui/joy";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React from "react";
import { Toaster } from "sonner";
import { getClientEnvironment } from "../lib/clientEnvironment";
import "rc-slider/assets/index.css";
import "react-phone-input-2/lib/style.css";
import "@fontsource/public-sans";
import { theme } from "../lib/theme";
import ApiKeysProvider from "../components/ApiKeysProvider";

const clientEnv = getClientEnvironment();
const initialPreloadedQuery = getInitialPreloadedQuery({
  createClientEnvironment: () => getClientEnvironment()!,
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const relayProps = getRelayProps(pageProps, initialPreloadedQuery);
  const env = relayProps.preloadedQuery?.environment ?? clientEnv!;

  return (
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
  );
};

export default MyApp;

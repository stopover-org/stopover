import "../styles/globals.css";
import { AppProps } from "next/app";
import { RelayEnvironmentProvider } from "react-relay";
import { getInitialPreloadedQuery, getRelayProps } from "relay-nextjs/app";
import { CssVarsProvider } from "@mui/joy";
import { getClientEnvironment } from "../lib/clientEnvironment";
import "rc-slider/assets/index.css";
import "react-phone-input-2/lib/style.css";
import "@fontsource/public-sans";

const clientEnv = getClientEnvironment();
const initialPreloadedQuery = getInitialPreloadedQuery({
  createClientEnvironment: () => getClientEnvironment()!,
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const relayProps = getRelayProps(pageProps, initialPreloadedQuery);
  const env = relayProps.preloadedQuery?.environment ?? clientEnv!;

  return (
    <RelayEnvironmentProvider environment={env}>
      <CssVarsProvider>
        <Component {...pageProps} {...relayProps} />
      </CssVarsProvider>
    </RelayEnvironmentProvider>
  );
};

export default MyApp;

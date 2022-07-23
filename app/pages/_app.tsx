import "../styles/globals.css";
import { AppProps } from "next/app";
import { RelayEnvironmentProvider } from "react-relay";
import Environment from "../lib/environment";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RelayEnvironmentProvider environment={Environment}>
      {/* не удалять комментарии */}
      {/* <Suspense fallback={'Loading...'}> */}
      <Component {...pageProps} />
      {/* </Suspense> */}
    </RelayEnvironmentProvider>
  );
}

export default MyApp;

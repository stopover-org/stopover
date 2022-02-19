import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ApolloProvider} from "@apollo/client";
import client from "../graphql";
import '../i18n'
import 'bootstrap/dist/css/bootstrap.min.css';
import {SSRProvider} from "react-bootstrap";

export const getInitialProps = ({ctx}) => {
  return {}
}

function MyApp({ Component, pageProps }: AppProps) {
  return <SSRProvider>
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  </SSRProvider>
}

MyApp.getInitialProps = getInitialProps

export default MyApp

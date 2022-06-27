import '../styles/globals.css'
import { AppProps } from 'next/app'
import {getInitialPreloadedQuery, getRelayProps} from "relay-nextjs/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}

export default MyApp

// @ts-ignore
import {createRelayDocument, RelayDocument} from "relay-nextjs/document";
import NextDocument, {DocumentContext, Html, Head, NextScript, Main} from "next/document";

interface DocumentProps {
  relayDocument: RelayDocument;
}

class MyDocument extends NextDocument<DocumentProps> {

  render() {
    const { relayDocument } = this.props;

    return (
      <Html>
        <Head>
          <NextScript />
          <relayDocument.Script />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument
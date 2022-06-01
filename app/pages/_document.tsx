// @ts-ignore
import {createRelayDocument, RelayDocument} from "relay-nextjs/document";
import NextDocument, {DocumentContext, Html, Head, NextScript, Main} from "next/document";

interface DocumentProps {
  relayDocument: RelayDocument;
}

class MyDocument extends NextDocument<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const relayDocument = createRelayDocument();

    const renderPage = ctx.renderPage;
    ctx.renderPage = () =>
      renderPage({
        enhanceApp: (App: any) => relayDocument.enhance(App),
      });

    const initialProps = await NextDocument.getInitialProps(ctx);

    return {
      ...initialProps,
      relayDocument,
    };
  }

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
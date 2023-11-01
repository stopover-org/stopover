import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { createRelayDocument, RelayDocument } from "relay-nextjs/document";
import React from "react";
import { prepareStyles } from "../components/v2/Description/Description";
import { EditorStyles } from "../components/v2/Editor/Editor";

type DocumentProps = {
  relayDocument: RelayDocument;
};

// @ts-ignore
class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const relayDocument = createRelayDocument();
    const { renderPage } = ctx;

    ctx.renderPage = () =>
      renderPage({
        enhanceApp: (App) => relayDocument.enhance(App),
      });

    const initialProps = await Document.getInitialProps(ctx);

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
          <relayDocument.Script />

          <style>{prepareStyles(EditorStyles)}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

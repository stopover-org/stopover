import defaultMetadata from "lib/utils/defaultMetadata";
import { merge } from "lodash";
import { Metadata } from "next";
import { noindexMetadata } from "lib/utils/metadata";

export const expectedMetadata = (): Record<string, Metadata> => ({
  ru: merge({}, defaultMetadata, noindexMetadata, {
    openGraph: {
      locale: "ru",
    },
  }),
  en: merge({}, defaultMetadata, noindexMetadata, {
    openGraph: {
      locale: "en",
    },
  }),
});

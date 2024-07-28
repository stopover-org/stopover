import defaultMetadata from "lib/utils/defaultMetadata";
import { merge } from "lodash";
import { Metadata } from "next";
import { noindexMetadata } from "lib/utils/metadata";

export const expectedMetadata = (
  booking?: Record<string, any>
): Record<string, Metadata> => ({
  ru: merge({}, defaultMetadata, noindexMetadata, {
    title: booking?.seo_metadatum?.title,
    description: "", // booking?.seo_metadatum?.description,
    keywords: booking?.seo_metadatum?.keywords,
    openGraph: {
      locale: "ru",
      title: booking?.seo_metadatum?.title,
      description: "", // booking?.seo_metadatum?.description,
      keywords: booking?.seo_metadatum?.keywords,
    },
  }),
  en: merge({}, defaultMetadata, noindexMetadata, {
    title: booking?.seo_metadatum?.title,
    description: "", // booking?.seo_metadatum?.description,
    keywords: booking?.seo_metadatum?.keywords,
    openGraph: {
      locale: "en",
      title: booking?.seo_metadatum?.title,
      description: "", // booking?.seo_metadatum?.description,
      keywords: booking?.seo_metadatum?.keywords,
    },
  }),
});

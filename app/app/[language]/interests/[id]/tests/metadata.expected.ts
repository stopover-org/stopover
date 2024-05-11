import defaultMetadata from "lib/utils/defaultMetadata";
import { Metadata } from "next";
import { merge } from "lodash";

export const expectedMetadata = (
  interest: Record<string, any> | undefined
): Record<string, Metadata> => ({
  ru: merge({}, defaultMetadata, {
    title: interest?.seo_metadatum?.title,
    description: interest?.seo_metadatum?.description,
    keywords: interest?.seo_metadatum?.keywords,
    openGraph: {
      title: interest?.seo_metadatum?.title,
      description: interest?.seo_metadatum?.description,
      keywords: interest?.seo_metadatum?.keywords,
      locale: "ru",
    },
  }),
  en: merge({}, defaultMetadata, {
    title: interest?.seo_metadatum?.title,
    description: interest?.seo_metadatum?.description,
    keywords: interest?.seo_metadatum?.keywords,
    openGraph: {
      title: interest?.seo_metadatum?.title,
      description: interest?.seo_metadatum?.description,
      keywords: interest?.seo_metadatum?.keywords,
      locale: "en",
    },
  }),
});

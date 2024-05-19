import { merge } from "lodash";
import { noindexMetadata } from "lib/utils/metadata";
import defaultMetadata from "lib/utils/defaultMetadata";
import { Metadata } from "next";

export const expectedMetadata = (
  metadata?: Record<string, any>
): Record<string, Metadata> => ({
  en: merge({}, defaultMetadata, noindexMetadata, {
    title: `Analytics, Management: ${metadata?.title}`,
    description: `Analytics, Management: ${metadata?.description}`,
    keywords: `${metadata?.keywords}`,
    openGraph: {
      title: `Analytics, Management: ${metadata?.title}`,
      description: `Analytics, Management: ${metadata?.description}`,
      keywords: `${metadata?.keywords}`,
      locale: "en",
    },
  }),
  ru: merge({}, defaultMetadata, noindexMetadata, {
    title: `Аналитика, Управление: ${metadata?.title}`,
    description: `Аналитика, Управление: ${metadata?.description}`,
    keywords: `${metadata?.keywords}`,
    openGraph: {
      title: `Аналитика, Управление: ${metadata?.title}`,
      description: `Аналитика, Управление: ${metadata?.description}`,
      keywords: `${metadata?.keywords}`,
      locale: "ru",
    },
  }),
});

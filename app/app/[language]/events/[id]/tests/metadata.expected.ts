import { Metadata } from "next";
import { merge } from "lodash";
import defaultMetadata from "lib/utils/defaultMetadata";

export const eventFoundMetadata = (
  event: Record<string, any>
): Record<string, Metadata> => ({
  ru: merge({}, defaultMetadata, {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      locale: "ru",
    },
  }),
  en: merge({}, defaultMetadata, {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      locale: "en",
    },
  }),
});

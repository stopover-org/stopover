import defaultMetadata from "lib/utils/defaultMetadata";
import { merge } from "lodash";
import { Metadata } from "next";
import { noindexMetadata } from "lib/utils/metadata";

export const expectedMetadata = (): Record<string, Metadata> => ({
  en: merge({}, defaultMetadata, noindexMetadata, {
    description:
      "Explore unique cultures, magnificent attractions, and exciting events in each of the fascinating places",
    keywords: "",
    title: "Trip to ,  - ",
    openGraph: {
      description:
        "Explore unique cultures, magnificent attractions, and exciting events in each of the fascinating places",
      keywords: "",
      title: "Trip to ,  - ",
      locale: "en",
    },
  }),
  ru: merge({}, defaultMetadata, noindexMetadata, {
    description:
      "Исследуйте уникальные культуры, великолепные достопримечательности и захватывающие события в каждом из увлекательных мест",
    keywords: "",
    title: "Путешествие ",
    openGraph: {
      description:
        "Исследуйте уникальные культуры, великолепные достопримечательности и захватывающие события в каждом из увлекательных мест",
      keywords: "",
      title: "Путешествие ",
      locale: "ru",
    },
  }),
});

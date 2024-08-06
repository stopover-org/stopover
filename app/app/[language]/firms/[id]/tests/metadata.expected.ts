import { Metadata } from "next";
import { merge } from "lodash";
import defaultMetadata from "lib/utils/defaultMetadata";

export const expectedMetadata = (
  firm?: Record<string, any>
): Record<string, Metadata> => ({
  en: merge({}, defaultMetadata, {
    description: "", // firm?.description,
    openGraph: {
      description: "", // firm?.description,
      emails: [firm?.primary_email, "mikhail@stopoverx.com"],
      title: firm?.title,
      type: "profile",
      keywords: "",
      locale: "en",
    },
    keywords: "",
    title: firm?.title,
    verification: {
      other: {
        me: ["mikhail@stopoverx.com", "+381621496696"],
      },
    },
  }),
  ru: merge({}, defaultMetadata, {
    description: "", // firm?.description,
    openGraph: {
      description: "", // firm?.description,
      emails: [firm?.primary_email, "mikhail@stopoverx.com"],
      title: firm?.title,
      type: "profile",
      keywords: "",
      locale: "ru",
    },
    keywords: "",
    title: firm?.title,
    verification: {
      other: {
        me: ["mikhail@stopoverx.com", "+381621496696"],
      },
    },
  }),
});

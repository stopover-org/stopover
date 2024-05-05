import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import { merge } from "lodash";
import defaultMetadata, { translate } from "./defaultMetadata";

export type GenerateMetadataFn = (props: PageProps) => Promise<Metadata>;
export const noindexMetadata = {
  robots: {
    follow: false,
    index: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      nocache: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
export const generateCommonMetadata = async (
  translations: { title: string; description: string; keywords: string },
  getVariables: GetVariablesFn,
  props: PageProps,
  noindex: boolean = false,
  defaultValues: Record<string, any> = {},
  additionalMetadata: Partial<Metadata> = {}
): Promise<Metadata> => {
  const variables = Object.entries(
    merge({}, defaultValues, getVariables(props))
  ).reduce((acc, [key, value]) => {
    if (Array.isArray(value)) {
      acc[key] = value.join(" ");
    } else {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);
  const language = props.params.language || "en";
  const title = await translate(translations.title, variables, language);
  const description = await translate(
    translations.description,
    variables,
    language
  );
  const keywords = await translate(translations.keywords, variables, language);
  return merge(
    {},
    defaultMetadata,
    additionalMetadata,
    {
      title,
      description,
      keywords,
      openGraph: {
        locale: language,
        title,
        description,
        keywords,
      },
    },
    noindex ? noindexMetadata : {}
  );
};

export const notFoundMetadata = async (language: string): Promise<Metadata> => {
  const message = await translate("general.404", {}, language);
  return merge({}, defaultMetadata, noindexMetadata, {
    title: message,
    description: message,
    keywords: message,
    openGraph: {
      locale: language,
      title: message,
      description: message,
      keywords: message,
    },
  });
};

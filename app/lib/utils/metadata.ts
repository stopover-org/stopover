import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import { merge } from "lodash";
import defaultMetadata, { translate } from "./defaultMetadata";

export type GenerateMetadataFn = (props: PageProps) => Promise<Metadata>;
export const noindexMetadata: Record<"robots", Metadata["robots"]> = {
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
/**
 * Generates common metadata for a page.
 *
 * @param {object} translations - The translations for the title, description, and keywords.
 * @param {function} getVariables - The function to retrieve the page variables.
 * @param {object} props - The props object containing page parameters and other data.
 * @param {boolean} [noindex=false] - Flag indicating whether the page should be noindexed.
 * @param {object} [defaultValues={}] - Default values for the page variables.
 * @param {object} [additionalMetadata={}] - Additional metadata to include.
 *
 * @returns {Promise} A promise that resolves to the generated metadata.
 */
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

/**
 * Fetches the metadata for a "not found" page in the specified language.
 * @param {string} language - The language code for the metadata.
 * @returns {Promise<Metadata>} - A promise that resolves to the metadata object.
 */
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

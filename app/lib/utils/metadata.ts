import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import { merge } from "lodash";
import defaultMetadata, { translate } from "./defaultMetadata";

/**
 * Generates metadata for a given page.
 * @param {PageProps} props - The properties of the page.
 * @returns {Promise<Metadata>} A promise that resolves to the generated metadata.
 */
export type GenerateMetadataFn = (props: PageProps) => Promise<Metadata>;

/**
 * Represents the metadata for the "noindex" behavior of a web page.
 * This variable is of type `Record<"robots", Metadata["robots"]>`.
 *
 * @typedef {object} noindexMetadata
 * @property {Metadata["robots"]} robots - The robots metadata for the page.
 */
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
  /**
   * Converts the given variables into a record format.
   *
   * @param {Object} defaultValues - The default values for the variables.
   * @param {Object} props - The props object containing additional variables.
   *
   * @returns {Object} - The converted variables in record format.
   */
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
  /**
   * Translates the given title using the provided translations, variables, and language.
   *
   * @param {object} translations - The translations object containing the title translations.
   * @param {object} variables - The variables object containing any dynamic values to be replaced in the translated title.
   * @param {string} language - The language in which to translate the title.
   * @returns {Promise} A promise that resolves with the translated title string or rejects with an error.
   */
  const title = await translate(translations.title, variables, language);
  /**
   * Asynchronously translate the given description using the provided variables and language.
   *
   * @param {string} translations.description - The description to be translated.
   * @param {Object} variables - The variables used in the translation.
   * @param {string} language - The target language for the translation.
   * @returns {Promise<string>} A promise that resolves to the translated description.
   */
  const description = await translate(
    translations.description,
    variables,
    language
  );
  /**
   * Asynchronously translates the keywords using the provided translations, variables, and language.
   *
   * @param {Object} translations - The translation object containing keywords in different languages.
   * @param {Object} variables - The variables to be used for replacing placeholders in the translated keywords.
   * @param {string} language - The language code for the desired translation.
   * @returns {Promise<string>} - A promise that resolves to the translated keywords.
   */
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

export const redirectMetadata = async (
  url: string,
  language: string
): Promise<Metadata> => {
  const message = await translate("general.redirectTo", { url }, language);
  return merge({}, defaultMetadata, noindexMetadata, {
    title: message,
    description: message,
    keywords: "",
    openGraph: {
      locale: language,
      title: message,
      description: message,
      keywords: "",
    },
  });
};

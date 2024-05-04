import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { generateCommonMetadata, GenerateMetadataFn } from "lib/utils/metadata";
import { Metadata } from "next";

/**
 * The title of the sign-in page.
 *
 * @type {string}
 * @constant
 * @default "seo.auth.signIn.title"
 */
export const PAGE_TITLE = "seo.auth.signIn.title";
/**
 * @typedef {function} GetVariablesFn
 * @description Represents a function that retrieves variables.
 *
 * @returns {Object} - An object containing the variables.
 */
export const getVariables: GetVariablesFn = () => ({});
export const revalidate = 0;
/**
 * Function to generate metadata for a page.
 * @param {PageProps} props - The props object containing page information.
 * @returns {Promise<Metadata>} The generated metadata for the page.
 */
export const generateMetadata: GenerateMetadataFn = async (
  props: PageProps
): Promise<Metadata> =>
  generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.auth.signIn.description",
      keywords: "seo.auth.signIn.keywords",
    },
    getVariables,
    props,
    true
  );

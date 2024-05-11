import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import { generateCommonMetadata } from "lib/utils/metadata";

/**
 * Represents the page title.
 *
 * @constant {string}
 * @description The value of PAGE_TITLE is used as the title for the SEO firms new page.
 */
export const PAGE_TITLE = "seo.firms.new.title";
/**
 * @typedef {Function} GetVariablesFn
 * @description Function type definition for retrieving variables.
 * @returns {Object} An object containing variables.
 */
export const getVariables: GetVariablesFn = () => ({});
/**
 * Represents the revalidate flag.
 *
 * @type {number}
 * @description The revalidate flag indicates whether revalidation is required.
 *              A value of 0 indicates revalidation is not required.
 */
export const revalidate: number = 0;
/**
 * Generates metadata for a page.
 *
 * @param {PageProps} props - The page properties.
 * @returns {Promise<Metadata>} A promise that resolves to the generated metadata.
 */
export const generateMetadata = async (props: PageProps): Promise<Metadata> =>
  generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.firms.new.description",
      keywords: "seo.firms.new.keywords",
    },
    getVariables,
    props
  );

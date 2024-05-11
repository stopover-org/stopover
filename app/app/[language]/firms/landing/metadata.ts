import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import { generateCommonMetadata } from "lib/utils/metadata";

/**
 * The string constant that represents the title of the SEO firms landing page.
 *
 * @type {string}
 */
export const PAGE_TITLE: string = "seo.firms.landing.title";
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
 * Generate metadata for a page.
 * @async
 * @param {PageProps} props - The props for the page.
 * @returns {Promise<Metadata>} A promise that resolves to the generated metadata.
 */
export const generateMetadata = async (props: PageProps): Promise<Metadata> =>
  generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.firms.landing.description",
      keywords: "seo.firms.landing.keywords",
    },
    getVariables,
    props
  );

import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import {
  generateCommonMetadata,
  notFoundMetadata,
  redirectMetadata,
} from "lib/utils/metadata";
import fetchQuery from "lib/relay/fetchQuery";

/**
 * The title of the page.
 *
 * @type {string}
 * @description The PAGE_TITLE variable is a string that represents the title of the page.
 *              It is used to provide a brief indication of the content or purpose of the page.
 *              The value "seo.profile.title" indicates that the page is related to SEO profiles.
 */
export const PAGE_TITLE: string = "seo.profile.title";
/**
 * Function to get the variables.
 *
 * @typedef {Object} Variables
 * @property {object} - An object containing the variables.
 *
 * @returns {Variables} - The variables object.
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
const PageQuery = `
  query PageQuery {
    currentUser {
      status
    }
  }
`;
/**
 * Generates metadata for a given page.
 *
 * @param {PageProps} props - The props object containing page-related information.
 * @returns {Promise<Metadata>} - A Promise that resolves to the generated metadata object.
 */
export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const response = await fetchQuery(PageQuery, getVariables(props));
  if (response?.currentUser?.status !== "active") {
    return redirectMetadata(
      `${props.params.language}/auth/sign_in`,
      props.params.language
    );
  }

  return generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.profile.description",
      keywords: "seo.profile.keywords",
    },
    getVariables,
    props,
    true
  );
};

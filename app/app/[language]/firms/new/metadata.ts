import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import { generateCommonMetadata, redirectMetadata } from "lib/utils/metadata";
import fetchQuery from "lib/relay/fetchQuery";

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
const PageQuery = `
  query PageQuery {
    currentUser {
      account {
        firm {
          status
        }
      }
    }
  }
`;
/**
 * Generates metadata for a page.
 *
 * @param {PageProps} props - The page properties.
 * @returns {Promise<Metadata>} A promise that resolves to the generated metadata.
 */
export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const response = await fetchQuery(PageQuery, getVariables(props));
  if (
    ["active", "pending"].includes(response?.currentUser?.account?.firm?.status)
  ) {
    return redirectMetadata(
      `${props.params.language}/my-firm/dashboard`,
      props.params.language
    );
  }

  return generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.firms.new.description",
      keywords: "seo.firms.new.keywords",
    },
    getVariables,
    props
  );
};

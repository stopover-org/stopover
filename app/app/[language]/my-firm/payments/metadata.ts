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
 * Represents the title of the payments page for SEO purposes.
 *
 * @type {string}
 * @constant
 */
export const PAGE_TITLE: string = "seo.myFirm.payments.title";
/**
 * Function getVariables
 *
 * Returns an object containing variables.
 *
 * @returns {Object} - An object containing variables.
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
 * @param {PageProps} props - The props for the page.
 * @returns {Promise<Metadata>} The generated metadata.
 */
export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const response = await fetchQuery(PageQuery, getVariables(props));

  if (!response?.currentUser?.account?.firm) {
    return notFoundMetadata(props.params.language);
  }

  if (response?.currentUser?.account?.firm?.status === "removed") {
    return redirectMetadata(
      `${props.params.language}/firms/new`,
      props.params.language
    );
  }

  return generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.myFirm.payments.description",
      keywords: "seo.myFirm.payments.keywords",
    },
    getVariables,
    props,
    true
  );
};

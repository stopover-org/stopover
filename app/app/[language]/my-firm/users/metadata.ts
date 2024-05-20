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
 * The title of the user's page for SEO purposes.
 *
 * @type {string}
 */
export const PAGE_TITLE: string = "seo.myFirm.users.title";
/**
 * Function definition for getVariables.
 *
 * @typedef {function} GetVariablesFn
 * @return {object} - An object representing variables.
 *
 * @example
 * const variables = getVariables();
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
     serviceUser
     account {
        firm {
          status
        }
      }
    }
  }
`;
/**
 * Generates metadata for a given page.
 *
 * @param {PageProps} props - The props passed to the page.
 * @returns {Promise<Metadata>} A Promise that resolves to the generated metadata.
 *
 * @async
 * @function generateMetadata
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
      description: "seo.myFirm.users.description",
      keywords: "seo.myFirm.users.keywords",
    },
    getVariables,
    props,
    true
  );
};

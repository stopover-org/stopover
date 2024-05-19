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
 */
export const PAGE_TITLE: string = "seo.myFirm.events.title";
/**
 * A function that returns an empty object representing variables.
 * @typedef {() => Object} GetVariablesFn
 * @returns {Object} An empty object representing variables.
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
 * @param {PageProps} props - The page props.
 * @returns {Promise<Metadata>} A promise that resolves with the generated metadata.
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
      description: "seo.myFirm.events.description",
      keywords: "seo.myFirm.events.keywords",
    },
    getVariables,
    props,
    true
  );
};

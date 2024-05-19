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
 * Represents the title of a web page.
 *
 * @type {string}
 * @constant
 */
export const PAGE_TITLE: string = "seo.myFirm.events.new.title";
/**
 * An function used to retrieve variables.
 *
 * @typedef {import('./types').Variables} Variables
 * @typedef {() => Variables} GetVariablesFn
 *
 * @returns {Variables} An object containing variables.
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
 * @param {PageProps} props - The page props object.
 * @returns {Promise<Metadata>} - The generated metadata object.
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
      description: "seo.myFirm.events.new.description",
      keywords: "seo.myFirm.events.new.keywords",
    },
    getVariables,
    props,
    true
  );
};

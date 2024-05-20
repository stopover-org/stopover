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
 * The title of the web page.
 *
 * @type {string}
 */
export const PAGE_TITLE: string = "seo.myFirm.settings.title";
/**
 * @typedef {object} Variables
 * @property {any} [property] - Description of the variable property (if any)
 */
export const getVariables: GetVariablesFn = () => ({});
/**
 * Represents the revalidate flag.
 *
 * @type {number}
 * @description The revalidate flag indicates whether revalidation is required.
 *              A value of 0 indicates revalidation is not required.
 */
export const revalidate = 0;
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
 * Generate metadata for a page.
 *
 * @param {PageProps} props - The page props.
 * @returns {Promise<Metadata>} - The generated metadata.
 */
export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const response = await fetchQuery(PageQuery, getVariables(props));

  if (!response?.currentUser?.serviceUser) {
    return notFoundMetadata(props.params.language);
  }

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
      description: "seo.myFirm.settings.description",
      keywords: "seo.myFirm.settings.keywords",
    },
    getVariables,
    props,
    true
  );
};

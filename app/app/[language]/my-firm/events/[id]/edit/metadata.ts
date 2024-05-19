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
 * The page title for the ID edit page on the SEO website of myFirm.
 *
 * @type {string}
 */
export const PAGE_TITLE: string = "seo.myFirm.events.id.edit.title";
/**
 * Returns an object containing variables for a given set of props.
 *
 * @param {PageProps} props - The props object containing the necessary parameters.
 * @returns {Object} - An object containing the variables.
 */
export const getVariables: GetVariablesFn = (props: PageProps) => ({
  id: unescape(props.params.id),
});
/**
 * Represents the revalidate flag.
 *
 * @type {number}
 * @description The revalidate flag indicates whether revalidation is required.
 *              A value of 0 indicates revalidation is not required.
 */
export const revalidate: number = 0;
const PageQuery = `
  query PageQuery($id: ID!) {
   currentUser {
     account {
        firm {
          event(id: $id) {
            seoMetadatum {
              title
              description
              keywords
            }
          }
        }
      }
    }
  }
`;
/**
 * Generate metadata for a page using the provided props.
 *
 * @param {PageProps} props - The properties of the page.
 * @returns {Promise<Metadata>} - The generated metadata.
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

  const translateParams = {
    title: response?.currentUser?.account?.firm?.event?.seoMetadatum?.title,
    description:
      response?.currentUser?.account?.firm?.event?.seoMetadatum?.description,
    keywords:
      response?.currentUser?.account?.firm?.event?.seoMetadatum?.keywords,
  };

  return generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.myFirm.events.id.edit.description",
      keywords: "seo.myFirm.events.id.edit.keywords",
    },
    getVariables,
    props,
    true,
    translateParams
  );
};

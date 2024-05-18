import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import { generateCommonMetadata, notFoundMetadata } from "lib/utils/metadata";
import fetchQuery from "lib/relay/fetchQuery";

/**
 * The title of the SEO page for myFirm bookings.
 *
 * @constant {string}
 * @description The value of PAGE_TITLE is used as the title for the SEO booking page.
 */
export const PAGE_TITLE = "seo.myFirm.bookings.id.title";
/**
 * @function getVariables
 * @description This function retrieves variables based on the given parameters.
 * @param {Object} PageProps - The object containing the page properties.
 * @param {Object} PageProps.params - The object containing the page parameters.
 * @param {string} PageProps.params.id - The ID parameter.
 * @return {Object} - The object containing the retrieved variables.
 */
export const getVariables: GetVariablesFn = ({
  params,
}: PageProps): { id: string } => ({
  id: unescape(params.id),
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
          booking(id: $id) {
            event {
              seoMetadatum {
                title
                description
                keywords
                featuredImages
              }
            }
          }
        }
      }
    }
  }
`;
/**
 * Generate metadata for a given page.
 *
 * @param {PageProps} props - The properties for the page.
 * @returns {Promise<Metadata>} - The generated metadata.
 */
export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const response = await fetchQuery(PageQuery, getVariables(props));

  if (!response?.currentUser?.account?.firm?.booking) {
    return notFoundMetadata(props.params.language);
  }

  const translateParams = {
    title:
      response?.currentUser?.account?.firm?.booking?.event?.seoMetadatum?.title,
    description:
      response?.currentUser?.account?.firm?.booking?.event?.seoMetadatum
        ?.description,
    keywords:
      response?.currentUser?.account?.firm?.booking?.event?.seoMetadatum
        ?.keywords,
  };
  return generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.myFirm.bookings.id.description",
      keywords: "seo.myFirm.bookings.id.keywords",
    },
    getVariables,
    props,
    true,
    translateParams
  );
};

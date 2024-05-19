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
 * The title of the payments page for SEO purposes.
 *
 * @type {string}
 */
export const PAGE_TITLE: string = "seo.myFirm.payments.id.title";
/**
 * Retrieves variables using the provided PageProps.
 *
 * @param {PageProps} props - The props object containing the required parameters.
 * @returns {Object} - An object containing the retrieved variables.
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
          payment(id: $id) {
            booking {
              event {
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
    }
  }
`;
/**
 * Generates metadata for a page.
 * @param {PageProps} props - The page props.
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

  if (!response?.currentUser?.account?.firm?.payment) {
    return notFoundMetadata(props.params.language);
  }

  const translateParams = {
    title:
      response?.currentUser?.account?.firm?.payment?.booking?.event
        ?.seoMetadatum?.title,
    description:
      response?.currentUser?.account?.firm?.payment?.booking?.event
        ?.seoMetadatum?.description,
    keywords:
      response?.currentUser?.account?.firm?.payment?.booking?.event
        ?.seoMetadatum?.keywords,
  };
  return generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.myFirm.payments.id.description",
      keywords: "seo.myFirm.payments.id.keywords",
    },
    getVariables,
    props,
    true,
    translateParams
  );
};

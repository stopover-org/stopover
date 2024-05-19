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
 * The title of the page for a specific schedule ID in the SEO section of myFirm website.
 * The title is a string in the format "seo.myFirm.schedules.id.title".
 *
 * @type {string}
 */
export const PAGE_TITLE: string = "seo.myFirm.schedules.id.title";
/**
 * Retrieve variables from the given props object.
 *
 * @param {PageProps} props - The props object.
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
          schedule(id: $id) {
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
`;
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

  if (!response?.currentUser?.account?.firm?.schedule) {
    return notFoundMetadata(props.params.language);
  }

  const translateParams = {
    title:
      response?.currentUser?.account?.firm?.schedule?.event?.seoMetadatum
        ?.title,
    description:
      response?.currentUser?.account?.firm?.schedule?.event?.seoMetadatum
        ?.description,
    keywords:
      response?.currentUser?.account?.firm?.schedule?.event?.seoMetadatum
        ?.keywords,
  };

  return generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.myFirm.schedules.id.description",
      keywords: "seo.myFirm.schedules.id.keywords",
    },
    getVariables,
    props,
    true,
    translateParams
  );
};

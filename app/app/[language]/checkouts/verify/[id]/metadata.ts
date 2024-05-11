import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import {
  generateCommonMetadata,
  GenerateMetadataFn,
  notFoundMetadata,
} from "lib/utils/metadata";
import fetchQuery from "lib/relay/fetchQuery";
import moment from "moment";
import { Metadata } from "next";

/**
 * Holds the title of the page for SEO purposes.
 *
 * @type {string}
 * @constant
 * @default "seo.checkouts.verify.id.title"
 */
export const PAGE_TITLE: string = "seo.checkouts.verify.id.title";
/**
 * Function that retrieves variables based on provided parameters.
 *
 * @param {Object} options - The options object.
 * @param {Object} options.params - The parameters passed to the function.
 * @param {string} options.params.id - The ID of the booking.
 *
 * @returns {Object} - An object containing the retrieved variables.
 */
export const getVariables: GetVariablesFn = ({ params }) => ({
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

/**
 * Represents the GraphQL query for retrieving booking details and associated event information.
 */
const PageQuery = `
  query PageQuery($id: ID!) {
    booking(id: $id) {
      id
      bookedFor
      event {
        title
      }
    }
  }
`;
/**
 * Generates metadata for a page.
 * @param {PageProps} props - The page props.
 * @returns {Promise<Metadata>} The generated metadata.
 */
export const generateMetadata: GenerateMetadataFn = async (
  props: PageProps
): Promise<Metadata> => {
  const response = await fetchQuery(PageQuery, getVariables(props));
  const translateParams = {
    /**
     * Retrieves the title of the event from the given response object.
     *
     * @param {Object} response - The response object from which to extract the event title.
     * @returns {string|undefined} - The title of the event, or undefined if it is not found or not in the expected format.
     */
    title: response?.booking?.event?.title,
    date: moment(new Date(response?.booking?.bookedFor)).calendar(),
  };

  if (!response?.booking?.id) {
    return notFoundMetadata(props.params.language);
  }

  return generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.checkouts.verify.id.description",
      keywords: "seo.checkouts.verify.id.keywords",
    },
    getVariables,
    props,
    false,
    translateParams
  );
};

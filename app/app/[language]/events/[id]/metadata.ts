import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import fetchQuery from "lib/relay/fetchQuery";
import {
  sharedEmails,
  sharedImages,
  sharedPhones,
} from "lib/utils/defaultMetadata";
import {
  generateCommonMetadata,
  GenerateMetadataFn,
  notFoundMetadata,
} from "lib/utils/metadata";

/**
 * The title for the SEO Events ID page.
 *
 * @type {string}
 * @constant
 * @default "seo.events.id.title"
 */
export const PAGE_TITLE: string = "seo.events.id.title";
/**
 * @function getVariables
 * @description Retrieves variables based on the provided parameters.
 *
 * @param {object} options - The options object.
 * @param {object} options.params - The parameters object.
 * @param {string} options.params.id - The ID of the variable.
 *
 * @returns {object} - The variables object.
 * @property {string} id - The unescaped ID of the variable.
 */
export const getVariables: GetVariablesFn = ({ params }) => ({
  id: unescape(params.id),
});
export const revalidate = 1800;

const PageQuery = `
  query PageQuery($id: ID!) {
    event(id: $id) {
      title
      description
      images
      availableDates
      firm {
        primaryPhone
        primaryEmail
      }
      address {
        country
      }
      seoMetadatum {
        title
        description
        keywords
        language
        featuredImages
      }
    }
  }
`;
/**
 * Generates metadata for a given set of properties.
 *
 * @async
 * @function generateMetadata
 * @param {object} props - The properties for generating metadata.
 * @returns {Promise<Metadata>} - The generated metadata.
 */
export const generateMetadata: GenerateMetadataFn = async (
  props: PageProps
): Promise<Metadata> => {
  const response = await fetchQuery(PageQuery, getVariables(props));
  const translateParams = {
    title: response?.event?.seoMetadatum?.title,
    description: response?.event?.seoMetadatum?.description,
    keywords: response?.event?.seoMetadatum?.keywords,
  };

  if (!response?.event) {
    return notFoundMetadata(props.params.language);
  }

  return generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.events.id.description",
      keywords: "seo.events.id.keywords",
    },
    getVariables,
    props,
    false,
    translateParams,
    {
      openGraph: {
        phoneNumbers: [
          response?.event?.firm?.primaryPhone,
          ...sharedPhones,
        ].filter(Boolean),
        emails: [response?.event?.firm?.primaryEmail, ...sharedEmails].filter(
          Boolean
        ),
        images: [
          ...(response?.event?.seoMetadatum?.featuredImages || []),
          ...sharedImages,
        ].filter(Boolean),
        countryName: response?.event?.address?.country,
      },
    }
  );
};

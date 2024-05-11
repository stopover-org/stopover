import { Metadata } from "next";
import fetchQuery from "lib/relay/fetchQuery";
import {
  sharedEmails,
  sharedImages,
  sharedPhones,
} from "lib/utils/defaultMetadata";
import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { generateCommonMetadata, notFoundMetadata } from "lib/utils/metadata";

/**
 * The title of the SEO firm's ID page.
 *
 * @constant {string}
 * @default "seo.firms.id.title"
 */
export const PAGE_TITLE = "seo.firms.id.title";
/**
 * Gets the variables from the given PageProps and returns the unescaped value of the ID.
 *
 * @param {PageProps} props - The properties of the page.
 * @returns {{ id: string }} - The unescaped ID.
 */
export const getVariables: GetVariablesFn = ({
  params,
}: PageProps): { id: string } => ({
  /**
   * Returns the unescaped value of the given ID.
   *
   * @param {string} id - The ID to unescape.
   * @returns {string} The unescaped ID.
   */
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
    firm(id: $id) {
      title
      image
      primaryEmail
      primaryPhone
      description
      address {
        country
      }
      seoMetadatum {
        title
        description
        keywords
        featuredImages
      }
    }
  }
`;

/**
 * Generates metadata for a page.
 * @param {PageProps} props - The props object containing page data.
 * @returns {Promise<Metadata>} - A Promise that resolves to the generated metadata.
 */
export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const response = await fetchQuery(PageQuery, getVariables(props));
  const translateParams = {
    title: response?.firm?.seoMetadatum?.title,
    description: response?.firm?.seoMetadatum?.description,
    keywords: response?.firm?.seoMetadatum?.keywords,
  };

  if (!response?.firm) {
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
        type: "profile",
        phoneNumbers: [response?.firm?.primaryPhone, ...sharedPhones].filter(
          Boolean
        ),
        emails: [response?.firm?.primaryEmail, ...sharedEmails].filter(Boolean),
        images: [
          ...(response?.firm?.seoMetadatum?.featuredImages || []),
          ...sharedImages,
        ].filter(Boolean),
        countryName: response?.firm?.address?.country,
      },
    }
  );
};

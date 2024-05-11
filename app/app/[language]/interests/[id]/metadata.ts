import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import { generateCommonMetadata, notFoundMetadata } from "lib/utils/metadata";
import fetchQuery from "lib/relay/fetchQuery";

/**
 * The title of the web page.
 *
 * @constant {string}
 * @description The value of PAGE_TITLE is used as the title for the SEO interest page.
 */
export const PAGE_TITLE: string = "seo.interests.id.title";
/**
 * Function to retrieve variables.
 *
 * @param {PageProps} props - The page props object.
 * @return {{ id: string }} - The variables object containing the id.
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
    interest(id: $id) {
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
 *
 * @param {PageProps} props - The props for the page.
 * @returns {Promise<Metadata>} A promise that resolves to the generated metadata.
 */
export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const response = await fetchQuery(PageQuery, getVariables(props));
  if (!response.interest) {
    return notFoundMetadata(props.params.language);
  }
  const translateParams = {
    title: response?.interest?.seoMetadatum?.title,
    description: response?.interest?.seoMetadatum?.description,
    keywords: response?.interest?.seoMetadatum?.keywords,
  };
  return generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.interests.id.description",
      keywords: "seo.interests.id.keywords",
    },
    getVariables,
    props,
    false,
    translateParams
  );
};

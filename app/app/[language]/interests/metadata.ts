import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import { generateCommonMetadata, notFoundMetadata } from "lib/utils/metadata";
import fetchQuery from "../../../lib/relay/fetchQuery";

/**
 * Represents the page title.
 *
 * @constant {string}
 * @description The value of PAGE_TITLE is used as the title for the SEO interests page.
 */
export const PAGE_TITLE: string = "seo.interests.title";
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
      serviceUser
    }
  }
`;
/**
 * Generates metadata for a page based on the provided props.
 *
 * @param {PageProps} props - The props for the page.
 * @returns {Promise<Metadata>} - A Promise that resolves to the generated metadata.
 */
export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const response = await fetchQuery(PageQuery, getVariables(props));
  if (!response?.currentUser?.serviceUser) {
    return notFoundMetadata(props.params.language);
  }

  return generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.interests.description",
      keywords: "seo.interests.keywords",
    },
    getVariables,
    props
  );
};

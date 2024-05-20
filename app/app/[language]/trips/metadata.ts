import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import { generateCommonMetadata, redirectMetadata } from "lib/utils/metadata";
import fetchQuery from "lib/relay/fetchQuery";

/**
 * Represents the title of a web page.
 *
 * @type {string}
 * @description The PAGE_TITLE variable stores the title of the web page. It is typically used for SEO purposes,
 *              and can be set to a specific value or a localization key. In this case, it is set to the localization
 *              key "seo.trips.title".
 */
export const PAGE_TITLE: string = "seo.trips.title";
/**
 * Function to get variables.
 *
 * @typedef {function} GetVariablesFn
 * @returns {object} variables - The variables object.
 */
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
      status
    }
  }
`;
/**
 * Generates metadata for a given page.
 * @async
 * @param {PageProps} props - The props object containing page information.
 * @returns {Promise<Metadata>} - A promise that resolves to the generated metadata.
 */
export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const response = await fetchQuery(PageQuery, getVariables(props));
  if (response?.currentUser?.status === "disabled") {
    return redirectMetadata(
      `${props.params.language}/auth/sign_in`,
      props.params.language
    );
  }

  return generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.trips.description",
      keywords: "seo.trips.keywords",
    },
    getVariables,
    props,
    true
  );
};

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
import { parseValue } from "lib/hooks/useQuery";
import { SchedulesFilter } from "artifacts/SchedulesSceneFirmFragment.graphql";
import fetchQuery from "../../../../lib/relay/fetchQuery";

const filterParsers = {
  eventIds: (value: string) => parseValue(value),
  scheduledFor: (value: string) => parseValue(value),
};
/**
 * Represents the page title for the schedules section in the SEO of myFirm.
 *
 * @type {string}
 */
export const PAGE_TITLE: string = "seo.myFirm.schedules.title";
/**
 * Function to get variables from searchParams object
 *
 * @param {object} options - The options object
 * @param {object} options.searchParams - The searchParams object containing variables
 *
 * @returns {object} - The filters object containing variables
 */
export const getVariables: GetVariablesFn = ({ searchParams }) => {
  const query = Object.entries(searchParams).reduce(
    (acc: SchedulesFilter, entry: [string, any]) => {
      // @ts-ignore
      const parser = filterParsers[entry[0]];
      if (parser) {
        acc[entry[0] as keyof SchedulesFilter] = parser(entry[1]);
      }
      return acc;
    },
    {}
  );

  return { filters: query };
};
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
     account {
        firm {
          status
        }
      }
    }
  }
`;
/**
 * @function generateMetadata
 * @description Generates metadata for a page.
 * @param {PageProps} props - The page properties.
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

  return generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.myFirm.schedules.description",
      keywords: "seo.myFirm.schedules.keywords",
    },
    getVariables,
    props,
    true
  );
};

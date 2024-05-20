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
import { BookingsFilter } from "artifacts/BookingsFirmTableFirmPaginationQuery.graphql";
import fetchQuery from "lib/relay/fetchQuery";

const filterParsers = {
  contactEmail: (value: string) => parseValue(value),
  contactPhone: (value: string) => parseValue(value),
  eventIds: (value: string) => parseValue(value),
  bookedFor: (value: string) => parseValue(value),
};

/**
 * The title of the SEO page for myFirm bookings.
 *
 * @constant {string}
 * @description The value of PAGE_TITLE is used as the title for the SEO bookings page.
 */
export const PAGE_TITLE: string = "seo.myFirm.bookings.title";
/**
 * Function to extract and parse variables from PageProps
 * @param {PageProps} props - The PageProps object containing the search parameters
 * @returns {object} - An object containing the parsed booking filters
 */
export const getVariables: GetVariablesFn = (props: PageProps) => {
  const filters: Partial<BookingsFilter> = Object.entries(
    props.searchParams
  ).reduce((acc: Partial<BookingsFilter>, entry: [string, any]) => {
    // @ts-ignore
    const parser = filterParsers[entry[0]];
    if (parser) {
      acc[entry[0] as keyof BookingsFilter] = parser(entry[1]);
    }
    return acc;
  }, {});
  return { bookingFilters: filters };
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
 * Generates metadata for a page based on the provided properties.
 *
 * @param {PageProps} props - The properties of the page.
 * @returns {Promise<Metadata>} - A promise that resolves to the generated metadata.
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
      description: "seo.myFirm.bookings.description",
      keywords: "seo.myFirm.bookings.keywords",
    },
    getVariables,
    props,
    true
  );
};

import {
  GetVariablesFn,
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import { generateCommonMetadata } from "lib/utils/metadata";
import { parseValue } from "lib/hooks/useQuery";
import { BookingsFilter } from "artifacts/BookingsFirmTableFirmPaginationQuery.graphql";

const filterParsers = {
  contactEmail: (value: string) => parseValue(value),
  contactPhone: (value: string) => parseValue(value),
  eventIds: (value: string) => parseValue(value),
  bookedFor: (value: string) => parseValue(value),
};

export const PAGE_TITLE = "seo.myFirm.bookings.title";
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
export const revalidate = 0;
export const generateMetadata = async (props: PageProps): Promise<Metadata> =>
  generateCommonMetadata(
    {
      title: PAGE_TITLE,
      description: "seo.myFirm.bookings.description",
      keywords: "seo.myFirm.bookings.keywords",
    },
    getVariables,
    props,
    true
  );

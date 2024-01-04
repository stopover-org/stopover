import React from "react";
import scene_FirmBookings_QueryNode, {
  scene_FirmBookings_Query,
} from "artifacts/scene_FirmBookings_Query.graphql";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import { parseValue } from "lib/hooks/useQuery";
import { BookingsFilter } from "artifacts/BookingsFirmTableFirmPaginationQuery.graphql";
import QueryWrapper from "./query";

const filterParsers = {
  contactEmail: (value: string) => parseValue(value),
};

const Page = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const filters: BookingsFilter = React.useMemo(() => {
    const query = Object.entries(searchParams).reduce(
      (acc: BookingsFilter, entry: [string, any]) => {
        // @ts-ignore
        const parser = filterParsers[entry[0]];
        if (parser) {
          acc[entry[0] as keyof BookingsFilter] = parser(entry[1]);
        }
        return acc;
      },
      {}
    );
    return query;
  }, [searchParams]);

  const preloadedQuery = await loadSerializableQuery<
    typeof scene_FirmBookings_QueryNode,
    scene_FirmBookings_Query
  >(scene_FirmBookings_QueryNode.params, { bookingsFilter: filters });

  return (
    <QueryWrapper
      preloadedQuery={preloadedQuery}
      cookies={cookies().getAll()}
    />
  );
};

export default Page;

export const revalidate = 0;

export const generateMetadata = () => ({
  title: "Bookings",
});

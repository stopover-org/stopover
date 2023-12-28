import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import moment, { Moment } from "moment";
import query_EventsPage_QueryNode, {
  EventsFilter,
  query_EventsPage_Query,
} from "artifacts/query_EventsPage_Query.graphql";
import { parseValue } from "lib/hooks/useQuery";
import PageWrapper from "components/shared/PageWrapper";
import { cookies } from "next/headers";
import Scene from "./scene";

const filterParsers = {
  query: (value: string) => parseValue(value),
  interests: (value: string) => parseValue(value),
  minPrice: (value: string) => parseInt(value, 10),
  maxPrice: (value: string) => parseInt(value, 10),
};

const Page = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const filters: EventsFilter = React.useMemo(() => {
    const query = Object.entries(searchParams).reduce(
      (acc: EventsFilter, entry: [string, any]) => {
        // @ts-ignore
        const parser = filterParsers[entry[0]];
        if (parser) {
          acc[entry[0] as keyof EventsFilter] = parser(entry[1]);
        }
        return acc;
      },
      {}
    );

    if (searchParams.dates) {
      const dates = parseValue(searchParams.dates)
        .map((val: string) => moment(val))
        .filter((dt: Moment) => dt.isValid());

      if (dates.length === 2) {
        // eslint-disable-next-line prefer-destructuring
        query.startDate = dates[0].toISOString();

        // eslint-disable-next-line prefer-destructuring
        query.endDate = dates[1].toISOString();
      }
    }
    return query;
  }, [searchParams]);

  const preloadedQuery = await loadSerializableQuery<
    typeof query_EventsPage_QueryNode,
    query_EventsPage_Query
  >(
    query_EventsPage_QueryNode.params,
    {
      filters,
    },
    cookies().getAll()
  );

  return (
    <PageWrapper>
      <Scene preloadedQuery={preloadedQuery} />
    </PageWrapper>
  );
};

export default Page;

export const revalidate = 0;

export const generateMetadata = () => ({
  title: "Events",
});

import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import PageWrapper from "components/shared/PageWrapper";
import moment, { Moment } from "moment";
import EventsScene from "./scene";
import query_EventsPage_QueryNode, {
  EventsFilter,
  query_EventsPage_Query,
} from "../../artifacts/query_EventsPage_Query.graphql";

const filterParsers = {
  query: (value: string) => JSON.parse(value),
  interests: (value: string) => JSON.parse(value),
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
      const dates = JSON.parse(searchParams.dates)
        .map((val: string) => moment(val))
        .filter((dt: Moment) => dt.isValid);

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
  >(query_EventsPage_QueryNode.params, {
    filters,
  });

  return (
    <PageWrapper>
      <EventsScene preloadedQuery={preloadedQuery} />
    </PageWrapper>
  );
};

export default Page;

export const revalidate = 0;

export const generateMetadata = () => ({
  title: "Events",
});

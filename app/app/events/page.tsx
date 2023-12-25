import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import PageWrapper from "components/shared/PageWrapper";
import EventsScene from "./scene";
import query_EventsPage_QueryNode, {
  EventsFilter,
  query_EventsPage_Query,
} from "../../artifacts/query_EventsPage_Query.graphql";

const Page = async ({
  searchParams,
}: {
  searchParams: Record<keyof EventsFilter, string>;
}) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof query_EventsPage_QueryNode,
    query_EventsPage_Query
  >(query_EventsPage_QueryNode.params, {
    filters: Object.entries(searchParams).reduce(
      (acc: EventsFilter, entry: any) => {
        acc[entry[0] as keyof EventsFilter] = JSON.parse(entry[1]);

        return acc;
      },
      {}
    ) as EventsFilter,
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

import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import PageWrapper from "components/shared/PageWrapper";
import query_EventPage_QueryNode, {
  query_EventPage_Query,
} from "artifacts/query_EventPage_Query.graphql";
import EventScene from "./scene";

const Page = async ({ params }: { params: Record<string, string> }) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof query_EventPage_QueryNode,
    query_EventPage_Query
  >(query_EventPage_QueryNode.params, { id: unescape(params.id) });

  return (
    <PageWrapper>
      <EventScene preloadedQuery={preloadedQuery} />
    </PageWrapper>
  );
};

export default Page;

export const revalidate = 0;

export const generateMetadata = () => ({
  title: "Events",
});

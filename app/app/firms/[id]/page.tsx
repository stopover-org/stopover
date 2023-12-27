import React from "react";
import query_AttendeesFirm_QueryNode, {
  query_AttendeesFirm_Query,
} from "artifacts/query_AttendeesFirm_Query.graphql";
import PageWrapper from "components/shared/PageWrapper/PageWrapper";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import Scene from "./scene";

const Page = async ({ params }: { params: Record<string, string> }) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof query_AttendeesFirm_QueryNode,
    query_AttendeesFirm_Query
  >(query_AttendeesFirm_QueryNode.params, { id: unescape(params.id) });

  return (
    <PageWrapper>
      <Scene preloadedQuery={preloadedQuery} />
    </PageWrapper>
  );
};

export default Page;

export const revalidate = 0;

export const generateMetadata = () => ({
  title: "Firm",
});

import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import PageWrapper from "components/shared/PageWrapper";
import query_NewFirm_QueryNode, {
  query_NewFirm_Query,
} from "artifacts/query_NewFirm_Query.graphql";
import Scene from "./scene";

const Page = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof query_NewFirm_QueryNode,
    query_NewFirm_Query
  >(query_NewFirm_QueryNode.params, {});

  return (
    <PageWrapper>
      <Scene preloadedQuery={preloadedQuery} />
    </PageWrapper>
  );
};

export default Page;

export const revalidate = 0;

export const generateMetadata = () => ({
  title: "Create Firm",
});

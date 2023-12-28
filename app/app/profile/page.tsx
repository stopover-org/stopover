import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import PageWrapper from "components/shared/PageWrapper";
import query_Profile_QueryNode, {
  query_Profile_Query,
} from "artifacts/query_Profile_Query.graphql";
import { cookies } from "next/headers";
import Scene from "./scene";

const Page = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof query_Profile_QueryNode,
    query_Profile_Query
  >(query_Profile_QueryNode.params, {}, cookies().getAll());

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

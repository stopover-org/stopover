import React from "react";
import query_VerifyCheckout_QueryNode, {
  query_VerifyCheckout_Query,
} from "artifacts/query_VerifyCheckout_Query.graphql";
import PageWrapper from "components/shared/PageWrapper/PageWrapper";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import Scene from "./scene";

const Page = async ({ params }: { params: Record<string, string> }) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof query_VerifyCheckout_QueryNode,
    query_VerifyCheckout_Query
  >(
    query_VerifyCheckout_QueryNode.params,
    { id: unescape(params.id) },
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

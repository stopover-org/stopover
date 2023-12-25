import React from "react";
import SignInScene from "app/auth/sign_in/scene";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import query_SignInPage_QueryNode, {
  query_SignInPage_Query,
} from "artifacts/query_SignInPage_Query.graphql";
import PageWrapper from "components/shared/PageWrapper";

const Page = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof query_SignInPage_QueryNode,
    query_SignInPage_Query
  >(query_SignInPage_QueryNode.params, {});

  return (
    <PageWrapper>
      <SignInScene preloadedQuery={preloadedQuery} />
    </PageWrapper>
  );
};

export default Page;

export const revalidate = 0;

export const generateMetadata = () => ({
  title: "Sign In",
});

"use client";

import React from "react";
import { SerializablePreloadedQuery } from "lib/relay/loadSerializableQuery";
import SignInScene from "scenes/Auth/SignInScene";
import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { getCurrentEnvironment } from "lib/relay/environment";
import Layout from "components/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import useSerializablePreloadedQuery from "lib/relay/useSerializablePreloadedQuery";
import query_SignInPage_QueryNode, {
  query_SignInPage_Query,
} from "artifacts/query_SignInPage_Query.graphql";
import SceneWrapper from "components/shared/SceneWrapper";
import query from "./query";

const Scene = ({
  preloadedQuery,
}: {
  preloadedQuery: SerializablePreloadedQuery<
    typeof query_SignInPage_QueryNode,
    query_SignInPage_Query
  >;
}) => {
  const environment = getCurrentEnvironment();
  const queryRef: PreloadedQuery<query_SignInPage_Query> =
    useSerializablePreloadedQuery(environment, preloadedQuery);
  const { currentUser } = usePreloadedQuery(query, queryRef);

  return (
    <SceneWrapper>
      <Layout currentUserFragment={currentUser}>
        <AuthGuard
          accessible={currentUser.status === "temporary"}
          redirectTo="/"
        >
          <SignInScene />
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

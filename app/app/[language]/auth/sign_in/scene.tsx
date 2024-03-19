"use client";

import React from "react";
import SignInScene from "scenes/Auth/SignInScene";
import { graphql, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { scene_SignIn_Query } from "artifacts/scene_SignIn_Query.graphql";
import { SceneProps } from "components/shared/relay/PreloadedQueryWrapper";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import { PAGE_TITLE } from "./metadata";

export const Query = graphql`
  query scene_SignIn_Query {
    currentUser {
      ...Layout_CurrentUserFragment
      status
    }
  }
`;

const Scene = ({ queryRef }: Partial<SceneProps<scene_SignIn_Query>>) => {
  const { currentUser } = usePreloadedQuery(Query, queryRef!);

  useDocumentTitle(PAGE_TITLE);

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

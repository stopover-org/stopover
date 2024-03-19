"use client";

import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { scene_InterestsScene_Query } from "artifacts/scene_InterestsScene_Query.graphql";
import SidebarContent from "components/shared/SidebarContent/SidebarContent";
import InterestsScene from "scenes/firms/interests";
import { SceneProps } from "components/shared/relay/PreloadedQueryWrapper";

const Query = graphql`
  query scene_InterestsScene_Query {
    currentUser {
      ...Layout_CurrentUserFragment
      serviceUser
      account {
        ...SidebarContent_AccountFragment
      }
    }
    ...InterestsScene_QueryFragment
  }
`;

const Scene = ({
  queryRef,
}: Partial<SceneProps<scene_InterestsScene_Query>>) => {
  const data = usePreloadedQuery(Query, queryRef!);

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard
          accessible={Boolean(data.currentUser.serviceUser)}
          redirectTo="/firms/new"
        >
          <SidebarContent accountFragmentRef={data.currentUser.account}>
            <InterestsScene queryFragmentRef={data} />
          </SidebarContent>
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

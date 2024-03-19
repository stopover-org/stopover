"use client";

import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { scene_FirmNewEvent_Query } from "artifacts/scene_FirmNewEvent_Query.graphql";
import SidebarContent from "components/shared/SidebarContent/SidebarContent";
import CreateEventScene from "scenes/firms/events/CreateEventScene/CreateEventScene";
import { SceneProps } from "components/shared/relay/PreloadedQueryWrapper";

const Query = graphql`
  query scene_FirmNewEvent_Query {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        ...SidebarContent_AccountFragment
        firm {
          id
          ...CreateEventScene_FirmFragment
        }
      }
    }
  }
`;

const Scene = ({ queryRef }: Partial<SceneProps<scene_FirmNewEvent_Query>>) => {
  const data = usePreloadedQuery(Query, queryRef!);

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard
          accessible={Boolean(data.currentUser.account.firm?.id)}
          redirectTo="/firms/new"
        >
          <SidebarContent accountFragmentRef={data.currentUser.account}>
            <CreateEventScene
              firmFragmentRef={data.currentUser.account.firm!}
            />
          </SidebarContent>
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

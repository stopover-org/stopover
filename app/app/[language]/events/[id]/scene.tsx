"use client";

import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import EventScene from "scenes/attendees/events/EventScene";
import { scene_EventPage_Query } from "artifacts/scene_EventPage_Query.graphql";
import NotFound from "components/shared/NotFound";
import { SceneProps } from "components/shared/relay/PreloadedQueryWrapper";

export const Query = graphql`
  query scene_EventPage_Query($id: ID!) {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        ...EventScene_AccountFragment
      }
    }
    event(id: $id) {
      id
      title
      ...EventScene_EventFragment
    }
  }
`;

const Scene = ({ queryRef }: Partial<SceneProps<scene_EventPage_Query>>) => {
  const data = usePreloadedQuery(Query, queryRef!);

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard accessible={!!data.event?.id} noAccess={<NotFound />}>
          <EventScene
            eventFragmentRef={data.event!}
            accountFragmentRef={data.currentUser.account}
          />
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

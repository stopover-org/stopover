"use client";

import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { scene_Trips_Query } from "artifacts/scene_Trips_Query.graphql";
import AttendeeSidebar from "components/shared/AttendeeSidebar/AttendeeSidebar";
import TripsScene from "scenes/attendees/trips/TripsScene/TripsScene";
import { SceneProps } from "components/shared/relay/PreloadedQueryWrapper";

const Query = graphql`
  query scene_Trips_Query {
    currentUser {
      ...Layout_CurrentUserFragment
      ...AttendeeSidebar_CurrentUserFragment
      account {
        ...TripsScene_AccountFragment
      }
    }
  }
`;

const Scene = ({ queryRef }: Partial<SceneProps<scene_Trips_Query>>) => {
  const data = usePreloadedQuery(Query, queryRef!);

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard accessible>
          <AttendeeSidebar currentUserFragmentRef={data.currentUser}>
            <TripsScene accountFragmentRef={data.currentUser.account} />
          </AttendeeSidebar>
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

"use client";

import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import { scene_Trip_Query } from "artifacts/scene_Trip_Query.graphql";
import TripScene from "scenes/attendees/trips/TripScene/TripScene";
import AttendeeSidebar from "components/shared/AttendeeSidebar";
import { SceneProps } from "components/shared/relay/PreloadedQueryWrapper";

const Query = graphql`
  query scene_Trip_Query($id: ID!) {
    currentUser {
      ...Layout_CurrentUserFragment
      ...AttendeeSidebar_CurrentUserFragment
      account {
        trip(tripId: $id) {
          id
          cities
          ...TripScene_TripFragment
        }
      }
    }
  }
`;

const Scene = ({ queryRef }: Partial<SceneProps<scene_Trip_Query>>) => {
  const data = usePreloadedQuery(Query, queryRef!);
  const { t } = useTranslation();

  useDocumentTitle(
    `${t("models.trip.singular")} | ${data.currentUser.account.trip.cities.join(
      ", "
    )}`
  );

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard accessible={Boolean(data.currentUser.account.trip.id)}>
          <AttendeeSidebar currentUserFragmentRef={data.currentUser}>
            <TripScene tripFragmentRef={data.currentUser.account.trip!} />
          </AttendeeSidebar>
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

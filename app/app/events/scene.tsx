"use client";

import React from "react";
import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
import Layout from "components/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import { scene_EventsPage_Query } from "artifacts/scene_EventsPage_Query.graphql";
import SceneWrapper from "components/shared/SceneWrapper";
import EventsScene from "scenes/attendees/events/EventsScene";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";

export const Query = graphql`
  query scene_EventsPage_Query($filters: EventsFilter!) {
    currentUser {
      ...Layout_CurrentUserFragment
    }
    ...EventsScene_EventsPaginationFragment
    ...EventsScene_InterestsFragment
  }
`;

const Scene = ({
  queryRef,
}: {
  queryRef: PreloadedQuery<scene_EventsPage_Query>;
}) => {
  const data = usePreloadedQuery(Query, queryRef);
  const { t } = useTranslation();

  useDocumentTitle(t("models.event.plural"));

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard accessible>
          <React.Suspense>
            <EventsScene eventsFragmentRef={data} />
          </React.Suspense>
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

"use client";

import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import { scene_EventsPage_Query } from "artifacts/scene_EventsPage_Query.graphql";
import SceneWrapper from "components/shared/SceneWrapper";
import EventsScene from "scenes/attendees/events/EventsScene";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import { SceneProps } from "components/shared/relay/PreloadedQueryWrapper";
import { useParams } from "next/navigation";
import { getVariables, PAGE_TITLE } from "./metadata";

export const Query = graphql`
  query scene_EventsPage_Query($filters: EventsFilter!) {
    currentUser {
      ...Layout_CurrentUserFragment
    }
    ...EventsScene_EventsPaginationFragment
    ...EventsScene_InterestsFragment
  }
`;

const Scene = ({ queryRef }: Partial<SceneProps<scene_EventsPage_Query>>) => {
  const data = usePreloadedQuery(Query, queryRef!);
  const { t } = useTranslation();
  const params = useParams();

  useDocumentTitle(t(PAGE_TITLE, getVariables(params)));

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

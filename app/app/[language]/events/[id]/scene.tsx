"use client";

import React from "react";
import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import EventScene from "scenes/attendees/events/EventScene";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import { scene_EventPage_Query } from "artifacts/scene_EventPage_Query.graphql";
import NotFound from "components/shared/NotFound";

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

const Scene = ({
  queryRef,
}: {
  queryRef: PreloadedQuery<scene_EventPage_Query>;
}) => {
  const data = usePreloadedQuery(Query, queryRef);
  const { t } = useTranslation();

  useDocumentTitle(
    data.event
      ? `${t("models.event.singular")} ${data.event?.title}`
      : t("general.404")
  );

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

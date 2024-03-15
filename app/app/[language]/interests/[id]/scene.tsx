"use client";

import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import { scene_AttendeeInterest_Query } from "artifacts/scene_AttendeeInterest_Query.graphql";
import NotFound from "components/shared/NotFound/NotFound";
import InterestScene from "scenes/attendees/interests/InterestScene/InterestScene";
import { SceneProps } from "components/shared/relay/PreloadedQueryWrapper";

const Query = graphql`
  query scene_AttendeeInterest_Query($id: ID!, $filters: EventsFilter!) {
    currentUser {
      ...Layout_CurrentUserFragment
    }
    interest(id: $id) {
      id
      title
      ...InterestScene_InterestFragment
    }
    ...InterestScene_EventsPaginationFragment
  }
`;

const Scene = ({
  queryRef,
}: Partial<SceneProps<scene_AttendeeInterest_Query>>) => {
  const data = usePreloadedQuery(Query, queryRef!);
  const { t } = useTranslation();

  useDocumentTitle(data.interest?.title || t("general.404"));

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard accessible={!!data.interest?.id} noAccess={<NotFound />}>
          <InterestScene
            eventsFragmentRef={data}
            interestFragmentRef={data.interest!}
          />
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

"use client";

import React from "react";
import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
import Layout from "components/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { useTranslation } from "react-i18next";
import NotFound from "components/shared/NotFound/NotFound";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import { scene_InterestTimetable_Query } from "artifacts/scene_InterestTimetable_Query.graphql";
import moment from "moment";
import InterestTimetableScene from "scenes/attendees/interests/InterestTimetableScene";

const Query = graphql`
  query scene_InterestTimetable_Query($id: ID!, $filters: EventsFilter!) {
    currentUser {
      ...Layout_CurrentUserFragment
    }
    interest(id: $id) {
      id
      title
      preview
      ...InterestTimetableScene_InterestFragment
    }
    events(first: 999, filters: $filters) {
      ...InterestTimetableScene_EventsConnectionFragment
    }
  }
`;

const Scene = ({
  queryRef,
}: {
  queryRef: PreloadedQuery<scene_InterestTimetable_Query>;
}) => {
  const data = usePreloadedQuery(Query, queryRef);
  const { t } = useTranslation();
  const title = `${data?.interest?.title} - ${t("models.schedule.plural")}`;
  useDocumentTitle(data?.interest?.title ? title : t("general.404"));

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard accessible={!!data.interest?.id} noAccess={<NotFound />}>
          <InterestTimetableScene
            interestFragmentRef={data.interest!}
            eventsConnectionFragmentRef={data.events}
            date={moment()}
          />
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

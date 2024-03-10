"use client";

import React from "react";
import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
import Layout from "components/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { useTranslation } from "react-i18next";
import NotFound from "components/shared/NotFound/NotFound";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import { scene_DateInterestTimetable_Query } from "artifacts/scene_DateInterestTimetable_Query.graphql";
import moment from "moment";
import { useParams } from "next/navigation";
import InterestTimetableScene from "scenes/attendees/interests/InterestTimetableScene/InterestTimetableScene";

const Query = graphql`
  query scene_DateInterestTimetable_Query($id: ID!, $filters: EventsFilter!) {
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
  queryRef: PreloadedQuery<scene_DateInterestTimetable_Query>;
}) => {
  const data = usePreloadedQuery(Query, queryRef);
  const { t } = useTranslation();
  const title = `${data?.interest?.title} - ${t("models.schedule.plural")}`;
  useDocumentTitle(data?.interest?.title ? title : t("general.404"));
  const params = useParams();
  const date = moment(params.date);

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard
          accessible={!!data.interest?.id && date.isValid()}
          noAccess={<NotFound />}
        >
          <InterestTimetableScene
            interestFragmentRef={data.interest!}
            eventsConnectionFragmentRef={data.events}
            date={moment(params.date)}
          />
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

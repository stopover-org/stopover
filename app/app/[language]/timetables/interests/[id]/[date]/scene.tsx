"use client";

import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import NotFound from "components/shared/NotFound/NotFound";
import { scene_DateInterestTimetable_Query } from "artifacts/scene_DateInterestTimetable_Query.graphql";
import moment from "moment";
import { useParams } from "next/navigation";
import InterestTimetableScene from "scenes/attendees/interests/InterestTimetableScene/InterestTimetableScene";
import { urlSafeDateFormat } from "lib/utils/dates";
import { SceneProps } from "../../../../../../components/shared/relay/PreloadedQueryWrapper";

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
}: Partial<SceneProps<scene_DateInterestTimetable_Query>>) => {
  const data = usePreloadedQuery(Query, queryRef!);
  const params = useParams();
  const date = moment(params.date, urlSafeDateFormat);

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
            date={moment(params.date, urlSafeDateFormat)}
          />
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

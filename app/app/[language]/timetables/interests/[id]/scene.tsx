"use client";

import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import NotFound from "components/shared/NotFound/NotFound";
import { scene_InterestTimetable_Query } from "artifacts/scene_InterestTimetable_Query.graphql";
import moment from "moment";
import InterestTimetableScene from "scenes/attendees/interests/InterestTimetableScene";
import { SceneProps } from "components/shared/relay/PreloadedQueryWrapper";

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
}: Partial<SceneProps<scene_InterestTimetable_Query>>) => {
  const data = usePreloadedQuery(Query, queryRef!);

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

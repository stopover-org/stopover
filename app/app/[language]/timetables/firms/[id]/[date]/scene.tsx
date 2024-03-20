"use client";

import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import NotFound from "components/shared/NotFound/NotFound";
import { scene_FirmTimetable_Query } from "artifacts/scene_FirmTimetable_Query.graphql";
import FirmTimetableScene from "scenes/attendees/firms/FirmTimetableScene";
import moment from "moment";
import { useParams } from "next/navigation";
import { urlSafeDateFormat } from "lib/utils/dates";
import { SceneProps } from "components/shared/relay/PreloadedQueryWrapper";

const Query = graphql`
  query scene_DateFirmTimetable_Query($id: ID!, $filters: EventsFilter!) {
    currentUser {
      ...Layout_CurrentUserFragment
    }
    firm(id: $id) {
      ...FirmTimetableScene_FirmFragment
      id
      title
      description
      image
    }
  }
`;

const Scene = ({
  queryRef,
}: Partial<SceneProps<scene_FirmTimetable_Query>>) => {
  const data = usePreloadedQuery(Query, queryRef!);
  const params = useParams();
  const date = moment(params.date, urlSafeDateFormat);

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard
          accessible={!!data.firm?.id && date.isValid()}
          noAccess={<NotFound />}
        >
          <FirmTimetableScene
            firmFragmentRef={data.firm!}
            date={moment(params.date, urlSafeDateFormat)}
          />
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

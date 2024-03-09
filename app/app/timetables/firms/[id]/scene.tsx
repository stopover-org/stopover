"use client";

import React from "react";
import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
import Layout from "components/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { useTranslation } from "react-i18next";
import NotFound from "components/shared/NotFound/NotFound";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import { scene_FirmTimetable_Query } from "artifacts/scene_FirmTimetable_Query.graphql";
import FirmTimetableScene from "scenes/attendees/firms/FirmTimetableScene";
import moment from "moment";

const Query = graphql`
  query scene_FirmTimetable_Query($id: ID!, $filters: EventsFilter!) {
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
}: {
  queryRef: PreloadedQuery<scene_FirmTimetable_Query>;
}) => {
  const data = usePreloadedQuery(Query, queryRef);
  const { t } = useTranslation();
  const title = `${data?.firm?.title} - ${t("models.schedule.plural")}`;
  useDocumentTitle(data?.firm?.title ? title : t("general.404"));

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard accessible={!!data.firm?.id} noAccess={<NotFound />}>
          <FirmTimetableScene firmFragmentRef={data.firm!} date={moment()} />
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

"use client";

import React from "react";
import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import { scene_FirmSchedule_Query } from "artifacts/scene_FirmSchedule_Query.graphql";
import SidebarContent from "components/shared/SidebarContent/SidebarContent";
import ScheduleScene from "scenes/firms/schedules/ScheduleScene";

const Query = graphql`
  query scene_FirmSchedule_Query($id: ID!) {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        ...SidebarContent_AccountFragment
        firm {
          id
          schedule(id: $id) {
            id
            event {
              title
            }
            ...ScheduleScene_FirmScheduleFragment
          }
        }
      }
    }
  }
`;

const Scene = ({
  queryRef,
}: Partial<{
  queryRef: PreloadedQuery<scene_FirmSchedule_Query>;
}>) => {
  const data = usePreloadedQuery(Query, queryRef!);
  const { t } = useTranslation();

  useDocumentTitle(
    `${t("models.schedule.singular")} ${
      data.currentUser.account?.firm?.schedule?.event.title
    }`
  );

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard
          accessible={Boolean(data.currentUser.account.firm?.schedule?.id)}
          redirectTo="/my-firm/schedules"
        >
          <SidebarContent accountFragmentRef={data.currentUser.account}>
            <ScheduleScene
              scheduleFragmentRef={data.currentUser.account.firm!.schedule!}
            />
          </SidebarContent>
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

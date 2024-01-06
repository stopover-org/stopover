"use client";

import React from "react";
import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
import Layout from "components/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import { scene_FirmSchedules_Query } from "artifacts/scene_FirmSchedules_Query.graphql";
import SidebarContent from "components/shared/SidebarContent/SidebarContent";
import SchedulesScene from "scenes/firms/schedules/SchedulesScene/SchedulesScene";

const Query = graphql`
  query scene_FirmSchedules_Query($filters: SchedulesFilter) {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        ...SidebarContent_AccountFragment
        firm {
          id
          ...SchedulesScene_FirmFragment
        }
      }
    }
  }
`;

const Scene = ({
  queryRef,
}: {
  queryRef: PreloadedQuery<scene_FirmSchedules_Query>;
}) => {
  const data = usePreloadedQuery(Query, queryRef);
  const { t } = useTranslation();

  useDocumentTitle(`${t("models.schedule.plural")}`);

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard
          accessible={Boolean(data.currentUser.account.firm?.id)}
          redirectTo="/firms/new"
        >
          <SidebarContent accountFragmentRef={data.currentUser.account}>
            <SchedulesScene firmFragmentRef={data.currentUser.account.firm!} />
          </SidebarContent>
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

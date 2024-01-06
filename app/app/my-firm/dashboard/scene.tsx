"use client";

import React from "react";
import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
import Layout from "components/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import SidebarContent from "components/shared/SidebarContent/SidebarContent";
import DashboardScene from "scenes/firms/DashboardScene";
import { scene_Dashboard_Query } from "artifacts/scene_Dashboard_Query.graphql";

const Query = graphql`
  query scene_Dashboard_Query($bookingsFilter: BookingsFilter) {
    currentUser {
      ...Layout_CurrentUserFragment
      ...DashboardScene_CurrentUserFragment
      account {
        ...SidebarContent_AccountFragment
        firm {
          ...DashboardScene_FirmFragment
          id
        }
      }
    }
  }
`;

const Scene = ({
  queryRef,
}: {
  queryRef: PreloadedQuery<scene_Dashboard_Query>;
}) => {
  const { currentUser } = usePreloadedQuery(Query, queryRef);
  const { t } = useTranslation();

  useDocumentTitle(t("scenes.firms.dashboardScene.title"));

  return (
    <SceneWrapper>
      <Layout currentUserFragment={currentUser}>
        <AuthGuard accessible={Boolean(currentUser.account.firm?.id)}>
          <SidebarContent
            sx={{ paddingLeft: "10px" }}
            accountFragmentRef={currentUser.account}
          >
            <DashboardScene
              firmFragmentRef={currentUser.account.firm!}
              currentUserFragmentRef={currentUser}
            />
          </SidebarContent>
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

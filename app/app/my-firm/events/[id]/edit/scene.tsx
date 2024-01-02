"use client";

import React from "react";
import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
import Layout from "components/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import { scene_FirmEditEvent_Query } from "artifacts/scene_FirmEditEvent_Query.graphql";
import SidebarContent from "components/shared/SidebarContent/SidebarContent";
import EditEventScene from "scenes/firms/events/EditEventScene/EditEventScene";

const Query = graphql`
  query scene_FirmEditEvent_Query($id: ID!) {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        ...SidebarContent_AccountFragment
        firm {
          event(id: $id) {
            id
            title
            ...EditEventScene_EventFragment
          }
        }
      }
    }
  }
`;

const Scene = ({
  queryRef,
}: {
  queryRef: PreloadedQuery<scene_FirmEditEvent_Query>;
}) => {
  const data = usePreloadedQuery(Query, queryRef);
  const { t } = useTranslation();

  useDocumentTitle(
    `${t("models.event.singular")} ${
      data.currentUser.account.firm?.event?.title
    }`
  );

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard
          accessible={Boolean(data.currentUser.account.firm?.event?.id)}
        >
          <SidebarContent accountFragmentRef={data.currentUser.account}>
            <EditEventScene
              eventFragmentRef={data.currentUser.account.firm?.event!}
            />
          </SidebarContent>
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

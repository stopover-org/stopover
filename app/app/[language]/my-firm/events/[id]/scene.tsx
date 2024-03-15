"use client";

import React from "react";
import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import { scene_FirmEvent_Query } from "artifacts/scene_FirmEvent_Query.graphql";
import SidebarContent from "components/shared/SidebarContent/SidebarContent";
import EventScene from "scenes/firms/events/EventScene/EventScene";

const Query = graphql`
  query scene_FirmEvent_Query($id: ID!) {
    currentUser {
      ...Layout_CurrentUserFragment
      ...EventScene_CurrentUserFragment
      account {
        ...SidebarContent_AccountFragment
        firm {
          event(id: $id) {
            id
            title
            ...EventScene_FirmEventFragment
          }
        }
      }
    }
  }
`;

const Scene = ({
  queryRef,
}: Partial<{
  queryRef: PreloadedQuery<scene_FirmEvent_Query>;
}>) => {
  const data = usePreloadedQuery(Query, queryRef!);
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
          redirectTo="/my-firm/events"
        >
          <SidebarContent accountFragmentRef={data.currentUser.account}>
            <EventScene
              eventFragmentRef={data.currentUser.account.firm?.event!}
              currentUserFragmentRef={data.currentUser}
            />
          </SidebarContent>
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

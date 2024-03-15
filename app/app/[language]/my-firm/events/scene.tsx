"use client";

import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import { scene_FirmEvents_Query } from "artifacts/scene_FirmEvents_Query.graphql";
import SidebarContent from "components/shared/SidebarContent/SidebarContent";
import EventsScene from "scenes/firms/events/EventsScene/EventsScene";
import { SceneProps } from "components/shared/relay/PreloadedQueryWrapper";

const Query = graphql`
  query scene_FirmEvents_Query {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        ...SidebarContent_AccountFragment
        firm {
          id
          ...EventsScene_FirmFragment
        }
      }
    }
  }
`;

const Scene = ({ queryRef }: Partial<SceneProps<scene_FirmEvents_Query>>) => {
  const data = usePreloadedQuery(Query, queryRef!);
  const { t } = useTranslation();

  useDocumentTitle(`${t("models.event.plural")}`);

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard
          accessible={Boolean(data.currentUser.account.firm?.id)}
          redirectTo="/firms/new"
        >
          <SidebarContent accountFragmentRef={data.currentUser.account}>
            <EventsScene firmFragmentRef={data.currentUser.account.firm!} />
          </SidebarContent>
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

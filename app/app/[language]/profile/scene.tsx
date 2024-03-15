"use client";

import React from "react";
import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import AttendeeSidebar from "components/shared/AttendeeSidebar/AttendeeSidebar";
import ProfileScene from "scenes/attendees/ProfileScene/ProfileScene";
import { scene_Profile_Query } from "artifacts/scene_Profile_Query.graphql";

export const Query = graphql`
  query scene_Profile_Query {
    currentUser {
      ...Layout_CurrentUserFragment
      ...AttendeeSidebar_CurrentUserFragment
      status
      account {
        ...ProfileScene_AccountFragment
      }
    }
  }
`;

const Scene = ({
  queryRef,
}: Partial<{
  queryRef: PreloadedQuery<scene_Profile_Query>;
}>) => {
  const data = usePreloadedQuery(Query, queryRef!);
  const { t } = useTranslation();

  useDocumentTitle(`${t("scenes.attendees.profile.profileScene.title")}`);

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard accessible={Boolean(data.currentUser.status === "active")}>
          <AttendeeSidebar currentUserFragmentRef={data.currentUser}>
            <ProfileScene accountFragmentRef={data.currentUser.account} />
          </AttendeeSidebar>
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

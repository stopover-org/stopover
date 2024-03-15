"use client";

import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import { scene_NewFirm_Query } from "artifacts/scene_NewFirm_Query.graphql";
import SidebarContent from "components/shared/SidebarContent";
import AttendeeSidebar from "components/shared/AttendeeSidebar";
import CreateFirmScene from "scenes/firms/CreateFirmScene";
import { SceneProps } from "components/shared/relay/PreloadedQueryWrapper";

const Query = graphql`
  query scene_NewFirm_Query {
    currentUser {
      ...Layout_CurrentUserFragment
      ...AttendeeSidebar_CurrentUserFragment
      serviceUser
      status
      account {
        ...SidebarContent_AccountFragment
        id
        firm {
          id
        }
      }
    }
  }
`;

const Scene = ({ queryRef }: Partial<SceneProps<scene_NewFirm_Query>>) => {
  const data = usePreloadedQuery(Query, queryRef!);
  const { t } = useTranslation();
  // eslint-disable-next-line react/no-unstable-nested-components
  const Wrapper = ({ children }: any) =>
    data.currentUser.serviceUser ? (
      <SidebarContent
        sx={{ paddingLeft: "10px" }}
        accountFragmentRef={data.currentUser.account}
      >
        {children}
      </SidebarContent>
    ) : (
      <AttendeeSidebar currentUserFragmentRef={data.currentUser}>
        {children}
      </AttendeeSidebar>
    );

  useDocumentTitle(`${t("scenes.attendees.firms.newFirmScene.title")}`);

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard
          accessible={data.currentUser?.status === "active"}
          redirectTo="/auth/sign_in"
        >
          <AuthGuard
            accessible={
              !data.currentUser?.account?.firm?.id ||
              data.currentUser?.serviceUser
            }
            redirectTo="/my-firm/dashboard"
          >
            <Wrapper>
              <CreateFirmScene />
            </Wrapper>
          </AuthGuard>
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

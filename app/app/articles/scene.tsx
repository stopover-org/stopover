"use client";

import React from "react";
import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { useTranslation } from "react-i18next";
import { scene_ArticlesScene_Query } from "artifacts/scene_ArticlesScene_Query.graphql";
import SidebarContent from "components/shared/SidebarContent";
import ArticlesScene from "scenes/articles/ArticlesScene";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";

const Query = graphql`
  query scene_ArticlesScene_Query {
    currentUser {
      ...Layout_CurrentUserFragment
      ...AttendeeSidebar_CurrentUserFragment
      serviceUser
      status
      account {
        ...SidebarContent_AccountFragment
        id
      }
    }
    ...ArticlesScene_QueryFragment
  }
`;

const Scene = ({
  queryRef,
}: {
  queryRef: PreloadedQuery<scene_ArticlesScene_Query>;
}) => {
  const data = usePreloadedQuery(Query, queryRef);
  const { t } = useTranslation();

  useDocumentTitle(t("models.article.plural"));

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard
          accessible={data.currentUser?.status === "active"}
          redirectTo="/auth/sign_in"
        >
          <AuthGuard accessible={data.currentUser?.serviceUser}>
            <SidebarContent
              sx={{ paddingLeft: "10px" }}
              accountFragmentRef={data.currentUser.account}
            >
              <ArticlesScene queryFragmentRef={data} />
            </SidebarContent>
          </AuthGuard>
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

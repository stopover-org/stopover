"use client";

import React from "react";
import {graphql, PreloadedQuery, usePreloadedQuery} from "react-relay";
import Layout from "components/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import {useTranslation} from "react-i18next";
import {useDocumentTitle} from "lib/hooks/useDocumentTitle";
import {scene_NewArticle_Query} from "artifacts/scene_NewArticle_Query.graphql";
import SidebarContent from "components/shared/SidebarContent";
import NewArticleScene from "scenes/articles/NewArticleScene";

const Query = graphql`
    query scene_NewArticle_Query {
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
    }
`;

const Scene = ({
                 queryRef,
               }: {
  queryRef: PreloadedQuery<scene_NewArticle_Query>;
}) => {
  const data = usePreloadedQuery(Query, queryRef);
  const {t} = useTranslation();

  useDocumentTitle(`${t("scenes.articles.articlesScene.new")}`);

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard
          accessible={data.currentUser?.status === "active"}
          redirectTo="/auth/sign_in"
        >
          <AuthGuard
            accessible={data.currentUser?.serviceUser}
            redirectTo="/articles"
          >
            <SidebarContent
              sx={{paddingLeft: "10px"}}
              accountFragmentRef={data.currentUser.account}
            >
              <NewArticleScene/>
            </SidebarContent>
          </AuthGuard>
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

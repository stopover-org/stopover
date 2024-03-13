"use client";

import React from "react";
import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
import Layout from "components/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { scene_EditArticle_Query } from "artifacts/scene_EditArticle_Query.graphql";
import SidebarContent from "components/shared/SidebarContent";
import EditArticleScene from "scenes/articles/EditArticleScene";

const Query = graphql`
  query scene_EditArticle_Query($id: ID!) {
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
    article(id: $id) {
      ...EditArticleScene_ArticleFragment
      id
    }
  }
`;

const Scene = ({
  queryRef,
}: {
  queryRef: PreloadedQuery<scene_EditArticle_Query>;
}) => {
  const data = usePreloadedQuery(Query, queryRef);

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard
          accessible={data.currentUser?.status === "active"}
          redirectTo="/auth/sign_in"
        >
          <AuthGuard
            accessible={!!data.currentUser?.serviceUser && !!data.article?.id}
            redirectTo="/articles"
          >
            <SidebarContent
              sx={{ paddingLeft: "10px" }}
              accountFragmentRef={data.currentUser.account}
            >
              <EditArticleScene articleFragmentRef={data.article!} />
            </SidebarContent>
          </AuthGuard>
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

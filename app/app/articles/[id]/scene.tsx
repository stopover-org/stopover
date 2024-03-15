"use client";

import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { scene_SingleArticle_Query } from "artifacts/scene_SingleArticle_Query.graphql";
import SingleArticleScene from "scenes/articles/SingleArticleScene";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import { SceneProps } from "components/shared/relay/PreloadedQueryWrapper";

const Query = graphql`
  query scene_SingleArticle_Query($id: ID!) {
    currentUser {
      ...Layout_CurrentUserFragment
      ...AttendeeSidebar_CurrentUserFragment
      serviceUser
      status
    }
    article(id: $id) {
      id
      title
      ...SingleArticleScene_ArticleFragment
    }
  }
`;

const Scene = ({
  queryRef,
}: Partial<SceneProps<scene_SingleArticle_Query>>) => {
  const data = usePreloadedQuery(Query, queryRef!);
  const { t } = useTranslation();

  useDocumentTitle(data.article?.title || t("models.article.singular"));

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard accessible={!!data.article?.id} redirectTo="/">
          <SingleArticleScene articleFragmentRef={data.article!} />
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

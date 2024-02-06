"use client";

import Layout from "components/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import { graphql, useLazyLoadQuery } from "react-relay";
import { notFound_Query } from "artifacts/notFound_Query.graphql";
import PageWrapper from "components/shared/PageWrapper";
import SceneWrapper from "components/shared/SceneWrapper";
import { useTranslation } from "react-i18next";
import React from "react";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import NotFoundComponent from "components/shared/NotFound";

const NotFound = () => {
  const data = useLazyLoadQuery<notFound_Query>(
    graphql`
      query notFound_Query {
        currentUser {
          ...Layout_CurrentUserFragment
        }
      }
    `,
    {}
  );
  const { t } = useTranslation();

  useDocumentTitle(t("general.404"));

  return (
    <Layout currentUserFragment={data.currentUser}>
      <AuthGuard accessible>
        <NotFound />
      </AuthGuard>
    </Layout>
  );
};

export default () => (
  <PageWrapper>
    <SceneWrapper>
      <NotFoundComponent />
    </SceneWrapper>
  </PageWrapper>
);

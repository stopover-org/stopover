"use client";

import Layout from "components/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import { graphql, useLazyLoadQuery } from "react-relay";
import { notFound_Query } from "artifacts/notFound_Query.graphql";
import PageWrapper from "components/shared/PageWrapper";
import SceneWrapper from "components/shared/SceneWrapper";
import { Grid } from "@mui/joy";
import Typography from "components/v2/Typography";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import React from "react";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";

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
  const pathname = usePathname();

  useDocumentTitle(t("general.404"));

  return (
    <Layout currentUserFragment={data.currentUser}>
      <AuthGuard accessible>
        <Grid container p={2} spacing={2}>
          <Grid xs={12}>
            <Typography level="h2">
              {pathname} {t("general.404")}
            </Typography>
          </Grid>
          <Grid xs={12} maxWidth="1024px" margin="0 auto">
            <img src="/404.svg" alt="Not Found 404" />
          </Grid>
        </Grid>
      </AuthGuard>
    </Layout>
  );
};

export default () => (
  <PageWrapper>
    <SceneWrapper>
      <NotFound />
    </SceneWrapper>
  </PageWrapper>
);

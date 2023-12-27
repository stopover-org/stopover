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
  return (
    <Layout currentUserFragment={data.currentUser}>
      <AuthGuard accessible>
        <Grid container p={2} spacing={2}>
          <Grid xs={12}>
            <Typography level="h2">
              {pathname} {t("general.404")}
            </Typography>
          </Grid>
          <Grid xs={12}>
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

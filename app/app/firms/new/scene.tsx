"use client";

import React from "react";
import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
import Layout from "components/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import { scene_NewFirm_Query } from "artifacts/scene_NewFirm_Query.graphql";
import CreateFirmScene from "../../../scenes/firms/CreateFirmScene";

const Query = graphql`
  query scene_NewFirm_Query {
    currentUser {
      ...Layout_CurrentUserFragment
      status
      account {
        id
        firm {
          id
        }
      }
    }
  }
`;

const Scene = ({
  queryRef,
}: {
  queryRef: PreloadedQuery<scene_NewFirm_Query>;
}) => {
  const data = usePreloadedQuery(Query, queryRef);
  const { t } = useTranslation();

  useDocumentTitle(`${t("scenes.attendees.firms.newFirmScene.title")}`);

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard
          accessible={data.currentUser?.status === "active"}
          redirectTo="/auth/sign_in"
        >
          <AuthGuard
            accessible={!data.currentUser?.account?.firm?.id}
            redirectTo="/my-firm/dashboard"
          >
            <CreateFirmScene />
          </AuthGuard>
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

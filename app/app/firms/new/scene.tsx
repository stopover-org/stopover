"use client";

import React from "react";
import { SerializablePreloadedQuery } from "lib/relay/loadSerializableQuery";
import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { getCurrentEnvironment } from "lib/relay/environment";
import Layout from "components/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import useSerializablePreloadedQuery from "lib/relay/useSerializablePreloadedQuery";
import SceneWrapper from "components/shared/SceneWrapper";
import query_NewFirm_QueryNode, {
  query_NewFirm_Query,
} from "artifacts/query_NewFirm_Query.graphql";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import query from "./query";
import CreateFirmScene from "../../../scenes/firms/CreateFirmScene";

const Scene = ({
  preloadedQuery,
}: {
  preloadedQuery: SerializablePreloadedQuery<
    typeof query_NewFirm_QueryNode,
    query_NewFirm_Query
  >;
}) => {
  const environment = getCurrentEnvironment();
  const queryRef: PreloadedQuery<query_NewFirm_Query> =
    useSerializablePreloadedQuery(environment, preloadedQuery);
  const data = usePreloadedQuery(query, queryRef);
  const { t } = useTranslation();

  useDocumentTitle(`${t("scenes.attendees.firms.newFirmScene.title")}`);

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard accessible={!data.currentUser?.account?.firm?.id}>
          <CreateFirmScene />
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

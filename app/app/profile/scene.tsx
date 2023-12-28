"use client";

import React from "react";
import { SerializablePreloadedQuery } from "lib/relay/loadSerializableQuery";
import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { getCurrentEnvironment } from "lib/relay/environment";
import Layout from "components/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import useSerializablePreloadedQuery from "lib/relay/useSerializablePreloadedQuery";
import SceneWrapper from "components/shared/SceneWrapper";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import AttendeeSidebar from "components/shared/AttendeeSidebar/AttendeeSidebar";
import ProfileScene from "scenes/attendees/ProfileScene/ProfileScene";
import query_Profile_QueryNode, {
  query_Profile_Query,
} from "artifacts/query_Profile_Query.graphql";
import query from "./query";

const Scene = ({
  preloadedQuery,
}: {
  preloadedQuery: SerializablePreloadedQuery<
    typeof query_Profile_QueryNode,
    query_Profile_Query
  >;
}) => {
  const environment = getCurrentEnvironment();
  const queryRef: PreloadedQuery<query_Profile_Query> =
    useSerializablePreloadedQuery(environment, preloadedQuery);
  const data = usePreloadedQuery(query, queryRef);
  const { t } = useTranslation();

  useDocumentTitle(`${t("scenes.attendees.firms.newFirmScene.title")}`);

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard accessible={Boolean(data.currentUser.status === "active")}>
          <AttendeeSidebar currentUserFragmentRef={data.currentUser}>
            <ProfileScene accountFragmentRef={data.currentUser.account} />
          </AttendeeSidebar>
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

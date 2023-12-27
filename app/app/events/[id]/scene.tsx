"use client";

import React from "react";
import { SerializablePreloadedQuery } from "lib/relay/loadSerializableQuery";
import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { getCurrentEnvironment } from "lib/relay/environment";
import Layout from "components/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import useSerializablePreloadedQuery from "lib/relay/useSerializablePreloadedQuery";
import SceneWrapper from "components/shared/SceneWrapper";
import EventScene from "scenes/attendees/events/EventScene";
import query_EventPage_QueryNode, {
  query_EventPage_Query,
} from "artifacts/query_EventPage_Query.graphql";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import query from "./query";

const Scene = ({
  preloadedQuery,
}: {
  preloadedQuery: SerializablePreloadedQuery<
    typeof query_EventPage_QueryNode,
    query_EventPage_Query
  >;
}) => {
  const environment = getCurrentEnvironment();
  const queryRef: PreloadedQuery<query_EventPage_Query> =
    useSerializablePreloadedQuery(environment, preloadedQuery);
  const data = usePreloadedQuery(query, queryRef);
  const { t } = useTranslation();

  useDocumentTitle(`${t("models.event.singular")} ${data.event.title}`);

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard accessible={!!data.event.id}>
          <EventScene eventFragmentRef={data.event} />
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

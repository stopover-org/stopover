"use client";

import React from "react";
import { SerializablePreloadedQuery } from "lib/relay/loadSerializableQuery";
import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { getCurrentEnvironment } from "lib/relay/environment";
import Layout from "components/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import useSerializablePreloadedQuery from "lib/relay/useSerializablePreloadedQuery";
import query_EventsPage_QueryNode, {
  query_EventsPage_Query,
} from "artifacts/query_EventsPage_Query.graphql";
import SceneWrapper from "components/shared/SceneWrapper";
import EventsScene from "scenes/attendees/events/EventsScene";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import query from "./query";

const Scene = ({
  preloadedQuery,
}: {
  preloadedQuery: SerializablePreloadedQuery<
    typeof query_EventsPage_QueryNode,
    query_EventsPage_Query
  >;
}) => {
  const environment = getCurrentEnvironment();
  const queryRef: PreloadedQuery<query_EventsPage_Query> =
    useSerializablePreloadedQuery(environment, preloadedQuery);
  const data = usePreloadedQuery(query, queryRef);
  const { t } = useTranslation();

  useDocumentTitle(t("models.event.plural"));

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard accessible>
          <EventsScene eventsFragmentRef={data} />
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

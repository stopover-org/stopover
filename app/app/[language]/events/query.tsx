"use client";

import { PreloadedQuery, RelayEnvironmentProvider } from "react-relay";
import React from "react";
import scene_EventsPage_QueryNode, {
  scene_EventsPage_Query,
} from "artifacts/scene_EventsPage_Query.graphql";
import { getCurrentEnvironment } from "lib/relay/environment";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { SerializablePreloadedQuery } from "lib/relay/loadSerializableQuery";
import useSerializablePreloadedQuery from "lib/relay/useSerializablePreloadedQuery";
import Scene from "./scene";

const QueryWrapper = ({
  preloadedQuery,
  cookies,
}: {
  preloadedQuery: SerializablePreloadedQuery<
    typeof scene_EventsPage_QueryNode,
    scene_EventsPage_Query
  >;
  cookies: RequestCookie[];
}) => {
  const environment = getCurrentEnvironment(cookies);
  const queryRef: PreloadedQuery<scene_EventsPage_Query> =
    useSerializablePreloadedQuery(environment, preloadedQuery);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Scene queryRef={queryRef} />
    </RelayEnvironmentProvider>
  );
};

export default React.memo(QueryWrapper);

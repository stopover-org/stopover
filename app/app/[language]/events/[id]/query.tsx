"use client";

import { PreloadedQuery, RelayEnvironmentProvider } from "react-relay";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import React from "react";
import { SerializablePreloadedQuery } from "lib/relay/loadSerializableQuery";
import scene_EventPage_QueryNode, {
  scene_EventPage_Query,
} from "artifacts/scene_EventPage_Query.graphql";
import { getCurrentEnvironment } from "lib/relay/environment";
import useSerializablePreloadedQuery from "lib/relay/useSerializablePreloadedQuery";
import Scene from "./scene";

const QueryWrapper = ({
  preloadedQuery,
  cookies,
}: {
  preloadedQuery: SerializablePreloadedQuery<
    typeof scene_EventPage_QueryNode,
    scene_EventPage_Query
  >;
  cookies: RequestCookie[];
}) => {
  const environment = getCurrentEnvironment(cookies);
  const queryRef: PreloadedQuery<scene_EventPage_Query> =
    useSerializablePreloadedQuery(environment, preloadedQuery);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Scene queryRef={queryRef} />
    </RelayEnvironmentProvider>
  );
};

export default React.memo(QueryWrapper);

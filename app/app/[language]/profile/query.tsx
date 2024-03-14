"use client";

import { PreloadedQuery, RelayEnvironmentProvider } from "react-relay";
import React from "react";
import scene_Profile_QueryNode, {
  scene_Profile_Query,
} from "artifacts/scene_Profile_Query.graphql";
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
    typeof scene_Profile_QueryNode,
    scene_Profile_Query
  >;
  cookies: RequestCookie[];
}) => {
  const environment = getCurrentEnvironment(cookies);
  const queryRef: PreloadedQuery<scene_Profile_Query> =
    useSerializablePreloadedQuery(environment, preloadedQuery);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Scene queryRef={queryRef} />
    </RelayEnvironmentProvider>
  );
};

export default React.memo(QueryWrapper);

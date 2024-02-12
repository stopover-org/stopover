"use client";

import { PreloadedQuery, RelayEnvironmentProvider } from "react-relay";
import scene_FirmSettings_QueryNode, {
  scene_FirmSettings_Query,
} from "artifacts/scene_FirmSettings_Query.graphql";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { getCurrentEnvironment } from "lib/relay/environment";
import useSerializablePreloadedQuery from "lib/relay/useSerializablePreloadedQuery";
import React from "react";
import { SerializablePreloadedQuery } from "lib/relay/loadSerializableQuery";
import Scene from "./scene";

const QueryWrapper = ({
  preloadedQuery,
  cookies,
}: {
  preloadedQuery: SerializablePreloadedQuery<
    typeof scene_FirmSettings_QueryNode,
    scene_FirmSettings_Query
  >;
  cookies: RequestCookie[];
}) => {
  const environment = getCurrentEnvironment(cookies);
  const queryRef: PreloadedQuery<scene_FirmSettings_Query> =
    useSerializablePreloadedQuery(environment, preloadedQuery);

  return (
    <RelayEnvironmentProvider environment={environment}>
      <Scene queryRef={queryRef} />
    </RelayEnvironmentProvider>
  );
};

export default React.memo(QueryWrapper);

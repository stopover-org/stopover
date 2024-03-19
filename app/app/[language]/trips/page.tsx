import React from "react";
import scene_Trips_QueryNode, {
  scene_Trips_Query,
} from "artifacts/scene_Trips_Query.graphql";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import PreloadedQueryWrapper, {
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import Scene from "./scene";
import { getVariables } from "./metadata";

const Page = async (props: PageProps) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_Trips_QueryNode,
    scene_Trips_Query
  >(scene_Trips_QueryNode.params, getVariables<scene_Trips_Query>(props));

  return (
    <PreloadedQueryWrapper
      preloadedQuery={preloadedQuery}
      cookies={cookies().getAll()}
    >
      <Scene />
    </PreloadedQueryWrapper>
  );
};

export default Page;

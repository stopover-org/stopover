import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import scene_EventPage_QueryNode, {
  scene_EventPage_Query,
} from "artifacts/scene_EventPage_Query.graphql";
import { cookies } from "next/headers";
import PreloadedQueryWrapper from "components/shared/relay/PreloadedQueryWrapper";
import Scene from "./scene";
import { getVariables } from "./metadata";

export { revalidate, generateMetadata } from "./metadata";

const Page = async ({ params }: { params: Record<string, string> }) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_EventPage_QueryNode,
    scene_EventPage_Query
  >(
    scene_EventPage_QueryNode.params,
    getVariables<scene_EventPage_Query>(params)
  );

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

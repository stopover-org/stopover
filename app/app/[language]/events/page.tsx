import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import scene_EventsPage_QueryNode, {
  scene_EventsPage_Query,
} from "artifacts/scene_EventsPage_Query.graphql";
import { cookies } from "next/headers";
import PreloadedQueryWrapper, {
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import Scene from "./scene";
import { getVariables } from "./metadata";

export { revalidate, generateMetadata } from "./metadata";

const Page = async (props: PageProps) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_EventsPage_QueryNode,
    scene_EventsPage_Query
  >(
    scene_EventsPage_QueryNode.params,
    getVariables<scene_EventsPage_Query>(props)
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

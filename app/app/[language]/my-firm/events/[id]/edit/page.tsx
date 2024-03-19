import React from "react";
import scene_FirmEditEvent_QueryNode, {
  scene_FirmEditEvent_Query,
} from "artifacts/scene_FirmEditEvent_Query.graphql";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import PreloadedQueryWrapper, {
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import Scene from "./scene";
import { getVariables } from "./metadata";

export { revalidate, generateMetadata } from "./metadata";

const Page = async (props: PageProps) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_FirmEditEvent_QueryNode,
    scene_FirmEditEvent_Query
  >(
    scene_FirmEditEvent_QueryNode.params,
    getVariables<scene_FirmEditEvent_Query>(props)
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

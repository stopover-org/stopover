import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import scene_Profile_QueryNode, {
  scene_Profile_Query,
} from "artifacts/scene_Profile_Query.graphql";
import { cookies } from "next/headers";
import PreloadedQueryWrapper, {
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import Scene from "./scene";
import { getVariables } from "./metadata";

export { revalidate, generateMetadata } from "./metadata";

const Page = async (props: PageProps) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_Profile_QueryNode,
    scene_Profile_Query
  >(scene_Profile_QueryNode.params, getVariables<scene_Profile_Query>(props));

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

import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import scene_SignIn_QueryNode, {
  scene_SignIn_Query,
} from "artifacts/scene_SignIn_Query.graphql";
import { cookies } from "next/headers";
import PreloadedQueryWrapper, {
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import Scene from "./scene";
import { getVariables } from "./metadata";

export { revalidate, generateMetadata } from "./metadata";

const Page = async (props: PageProps) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_SignIn_QueryNode,
    scene_SignIn_Query
  >(scene_SignIn_QueryNode.params, getVariables<scene_SignIn_Query>(props));

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

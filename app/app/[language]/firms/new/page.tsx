import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import scene_NewFirm_QueryNode, {
  scene_NewFirm_Query,
} from "artifacts/scene_NewFirm_Query.graphql";
import { cookies } from "next/headers";
import PreloadedQueryWrapper from "components/shared/relay/PreloadedQueryWrapper";
import Scene from "./scene";
import { getVariables } from "./metadata";

export { revalidate, generateMetadata } from "./metadata";

const Page = async (props: { params: { language: string } }) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_NewFirm_QueryNode,
    scene_NewFirm_Query
  >(scene_NewFirm_QueryNode.params, getVariables<scene_NewFirm_Query>(props));

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

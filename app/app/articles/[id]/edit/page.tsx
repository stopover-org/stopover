import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import scene_EditArticle_QueryNode, {
  scene_EditArticle_Query,
} from "artifacts/scene_EditArticle_Query.graphql";
import PreloadedQueryWrapper, {
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import Scene from "./scene";
import { getVariables } from "./metadata";

export { revalidate, generateMetadata } from "./metadata";

const Page = async (props: PageProps) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_EditArticle_QueryNode,
    scene_EditArticle_Query
  >(
    scene_EditArticle_QueryNode.params,
    getVariables<scene_EditArticle_Query>(props)
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

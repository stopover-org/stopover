import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import scene_NewArticle_QueryNode, {
  scene_NewArticle_Query,
} from "artifacts/scene_NewArticle_Query.graphql";
import PreloadedQueryWrapper, {
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import Scene from "./scene";
import { getVariables } from "./metadata";

export { revalidate, generateMetadata } from "./metadata";

const Page = async (props: PageProps) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_NewArticle_QueryNode,
    scene_NewArticle_Query
  >(
    scene_NewArticle_QueryNode.params,
    getVariables<scene_NewArticle_Query>(props)
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

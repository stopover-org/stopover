import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import scene_LandingFirms_QueryNode, {
  scene_LandingFirms_Query,
} from "artifacts/scene_LandingFirms_Query.graphql";
import { cookies } from "next/headers";
import PreloadedQueryWrapper, {
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import Scene from "./scene";
import { getVariables } from "./metadata";

export { revalidate, generateMetadata } from "./metadata";

const Page = async (props: PageProps) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_LandingFirms_QueryNode,
    scene_LandingFirms_Query
  >(
    scene_LandingFirms_QueryNode.params,
    getVariables<scene_LandingFirms_Query>(props)
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

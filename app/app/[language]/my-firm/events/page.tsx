import React from "react";
import scene_FirmEvents_QueryNode, {
  scene_FirmEvents_Query,
} from "artifacts/scene_FirmEvents_Query.graphql";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import PreloadedQueryWrapper from "components/shared/relay/PreloadedQueryWrapper";
import Scene from "./scene";

export { revalidate, generateMetadata } from "./metadata";

const Page = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_FirmEvents_QueryNode,
    scene_FirmEvents_Query
  >(scene_FirmEvents_QueryNode.params, {});

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

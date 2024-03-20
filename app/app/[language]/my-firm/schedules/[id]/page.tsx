import React from "react";
import scene_FirmSchedule_QueryNode, {
  scene_FirmSchedule_Query,
} from "artifacts/scene_FirmSchedule_Query.graphql";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import PreloadedQueryWrapper, {
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import Scene from "./scene";
import { getVariables } from "./metadata";

export { revalidate, getVariables } from "./metadata";

const Page = async (props: PageProps) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_FirmSchedule_QueryNode,
    scene_FirmSchedule_Query
  >(
    scene_FirmSchedule_QueryNode.params,
    getVariables<scene_FirmSchedule_Query>(props)
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

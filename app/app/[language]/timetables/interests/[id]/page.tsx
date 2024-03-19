import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import scene_InterestTimetable_QueryNode, {
  scene_InterestTimetable_Query,
} from "artifacts/scene_InterestTimetable_Query.graphql";
import PreloadedQueryWrapper, {
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import Scene from "./scene";
import { getVariables } from "./metadata";

export { revalidate, generateMetadata } from "./metadata";

const Page = async (props: PageProps) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_InterestTimetable_QueryNode,
    scene_InterestTimetable_Query
  >(
    scene_InterestTimetable_QueryNode.params,
    getVariables<scene_InterestTimetable_Query>(props)
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

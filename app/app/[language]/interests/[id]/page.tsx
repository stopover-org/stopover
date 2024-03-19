import React from "react";
import scene_AttendeeInterest_QueryNode, {
  scene_AttendeeInterest_Query,
} from "artifacts/scene_AttendeeInterest_Query.graphql";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import PreloadedQueryWrapper, {
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import Scene from "./scene";

export { revalidate, generateMetadata } from "./metadata";

const Page = async (props: PageProps) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_AttendeeInterest_QueryNode,
    scene_AttendeeInterest_Query
  >(scene_AttendeeInterest_QueryNode.params, {
    id: unescape(props.params.id),
    filters: { interests: [unescape(props.params.id)] },
  });

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

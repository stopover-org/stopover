import React from "react";
import scene_HomePage_QueryNode, {
  scene_HomePage_Query,
} from "artifacts/scene_HomePage_Query.graphql";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import QueryWrapper from "./query";

const Page = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_HomePage_QueryNode,
    scene_HomePage_Query
  >(scene_HomePage_QueryNode.params, {});

  return (
    <QueryWrapper
      preloadedQuery={preloadedQuery}
      cookies={cookies().getAll()}
    />
  );
};

export default Page;

export const revalidate = 0;

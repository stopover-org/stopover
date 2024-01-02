import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import scene_Profile_QueryNode, {
  scene_Profile_Query,
} from "artifacts/scene_Profile_Query.graphql";
import { cookies } from "next/headers";
import QueryWrapper from "./query";

const Page = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_Profile_QueryNode,
    scene_Profile_Query
  >(scene_Profile_QueryNode.params, {});

  return (
    <QueryWrapper
      preloadedQuery={preloadedQuery}
      cookies={cookies().getAll()}
    />
  );
};

export default Page;

export const revalidate = 0;

export const generateMetadata = () => ({
  title: "Create Firm",
});

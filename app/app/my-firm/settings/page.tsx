import React from "react";
import scene_FirmSettings_QueryNode, {
  scene_FirmSettings_Query,
} from "artifacts/scene_FirmSettings_Query.graphql";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import QueryWrapper from "./query";

const Page = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_FirmSettings_QueryNode,
    scene_FirmSettings_Query
  >(scene_FirmSettings_QueryNode.params, {});

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
  title: "Firm Settings",
});

import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import scene_EventPage_QueryNode, {
  scene_EventPage_Query,
} from "artifacts/scene_EventPage_Query.graphql";
import { cookies } from "next/headers";
import QueryWrapper from "./query";

const Page = async ({ params }: { params: Record<string, string> }) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_EventPage_QueryNode,
    scene_EventPage_Query
  >(scene_EventPage_QueryNode.params, { id: unescape(params.id) });

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
  title: "Event",
});

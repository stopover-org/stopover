import React from "react";
import scene_FirmSchedule_QueryNode, {
  scene_FirmSchedule_Query,
} from "artifacts/scene_FirmSchedule_Query.graphql";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import QueryWrapper from "./query";

const Page = async ({ params }: { params: Record<string, string> }) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_FirmSchedule_QueryNode,
    scene_FirmSchedule_Query
  >(scene_FirmSchedule_QueryNode.params, { id: unescape(params.id) });

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
  title: "Schedules",
});
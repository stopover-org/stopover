import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import scene_LandingFirms_QueryNode, {
  scene_LandingFirms_Query,
} from "artifacts/scene_LandingFirms_Query.graphql";
import { cookies } from "next/headers";
import QueryWrapper from "./query";

const Page = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_LandingFirms_QueryNode,
    scene_LandingFirms_Query
  >(scene_LandingFirms_QueryNode.params, {});

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
  title: "Stopover | Bookings Management",
});

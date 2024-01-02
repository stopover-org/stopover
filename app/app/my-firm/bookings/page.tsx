import React from "react";
import scene_FirmBookings_QueryNode, {
  scene_FirmBookings_Query,
} from "artifacts/scene_FirmBookings_Query.graphql";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import QueryWrapper from "./query";

const Page = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_FirmBookings_QueryNode,
    scene_FirmBookings_Query
  >(scene_FirmBookings_QueryNode.params, {});

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
  title: "Bookings",
});

import React from "react";
import scene_Dashboard_QueryNode, {
  scene_Dashboard_Query,
} from "artifacts/scene_Dashboard_Query.graphql";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import moment from "moment";
import QueryWrapper from "./query";

const Page = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_Dashboard_QueryNode,
    scene_Dashboard_Query
  >(scene_Dashboard_QueryNode.params, {
    bookingsFilter: { bookedFor: moment() },
    schedulesFilter: { scheduledFor: moment() },
  });

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
  title: "Dashboard",
  robots: {
    follow: false,
    index: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      nocache: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
});

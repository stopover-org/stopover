import React from "react";
import scene_Dashboard_QueryNode, {
  scene_Dashboard_Query,
} from "artifacts/scene_Dashboard_Query.graphql";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import moment from "moment";
import PreloadedQueryWrapper from "components/shared/relay/PreloadedQueryWrapper";
import Scene from "./scene";

const Page = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_Dashboard_QueryNode,
    scene_Dashboard_Query
  >(scene_Dashboard_QueryNode.params, {
    bookingsFilter: { bookedFor: moment().toDate() },
    schedulesFilter: { scheduledFor: moment().toDate() },
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

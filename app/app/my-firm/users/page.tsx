import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import scene_FirmUsers_QueryNode, {
  scene_FirmUsers_Query,
} from "artifacts/scene_FirmUsers_Query.graphql";
import QueryWrapper from "./query";

const Page = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_FirmUsers_QueryNode,
    scene_FirmUsers_Query
  >(scene_FirmUsers_QueryNode.params, {});

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
  title: "Users",
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

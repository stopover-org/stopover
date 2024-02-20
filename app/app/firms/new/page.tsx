import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import scene_NewFirm_QueryNode, {scene_NewFirm_Query,} from "artifacts/scene_NewFirm_Query.graphql";
import {cookies} from "next/headers";
import {Metadata} from "next";
import {merge} from "lodash";
import QueryWrapper from "./query";
import defaultMetadata, {translate} from "lib/utils/defaultMetadata";

const Page = async () => {
  const preloadedQuery = await loadSerializableQuery<typeof scene_NewFirm_QueryNode,
    scene_NewFirm_Query>(scene_NewFirm_QueryNode.params, {});

  return (
    <QueryWrapper
      preloadedQuery={preloadedQuery}
      cookies={cookies().getAll()}
    />
  );
};

export default Page;

export const revalidate = 0;

export const generateMetadata = async (): Promise<Metadata> => {
  const title = await translate("scenes.attendees.firms.newFirmScene.title");
  return merge(defaultMetadata, {
    title,
    openGraph: {
      title,
    },
  });
};

import React from "react";
import scene_Trips_QueryNode, {
  scene_Trips_Query,
} from "artifacts/scene_Trips_Query.graphql";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { merge } from "lodash";
import defaultMetadata, { translate } from "lib/utils/defaultMetadata";
import QueryWrapper from "./query";

const Page = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_Trips_QueryNode,
    scene_Trips_Query
  >(scene_Trips_QueryNode.params, {});

  return (
    <QueryWrapper
      preloadedQuery={preloadedQuery}
      cookies={cookies().getAll()}
    />
  );
};

export default Page;

export const revalidate = 0;

export const generateMetadata = async ({
  searchParams: { language },
}: any): Promise<Metadata> => {
  const title = await translate("models.trip.plural", {}, language);
  return merge(defaultMetadata, {
    title,
    openGraph: {
      title,
    },
  });
};
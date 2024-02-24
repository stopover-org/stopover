import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import scene_Profile_QueryNode, {
  scene_Profile_Query,
} from "artifacts/scene_Profile_Query.graphql";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { merge } from "lodash";
import defaultMetadata, { translate } from "lib/utils/defaultMetadata";
import QueryWrapper from "./query";

const Page = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_Profile_QueryNode,
    scene_Profile_Query
  >(scene_Profile_QueryNode.params, {});

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
  const title = await translate("models.account.singular", {}, language);
  return merge(defaultMetadata, {
    title,
    openGraph: {
      title,
    },
  });
};

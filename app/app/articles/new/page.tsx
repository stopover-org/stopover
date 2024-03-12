import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { merge } from "lodash";
import defaultMetadata, { translate } from "lib/utils/defaultMetadata";
import scene_NewArticle_QueryNode, {
  scene_NewArticle_Query,
} from "artifacts/scene_NewArticle_Query.graphql";
import QueryWrapper from "./query";

const Page = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_NewArticle_QueryNode,
    scene_NewArticle_Query
  >(scene_NewArticle_QueryNode.params, {});

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
  const title = await translate(
    "scenes.articles.newArticleScene",
    {},
    language
  );
  return merge(defaultMetadata, {
    title,
    openGraph: {
      title,
    },
  });
};
import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { merge } from "lodash";
import defaultMetadata, { translate } from "lib/utils/defaultMetadata";
import scene_ArticlesScene_QueryNode, {
  scene_ArticlesScene_Query,
} from "artifacts/scene_ArticlesScene_Query.graphql";
import PreloadedQueryWrapper from "components/shared/relay/PreloadedQueryWrapper";
import Scene from "./scene";

const Page = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_ArticlesScene_QueryNode,
    scene_ArticlesScene_Query
  >(scene_ArticlesScene_QueryNode.params, {});

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

export const generateMetadata = async ({
  searchParams: { language },
}: any): Promise<Metadata> => {
  const title = await translate("models.article.plural", {}, language);
  return merge(defaultMetadata, {
    title,
    openGraph: {
      title,
    },
  });
};

import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { merge } from "lodash";
import defaultMetadata, { translate } from "lib/utils/defaultMetadata";
import scene_EditArticle_QueryNode, {
  scene_EditArticle_Query,
} from "artifacts/scene_EditArticle_Query.graphql";
import PreloadedQueryWrapper from "components/shared/relay/PreloadedQueryWrapper/PreloadedQueryWrapper";
import Scene from "./scene";

const Page = async ({ params }: { params: Record<string, string> }) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_EditArticle_QueryNode,
    scene_EditArticle_Query
  >(scene_EditArticle_QueryNode.params, { id: unescape(params.id) });

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
  const title = await translate("models.article.singular", {}, language);
  return merge(defaultMetadata, {
    title,
    openGraph: {
      title,
    },
  });
};

import React from "react";
import scene_HomePage_QueryNode, {
  scene_HomePage_Query,
} from "artifacts/scene_HomePage_Query.graphql";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import PreloadedQueryWrapper from "components/shared/relay/PreloadedQueryWrapper";
import { Metadata } from "next";
import defaultMetadata, { translate } from "lib/utils/defaultMetadata";
import { merge } from "lodash";
import Scene from "./scene";

const Page = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_HomePage_QueryNode,
    scene_HomePage_Query
  >(scene_HomePage_QueryNode.params, {});

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
  const title = await translate("seo.root.title", {}, language);
  const description = await translate("seo.root.description", {}, language);
  const keywords = await translate("seo.root.keywords", {}, language);

  return merge(defaultMetadata, {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      keywords,
    },
  });
};

import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import scene_LandingFirms_QueryNode, {
  scene_LandingFirms_Query,
} from "artifacts/scene_LandingFirms_Query.graphql";
import { cookies } from "next/headers";
import { Metadata } from "next";
import defaultMetadata, { translate } from "lib/utils/defaultMetadata";
import { merge } from "lodash";
import PreloadedQueryWrapper from "components/shared/relay/PreloadedQueryWrapper";
import Scene from "./scene";

const Page = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_LandingFirms_QueryNode,
    scene_LandingFirms_Query
  >(scene_LandingFirms_QueryNode.params, {});

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
  const title = await translate(
    "scenes.firms.firmLandingScene.subtitle",
    {},
    language
  );

  const description = await translate(
    "scenes.firms.firmLandingScene.points",
    {},
    language
  );

  return merge(defaultMetadata, {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  });
};

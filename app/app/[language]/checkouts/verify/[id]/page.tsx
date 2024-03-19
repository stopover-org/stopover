import React from "react";
import scene_VerifyCheckout_QueryNode, {
  scene_VerifyCheckout_Query,
} from "artifacts/scene_VerifyCheckout_Query.graphql";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import PreloadedQueryWrapper from "components/shared/relay/PreloadedQueryWrapper";
import Scene from "./scene";
import { getVariables } from "./metadata";

export { revalidate, generateMetadata } from "./metadata";

const Page = async ({ params }: { params: Record<string, string> }) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_VerifyCheckout_QueryNode,
    scene_VerifyCheckout_Query
  >(
    scene_VerifyCheckout_QueryNode.params,
    getVariables<scene_VerifyCheckout_Query>(params)
  );

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

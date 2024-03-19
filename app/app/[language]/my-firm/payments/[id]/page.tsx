import React from "react";
import scene_FirmPayment_QueryNode, {
  scene_FirmPayment_Query,
} from "artifacts/scene_FirmPayment_Query.graphql";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import PreloadedQueryWrapper, {
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import Scene from "./scene";
import { getVariables } from "./metadata";

const Page = async (props: PageProps) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_FirmPayment_QueryNode,
    scene_FirmPayment_Query
  >(
    scene_FirmPayment_QueryNode.params,
    getVariables<scene_FirmPayment_Query>(props)
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

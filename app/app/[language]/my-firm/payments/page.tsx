import React from "react";
import scene_FirmPayments_QueryNode, {
  scene_FirmPayments_Query,
} from "artifacts/scene_FirmPayments_Query.graphql";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import { cookies } from "next/headers";
import PreloadedQueryWrapper, {
  PageProps,
} from "components/shared/relay/PreloadedQueryWrapper";
import Scene from "./scene";
import { getVariables } from "./metadata";

export { revalidate, generateMetadata } from "./metadata";

const Page = async (props: PageProps) => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_FirmPayments_QueryNode,
    scene_FirmPayments_Query
  >(
    scene_FirmPayments_QueryNode.params,
    getVariables<scene_FirmPayments_Query>(props)
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

import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import scene_EventsPage_QueryNode, {
  scene_EventsPage_Query,
} from "artifacts/scene_EventsPage_Query.graphql";
import { cookies } from "next/headers";
import PreloadedQueryWrapper from "components/shared/relay/PreloadedQueryWrapper";
import { VariablesOf } from "relay-runtime";
import Scene from "./scene";
import { getVariables } from "./metadata";

export { revalidate, generateMetadata } from "./metadata";

const Page = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const variables: VariablesOf<scene_EventsPage_Query> = React.useMemo(
    () => getVariables<scene_EventsPage_Query>({ searchParams }),
    [searchParams]
  );

  const preloadedQuery = await loadSerializableQuery<
    typeof scene_EventsPage_QueryNode,
    scene_EventsPage_Query
  >(scene_EventsPage_QueryNode.params, variables);

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

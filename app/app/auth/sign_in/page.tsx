import React from "react";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import scene_SignIn_QueryNode, {
  scene_SignIn_Query,
} from "artifacts/scene_SignIn_Query.graphql";
import { cookies } from "next/headers";
import QueryWrapper from "./query";

const Page = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_SignIn_QueryNode,
    scene_SignIn_Query
  >(scene_SignIn_QueryNode.params, {});

  return (
    <QueryWrapper
      preloadedQuery={preloadedQuery}
      cookies={cookies().getAll()}
    />
  );
};

export default Page;

export const revalidate = 0;

export const generateMetadata = () => ({
  title: "Sign In",
});

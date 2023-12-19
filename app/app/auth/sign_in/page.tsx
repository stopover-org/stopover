import React from "react";
import SignInScene from "app/auth/sign_in/scene";
import loadSerializableQuery from "lib/relay/loadSerializableQuery";
import scene_SignIn_QueryNode, {
  scene_SignIn_Query,
} from "artifacts/scene_SignIn_Query.graphql";
import Wrapper from "./wrapper";

const Page = async () => {
  const preloadedQuery = await loadSerializableQuery<
    typeof scene_SignIn_QueryNode,
    scene_SignIn_Query
  >(scene_SignIn_QueryNode.params, {});

  return (
    <Wrapper>
      <SignInScene preloadedQuery={preloadedQuery} />
    </Wrapper>
  );
};

export default Page;

export const revalidate = 0;

export const generateMetadata = () => ({
  title: "Sign In",
});

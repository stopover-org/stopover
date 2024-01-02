"use client";

import React from "react";
import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
import Layout from "components/MainPage/Layout";
import SceneWrapper from "components/shared/SceneWrapper";
import { scene_HomePage_Query } from "artifacts/scene_HomePage_Query.graphql";
import RootScene from "scenes/Landings/RootScene/RootScene";

const Query = graphql`
  query scene_HomePage_Query {
    currentUser {
      ...Layout_CurrentUserFragment
    }
    ...RootScene_QueryFragment
  }
`;

const Scene = ({
  queryRef,
}: {
  queryRef: PreloadedQuery<scene_HomePage_Query>;
}) => {
  const data = usePreloadedQuery(Query, queryRef);

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <RootScene queryFragmentRef={data} />
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

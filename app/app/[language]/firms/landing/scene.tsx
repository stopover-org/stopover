"use client";

import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { scene_LandingFirms_Query } from "artifacts/scene_LandingFirms_Query.graphql";
import FirmLandingScene from "scenes/firms/FirmLandingScene";
import { SceneProps } from "components/shared/relay/PreloadedQueryWrapper";

const Query = graphql`
  query scene_LandingFirms_Query {
    currentUser {
      ...Layout_CurrentUserFragment
    }
  }
`;

const Scene = ({ queryRef }: Partial<SceneProps<scene_LandingFirms_Query>>) => {
  const data = usePreloadedQuery(Query, queryRef!);

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard accessible>
          <FirmLandingScene />
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

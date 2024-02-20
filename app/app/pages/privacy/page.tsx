"use client";

import PageWrapper from "components/shared/PageWrapper";
import SceneWrapper from "components/shared/SceneWrapper";
import React from "react";
import { Metadata } from "next";
import { merge } from "lodash";
import defaultMetadata, { translate } from "lib/utils/defaultMetadata";
import Privacy from "./scene";

export default () => (
  <PageWrapper>
    <SceneWrapper>
      <React.Suspense>
        <Privacy />
      </React.Suspense>
    </SceneWrapper>
  </PageWrapper>
);

export const generateMetadata = async (): Promise<Metadata> => {
  const title = await translate("general.privacy");
  return merge(defaultMetadata, {
    title,
    openGraph: {
      title,
    },
  });
};

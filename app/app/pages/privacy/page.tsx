"use client";

import PageWrapper from "components/shared/PageWrapper";
import SceneWrapper from "components/shared/SceneWrapper";
import React from "react";
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

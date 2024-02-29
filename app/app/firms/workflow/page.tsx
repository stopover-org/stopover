"use client";

import PageWrapper from "components/shared/PageWrapper";
import SceneWrapper from "components/shared/SceneWrapper";
import React from "react";
import Workflow from "./scene";

export default () => (
  <PageWrapper>
    <SceneWrapper>
      <React.Suspense>
        <Workflow />
      </React.Suspense>
    </SceneWrapper>
  </PageWrapper>
);

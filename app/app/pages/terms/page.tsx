"use client";

import PageWrapper from "components/shared/PageWrapper";
import SceneWrapper from "components/shared/SceneWrapper";
import React from "react";
import Terms from "./scene";

export default () => (
  <PageWrapper>
    <SceneWrapper>
      <React.Suspense>
        <Terms />
      </React.Suspense>
    </SceneWrapper>
  </PageWrapper>
);

"use client";

import PageWrapper from "components/shared/PageWrapper";
import SceneWrapper from "components/shared/SceneWrapper";
import React from "react";
import RefundTerms from "./scene";

export default () => (
  <PageWrapper>
    <SceneWrapper>
      <React.Suspense>
        <RefundTerms />
      </React.Suspense>
    </SceneWrapper>
  </PageWrapper>
);

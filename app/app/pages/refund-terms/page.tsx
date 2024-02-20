"use client";

import PageWrapper from "components/shared/PageWrapper";
import SceneWrapper from "components/shared/SceneWrapper";
import React from "react";
import {Metadata} from "next";
import {merge} from "lodash";
import RefundTerms from "./scene";
import defaultMetadata, {translate} from "lib/utils/defaultMetadata";

export default () => (
  <PageWrapper>
    <SceneWrapper>
      <React.Suspense>
        <RefundTerms/>
      </React.Suspense>
    </SceneWrapper>
  </PageWrapper>
);

export const generateMetadata = async (): Promise<Metadata> => {
  const title = await translate("general.refundTerms");
  return merge(defaultMetadata, {
    title,
    openGraph: {
      title,
    },
  });
};

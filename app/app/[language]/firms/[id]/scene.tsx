"use client";

import React from "react";
import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import FirmScene from "scenes/attendees/firms/FirmScene";
import { scene_AttendeesFirm_Query } from "artifacts/scene_AttendeesFirm_Query.graphql";
import NotFound from "components/shared/NotFound/NotFound";

const Query = graphql`
  query scene_AttendeesFirm_Query($id: ID!) {
    currentUser {
      ...Layout_CurrentUserFragment
    }
    firm(id: $id) {
      id
      title
      ...FirmScene_CurrentFirmFragment
    }
  }
`;

const Scene = ({
  queryRef,
}: {
  queryRef: PreloadedQuery<scene_AttendeesFirm_Query>;
}) => {
  const data = usePreloadedQuery(Query, queryRef);
  const { t } = useTranslation();

  useDocumentTitle(data.firm?.title || t("general.404"));

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard accessible={!!data.firm?.id} noAccess={<NotFound />}>
          <FirmScene firmFragmentRef={data.firm!} />
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

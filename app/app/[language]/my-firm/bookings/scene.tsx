"use client";

import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import { scene_FirmBookings_Query } from "artifacts/scene_FirmBookings_Query.graphql";
import SidebarContent from "components/shared/SidebarContent/SidebarContent";
import BookingsScene from "scenes/firms/bookings/BookingsScene/BookingsScene";
import { SceneProps } from "components/shared/relay/PreloadedQueryWrapper";

const Query = graphql`
  query scene_FirmBookings_Query($bookingsFilter: BookingsFilter) {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        ...SidebarContent_AccountFragment
        firm {
          id
          ...BookingsScene_FirmFragment
        }
      }
    }
  }
`;

const Scene = ({ queryRef }: Partial<SceneProps<scene_FirmBookings_Query>>) => {
  const data = usePreloadedQuery(Query, queryRef!);
  const { t } = useTranslation();

  useDocumentTitle(t("models.booking.plural"));

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard accessible={Boolean(data.currentUser.account.firm?.id)}>
          <SidebarContent accountFragmentRef={data.currentUser.account}>
            <BookingsScene firmFragmentRef={data.currentUser.account.firm!} />
          </SidebarContent>
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

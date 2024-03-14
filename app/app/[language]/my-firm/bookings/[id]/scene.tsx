"use client";

import React from "react";
import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import { scene_FirmBooking_Query } from "artifacts/scene_FirmBooking_Query.graphql";
import SidebarContent from "components/shared/SidebarContent/SidebarContent";
import BookingScene from "scenes/firms/bookings/BookingScene/BookingScene";

const Query = graphql`
  query scene_FirmBooking_Query($id: ID!) {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        ...SidebarContent_AccountFragment
        firm {
          booking(id: $id) {
            id
            bookedFor
            event {
              title
            }
            ...BookingScene_FirmBookingFragment
          }
        }
      }
    }
  }
`;

const Scene = ({
  queryRef,
}: {
  queryRef: PreloadedQuery<scene_FirmBooking_Query>;
}) => {
  const data = usePreloadedQuery(Query, queryRef);
  const { t } = useTranslation();

  useDocumentTitle(
    `${t("models.booking.singular")} ${
      data.currentUser.account.firm!.booking!.event.title
    }`
  );

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard
          accessible={Boolean(data.currentUser.account.firm?.booking?.id)}
          redirectTo="/my-firm/events"
        >
          <SidebarContent accountFragmentRef={data.currentUser.account}>
            <BookingScene
              bookingFragmentRef={data.currentUser.account.firm!.booking!}
            />
          </SidebarContent>
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

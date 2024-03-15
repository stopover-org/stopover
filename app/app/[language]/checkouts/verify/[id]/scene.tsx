"use client";

import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import VerifyBookingScene from "scenes/attendees/bookings/VerifyBookingScene";
import { scene_VerifyCheckout_Query } from "artifacts/scene_VerifyCheckout_Query.graphql";
import { SceneProps } from "components/shared/relay/PreloadedQueryWrapper";

export const Query = graphql`
  query scene_VerifyCheckout_Query($id: ID!) {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        id
      }
    }
    booking(id: $id) {
      id
      account {
        id
      }
      event {
        title
      }
      ...VerifyBookingScene_BookingFragment
    }
  }
`;
const Scene = ({
  queryRef,
}: Partial<SceneProps<scene_VerifyCheckout_Query>>) => {
  const data = usePreloadedQuery(Query, queryRef!);
  const { t } = useTranslation();

  useDocumentTitle(
    `${t("models.booking.singular")} ${data.booking!.event!.title}`
  );

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard
          accessible={
            !!data.booking?.id &&
            data.booking.account.id === data.currentUser.account.id
          }
        >
          <VerifyBookingScene bookingFragmentRef={data.booking!} />
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

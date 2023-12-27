"use client";

import React from "react";
import { SerializablePreloadedQuery } from "lib/relay/loadSerializableQuery";
import { PreloadedQuery, usePreloadedQuery } from "react-relay";
import { getCurrentEnvironment } from "lib/relay/environment";
import Layout from "components/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import useSerializablePreloadedQuery from "lib/relay/useSerializablePreloadedQuery";
import SceneWrapper from "components/shared/SceneWrapper";
import query_VerifyCheckout_QueryNode, {
  query_VerifyCheckout_Query,
} from "artifacts/query_VerifyCheckout_Query.graphql";
import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "lib/hooks/useDocumentTitle";
import VerifyBookingScene from "scenes/attendees/bookings/VerifyBookingScene";
import query from "./query";

const Scene = ({
  preloadedQuery,
}: {
  preloadedQuery: SerializablePreloadedQuery<
    typeof query_VerifyCheckout_QueryNode,
    query_VerifyCheckout_Query
  >;
}) => {
  const environment = getCurrentEnvironment();
  const queryRef: PreloadedQuery<query_VerifyCheckout_Query> =
    useSerializablePreloadedQuery(environment, preloadedQuery);
  const data = usePreloadedQuery(query, queryRef);
  const { t } = useTranslation();

  useDocumentTitle(
    `${t("models.booking.singular")} ${data.booking.event.title}`
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
          <VerifyBookingScene bookingFragmentRef={data.booking} />
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

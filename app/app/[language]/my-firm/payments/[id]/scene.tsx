"use client";

import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { scene_FirmPayment_Query } from "artifacts/scene_FirmPayment_Query.graphql";
import SidebarContent from "components/shared/SidebarContent/SidebarContent";
import PaymentScene from "scenes/firms/payments/PaymentScene";
import { SceneProps } from "components/shared/relay/PreloadedQueryWrapper";

const Query = graphql`
  query scene_FirmPayment_Query($id: ID!) {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        ...SidebarContent_AccountFragment
        firm {
          id
          payment(id: $id) {
            id
            ...PaymentScene_PaymentFragment
          }
        }
      }
    }
  }
`;

const Scene = ({ queryRef }: Partial<SceneProps<scene_FirmPayment_Query>>) => {
  const data = usePreloadedQuery(Query, queryRef!);

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard
          accessible={Boolean(data.currentUser.account.firm?.payment?.id)}
          redirectTo="/my-firm/payments"
        >
          <SidebarContent accountFragmentRef={data.currentUser.account}>
            <PaymentScene
              paymentFragmentRef={data.currentUser.account.firm?.payment!}
            />
          </SidebarContent>
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

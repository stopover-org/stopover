"use client";

import React from "react";
import { graphql, usePreloadedQuery } from "react-relay";
import Layout from "components/shared/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import SceneWrapper from "components/shared/SceneWrapper";
import { scene_FirmPayments_Query } from "artifacts/scene_FirmPayments_Query.graphql";
import SidebarContent from "components/shared/SidebarContent/SidebarContent";
import PaymentsScene from "scenes/firms/payments/PaymentsScene";
import { SceneProps } from "components/shared/relay/PreloadedQueryWrapper";

const Query = graphql`
  query scene_FirmPayments_Query {
    currentUser {
      ...Layout_CurrentUserFragment
      account {
        ...SidebarContent_AccountFragment
        firm {
          ...PaymentsScene_FirmFragment
          id
        }
      }
    }
  }
`;

const Scene = ({ queryRef }: Partial<SceneProps<scene_FirmPayments_Query>>) => {
  const data = usePreloadedQuery(Query, queryRef!);

  return (
    <SceneWrapper>
      <Layout currentUserFragment={data.currentUser}>
        <AuthGuard
          accessible={Boolean(data.currentUser.account.firm?.id)}
          redirectTo="/firms/new"
        >
          <SidebarContent accountFragmentRef={data.currentUser.account}>
            <PaymentsScene firmFragmentRef={data.currentUser.account.firm!} />
          </SidebarContent>
        </AuthGuard>
      </Layout>
    </SceneWrapper>
  );
};

export default React.memo(Scene);

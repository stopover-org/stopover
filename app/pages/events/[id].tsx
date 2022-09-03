import React from "react";
import styled from "styled-components";
import { graphql, usePreloadedQuery } from "react-relay";
import { useRouter } from "next/router";
import { RelayProps, withRelay } from "relay-nextjs";
import Layout from "../../components/MainPage/Layout";
import DetailedInformation from "../../components/EventCard/DetailedInformation";
import MainInformation from "../../components/EventCard/MainInformation";
import shoppingCart from "../../components/icons/Solid/General/Shopping-cart.svg";
import Breadcrumbs from "../../components/EventCard/Breadcrumbs";
import { Id_Query } from "./__generated__/Id_Query.graphql";
import PreviewPhotos from "../../components/EventCard/PreviewPhotos";
import Check from "../../components/EventCard/Check";
import { getClientEnvironment } from "../../lib/clientEnvironment";
import Loading from "../../components/Loading";

const Body = styled.div`
  padding: 30px;
`;
const Bottom = styled.div`
  display: flex;
  flex-direction: row;
`;
const NotCheck = styled.div`
  max-width: 70%;
`;

const Query = graphql`
  query Id_Query($id: ID!) {
    event(id: $id) {
      id
      ...Breadcrumbs_Fragment
    }
  }
`;

type Props = {
  id: number;
};

const Event = ({ preloadedQuery }: RelayProps<Props, Id_Query>) => {
  const router = useRouter();
  const { date } = router.query;
  const { event } = usePreloadedQuery(Query, preloadedQuery);

  return (
    <Layout>
      <Body>
        <Breadcrumbs eventReference={event} />
        <MainInformation
          date={date}
          content={[
            {
              tagName: "dont show this",
              image: shoppingCart.src,
            },
            {
              tagName: "show this",
              image: shoppingCart.src,
            },
            {
              tagName: "dont show this",
              image: shoppingCart.src,
            },
          ]}
          price="6000"
          currency="$"
          averageRating={2.4}
        />
        <PreviewPhotos />
        <Bottom>
          <NotCheck>
            <DetailedInformation />
          </NotCheck>
          <Check />
        </Bottom>
      </Body>
    </Layout>
  );
};
export default withRelay(Event, Query, {
  // Fallback to render while the page is loading.
  // This property is optional.
  fallback: <Loading />,
  // Create a Relay environment on the client-side.
  // Note: This function must always return the same value.
  createClientEnvironment: () => getClientEnvironment()!,
  // Gets server side props for the page.
  serverSideProps: async (ctx) => ({ id: +ctx.query.id! }),
  // Server-side props can be accessed as the second argument
  // to this function.
  createServerEnvironment: async () => {
    const { createServerEnvironment } = await import(
      "../../lib/serverEnvironment"
    );
    return createServerEnvironment();
  },
});

import React from "react";
import styled from "styled-components";
import { graphql, useLazyLoadQuery } from "react-relay";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/MainPage/Layout";
import DetailedInformation from "../../components/EventCard/DetailedInformation";
import MainInformation from "../../components/EventCard/MainInformation";
import Comments from "../../components/EventCard/Comments";
import shoppingCart from "../../components/icons/Solid/General/Shopping-cart.svg";
import Breadcrumbs from "../../components/EventCard/Breadcrumbs";
import { Id_Query } from "./__generated__/Id_Query.graphql";
import PreviewPhotos from "../../components/EventCard/PreviewPhotos";
import Check from "../../components/EventCard/Check";

const Body = styled.div`
  padding: 30px;
`;
const Bottom = styled.div`
  display: flex;
  flex-direction: row;
`;
const NotCheck = styled.div``;

const Query = graphql`
  query Id_Query($id: Int!) {
    event(id: $id) {
      id
      ...Breadcrumbs_Fragment
    }
  }
`;

type Props = {
  id: number;
};

const Event: NextPage<Props> = ({ id }) => {
  const router = useRouter();
  const { date } = router.query;
  const { event } = useLazyLoadQuery<Id_Query>(Query, { id });

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
            <Comments />
          </NotCheck>
          <Check />
        </Bottom>
      </Body>
    </Layout>
  );
};

export const getServerSideProps = (ctx: any) => ({
  props: {
    id: +ctx.query.id,
  },
});

export default React.memo(Event);

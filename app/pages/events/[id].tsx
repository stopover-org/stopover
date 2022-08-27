import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Layout from "../../components/MainPage/Layout";
import BreadCrums from "../../components/EventCard/BreadCrums";
import DetailedInformation from "../../components/EventCard/DetailedInformation";
import MainInformation from "../../components/EventCard/MainInformation";
import GalleryOfPhotes from "../../components/EventCard/GalleryOfPhotes";
import Comments from "../../components/EventCard/Comments";
import shoppingCart from "../../components/icons/Solid/General/Shopping-cart.svg";
import PreviewPhotes from "../../components/EventCard/GalleryOfPhotes/PreviewPhotes";

const Body = styled.div`
  padding: 30px;
`;

function Events() {
  const router = useRouter();
  const { date } = router.query;
  return (
    <Layout>
      <Body>
        <BreadCrums />
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
        <PreviewPhotes />
        <GalleryOfPhotes />
        <DetailedInformation />
        <Comments />
      </Body>
    </Layout>
  );
}

export default React.memo(Events);

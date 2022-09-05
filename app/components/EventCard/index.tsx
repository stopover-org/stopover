import React from "react";
import styled from "styled-components";
import { Moment } from "moment";
import DetailedInformation from "./DetailedInformation";
import MainInformation from "./MainInformation";
import shoppingCart from "../icons/Solid/General/Shopping-cart.svg";
import Breadcrumbs from "./Breadcrumbs";
import PreviewPhotos from "./PreviewPhotos";
import Check from "./Check";

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

type Props = {
  date: Moment;
  event: any;
};

const EventCard = ({ date, event }: Props) => (
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
);
export default EventCard;

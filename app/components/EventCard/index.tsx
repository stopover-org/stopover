import React, { useState } from "react";
import styled from "styled-components";
import DetailedInformation from "./DetailedInformation";
import MainInformation from "./MainInformation";
import shoppingCart from "../icons/Solid/General/Shopping-cart.svg";
import Breadcrumbs from "./Breadcrumbs";
import PreviewPhotos from "./PreviewPhotos";
import Check from "./Check";

const Body = styled.div<{ fixed: string }>`
  max-width: 1600px;
  position: ${(props) => props.fixed};
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
  date?: string | string[];
  event: any;
};

const EventCard = ({ date, event }: Props) => {
  const [fixed, setFixed] = useState<string>("block");
  const blockScroll = (blocked: boolean) => {
    setFixed(blocked ? "fixed" : "block");
  };
  return (
    <Body fixed={fixed}>
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
      <PreviewPhotos blockScroll={blockScroll} />
      <Bottom>
        <NotCheck>
          <DetailedInformation />
        </NotCheck>
        <Check />
      </Bottom>
    </Body>
  );
};
export default EventCard;

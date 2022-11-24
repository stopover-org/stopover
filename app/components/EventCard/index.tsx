import React, { useState } from "react";
import styled from "styled-components";
import DetailedInformation from "./DetailedInformation";
import MainInformation from "./MainInformation";
import Breadcrumbs from "./Breadcrumbs";
import Cheque from "./Cheque";
import GoogleMaps from "./GoogleMaps";
import EventPreview from "./EventPreview";

const Body = styled.div<{ fixed: string }>`
  max-width: 1600px;
  position: ${(props) => props.fixed};
  padding: 30px;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: row;
`;

const Content = styled.div`
  max-width: 70%;
`;

type Props = {
  date?: string | string[];
  event: any;
  googleMapsApiKey: string;
};

const EventCard = ({ date, event, googleMapsApiKey }: Props) => {
  const [fixed, setFixed] = useState<string>("block");
  const blockScroll = (blocked: boolean) => {
    setFixed(blocked ? "fixed" : "block");
  };

  return (
    <Body fixed={fixed}>
      <Breadcrumbs eventReference={event} />
      <MainInformation eventReference={event} date={date} currency="$" />
      <EventPreview blockScroll={blockScroll} eventFragmentRef={event} />

      <Bottom>
        <Content>
          <DetailedInformation description={event?.description} />
          <GoogleMaps
            googleMapsApiKey={googleMapsApiKey}
            latitude={40}
            longitude={-80}
          />
        </Content>
        <Cheque />
      </Bottom>
    </Body>
  );
};

export default EventCard;

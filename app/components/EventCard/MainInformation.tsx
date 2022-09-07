import React from "react";
import styled from "styled-components";
import { graphql, useFragment } from "react-relay";
import Button from "./Button";
import AverageRating from "./AverageRating";
import Tags from "./Tags";
import shoppingCart from "../icons/Solid/General/Shopping-cart.svg";
import { Id_Query$data } from "../../pages/events/__generated__/Id_Query.graphql";

const Wrapper = styled.div`
  min-width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 15px 0px 6px 0px;
`;
const InformationalBlock = styled.div`
  .average-rating-wrapper {
    display: inline-block;
  }
  .tags-wrapper {
    display: inline-block;
    padding-left: 6px;
  }
  .tag-wrapper {
    padding: 6px;
  }
`;
const FunctionalBlock = styled.div`
  display: flex;
  flex-direction: row;
  .button-wrapper {
    padding-left: 12px;
  }
`;
const Name = styled.p`
  padding: 0px 0px 6px 0px;
  font-weight: 400;
  font-size: 40px;
  line-height: 48px;
`;
const Location = styled.p`
  padding: 6px 0px 0px 0px;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
`;

type Props = {
  currency: string;
  averageRating: number;
  eventReference: Id_Query$data["event"];
};

const MainInformation = ({
  currency,
  averageRating,
  eventReference,
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const event = useFragment<any>(
    graphql`
      fragment MainInformation_Fragment on Event {
        title
        availableDates
        fullAddress
        attendeeCostPerUomCents
        tags {
          id
          title
          preview
        }
      }
    `,
    eventReference
  );
  return (
    <Wrapper>
      <InformationalBlock>
        <Name>{event.title}</Name>
        <AverageRating averageRating={averageRating} />
        <Tags tags={event.tags} />
        <Location>{event.fullAddress}</Location>
      </InformationalBlock>
      <FunctionalBlock>
        <Button description={event.availableDates} color="#ff8a00" />
        <Button
          description={event.attendeeCostPerUomCents}
          color="#ff8a00"
          contentAfterDescription={[
            currency,
            <img src={shoppingCart.src} alt="icon" />,
            "+",
          ]}
        />
      </FunctionalBlock>
    </Wrapper>
  );
};

export default MainInformation;

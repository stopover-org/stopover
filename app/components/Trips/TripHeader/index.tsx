import moment from "moment";
import React from "react";
import styled from "styled-components";
import { graphql, useFragment } from "react-relay";
import Typography from "../../Typography";
import { TripHeader_BookingsFragment$key } from "./__generated__/TripHeader_BookingsFragment.graphql";
import { TypographySize, TypographyTags } from "../../StatesEnum";
import { getDayMonth } from "../../../lib/utils/dates";

const TextPadding = styled.div`
  padding-top: 10px;
`;

const TripHeader = ({
  tripHeaderReference,
}: {
  tripHeaderReference: TripHeader_BookingsFragment$key;
}) => {
  const data = useFragment(
    graphql`
      fragment TripHeader_BookingsFragment on Query
      @argumentDefinitions(id: { type: "ID!" }) {
        bookings(id: $id) {
          bookedFor
          event {
            city
          }
        }
      }
    `,
    tripHeaderReference
  );
  return (
    <>
      <Typography size={TypographySize.H1} as={TypographyTags.H1}>
        <>
          Моя поездка в {data?.bookings?.map((item) => `${item.event.city}, `)}
        </>
      </Typography>
      <TextPadding>
        <Typography size={TypographySize.H2} as={TypographyTags.H2}>
          <>
            {getDayMonth(moment(data?.bookings?.[0]?.bookedFor))}
            {" - "}
            {getDayMonth(moment(data?.bookings?.[8].bookedFor))}
          </>
        </Typography>
      </TextPadding>
    </>
  );
};
export default TripHeader;

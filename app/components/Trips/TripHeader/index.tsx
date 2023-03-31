import moment from "moment";
import React from "react";
import styled from "styled-components";
import { graphql, useFragment } from "react-relay";
import Typography from "../../v1/Typography";
import { TripHeader_BookingsFragment$key } from "./__generated__/TripHeader_BookingsFragment.graphql";
import { TypographySize, TypographyTags } from "../../StatesEnum";
import { getDayMonth, isDifferentDayMonth } from "../../../lib/utils/dates";

const TextPadding = styled.div`
  padding-top: 10px;
`;

const TripHeader = ({
  tripHeaderReference,
}: {
  tripHeaderReference: TripHeader_BookingsFragment$key;
}) => {
  const { bookings } = useFragment(
    graphql`
      fragment TripHeader_BookingsFragment on Query
      @argumentDefinitions(filters: { type: "BookingsFilter!" }) {
        bookings(filters: $filters) {
          bookedFor
          event {
            city
          }
        }
      }
    `,
    tripHeaderReference
  );
  if (!bookings) return null;

  const dates = bookings?.map(({ bookedFor }) => bookedFor);
  const minDate = Math.min.apply(null, dates);
  const maxDate = Math.max.apply(null, dates);
  const isSameDate = !isDifferentDayMonth(moment(minDate), moment(maxDate));
  const datesText = isSameDate
    ? getDayMonth(moment(minDate))
    : `${getDayMonth(moment(minDate))} - ${getDayMonth(moment(maxDate))}`;
  const citiesText = bookings?.map((item) => `${item.event.city}, `);

  return (
    <>
      <Typography size={TypographySize.H1} as={TypographyTags.H1}>
        <>Моя поездка в {citiesText}</>
      </Typography>
      <TextPadding>
        <Typography size={TypographySize.H2} as={TypographyTags.H2}>
          {datesText}
        </Typography>
      </TextPadding>
    </>
  );
};
export default TripHeader;

import React from "react";
import TripHeader from "../TripHeader";
import BookingList from "../../Bookings/BookingList";

type Props = {
  queryReference: any;
};

const TripCard = ({ queryReference }: Props) => (
  <>
    <TripHeader tripHeaderReference={queryReference} />
    <BookingList bookingReference={queryReference} />
  </>
);

export default TripCard;

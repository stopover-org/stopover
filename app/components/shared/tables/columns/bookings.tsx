import React from "react";
import moment from "moment";
import Link from "../../../v2/Link/Link";
import { getHumanDateTime } from "../../../../lib/utils/dates";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";
import AttendeesCell from "../../cells/AttendeesCell/AttendeesCell";
import BookingOptionsCell from "../../cells/BookingOptionsCell/BookingOptionsCell";

export function useBookingsHeaders() {
  return React.useMemo(
    () => [
      {
        label: "ID",
        width: 150,
        key: "id",
      },
      {
        label: "Booked For",
        width: 150,
        key: "bookedFor",
      },
      {
        label: "You Get",
        width: 100,
        key: "organizerPrice",
      },
      {
        label: "Attendee Pay",
        width: 100,
        key: "attendeePrice",
      },
      {
        label: "Already Paid",
        width: 100,
        key: "alreadyPaid",
      },
      {
        label: "Booking Options",
        width: 300,
        key: "bookingOptions",
      },
      {
        label: "Attendees",
        width: 300,
        key: "attendees",
      },
    ],
    []
  );
}
export function useBookingsColumns(
  bookings: ReadonlyArray<Record<string, any>>
) {
  return React.useMemo(
    () =>
      bookings.map((booking) => ({
        id: (
          <Link primary href={`/my-firm/bookings/${booking.id}`}>
            {booking.id}
          </Link>
        ),
        bookedFor: getHumanDateTime(moment(booking.bookedFor)),
        organizerPrice: getCurrencyFormat(
          booking?.organizerTotalPrice?.cents,
          booking?.organizerTotalPrice?.currency?.name
        ),
        attendeePrice: getCurrencyFormat(
          booking?.attendeeTotalPrice?.cents,
          booking?.attendeeTotalPrice?.currency?.name
        ),
        alreadyPaid: getCurrencyFormat(
          booking?.alreadyPaidPrice?.cents,
          booking?.alreadyPaidPrice?.currency?.name
        ),
        attendees: (
          <AttendeesCell
            data={booking.attendees.map(
              (
                { firstName, lastName, phone, email }: Record<string, any>,
                index: number
              ) => ({
                id: index + 1,
                firstName: firstName || "N/A",
                lastName: lastName || "N/A",
                phone: phone || "N/A",
                email: email || "N/A",
              })
            )}
          />
        ),
        bookingOptions: (
          <BookingOptionsCell
            data={booking.bookingOptions.map(
              (
                {
                  eventOption: { title },
                  organizerPrice,
                  attendeePrice,
                }: Record<string, any>,
                index: number
              ) => ({
                id: index + 1,
                title: title || "N/A",
                organizerPrice:
                  getCurrencyFormat(
                    organizerPrice?.cents,
                    organizerPrice?.currency?.name
                  ) || "N/A",
                attendeePrice:
                  getCurrencyFormat(
                    attendeePrice?.cents,
                    attendeePrice?.currency?.name
                  ) || "N/A",
              })
            )}
          />
        ),
      })),
    [bookings]
  );
}

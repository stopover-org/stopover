import React from "react";
import { Grid } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import Typography from "../../v2/Typography/Typography";
import { getCurrencyFormat } from "../../../lib/utils/currencyFormatter";
import { BookingSummary_BookingFragment$key } from "../../../artifacts/BookingSummary_BookingFragment.graphql";

interface BookingSummaryProps {
  bookingFragmentRef: BookingSummary_BookingFragment$key;
}

const BookingSummary = ({ bookingFragmentRef }: BookingSummaryProps) => {
  const booking = useFragment(
    graphql`
      fragment BookingSummary_BookingFragment on Booking {
        leftToPayPrice {
          cents
          currency {
            name
          }
        }
        alreadyPaidPrice {
          cents
          currency {
            name
          }
        }
        attendees(filters: { status: [registered, not_registered] }) {
          id
        }
      }
    `,
    bookingFragmentRef
  );

  return (
    <Grid container width="100%">
      <Grid xs={6}>
        <Typography
          level="body-md"
          sx={(theme) => ({
            fontSize: "22px",
            [theme.breakpoints.down("sm")]: {
              fontSize: "16px",
            },
          })}
        >
          {booking.attendees.length} attendee(-s)
        </Typography>
      </Grid>
      <Grid xs={6}>
        <Typography
          sx={(theme) => ({
            fontSize: "32px",
            textAlign: "end",
            [theme.breakpoints.down("sm")]: {
              fontSize: "22px",
            },
          })}
        >
          {getCurrencyFormat(
            booking.leftToPayPrice.cents,
            booking.leftToPayPrice.currency.name
          )}
        </Typography>
        <Typography
          fontSize="sm"
          textAlign="end"
          color="success"
          sx={(theme) => ({
            [theme.breakpoints.down("sm")]: {
              fontSize: "12px",
            },
          })}
        >
          Already paid:{" "}
          {getCurrencyFormat(
            booking.alreadyPaidPrice.cents,
            booking.alreadyPaidPrice.currency.name
          )}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default React.memo(BookingSummary);

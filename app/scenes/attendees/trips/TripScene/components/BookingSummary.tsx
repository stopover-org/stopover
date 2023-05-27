import { graphql, useFragment } from "react-relay";
import { CardOverflow, Grid } from "@mui/joy";
import React from "react";
import Typography from "../../../../../components/v2/Typography/Typography";
import { getCurrencyFormat } from "../../../../../lib/utils/currencyFormatter";
import { BookingSummary_BookingFragment$key } from "./__generated__/BookingSummary_BookingFragment.graphql";

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
        attendees {
          id
        }
      }
    `,
    bookingFragmentRef
  );

  return (
    <CardOverflow
      sx={(theme) => ({
        [theme.breakpoints.up("md")]: {
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          padding: "10px 5px 5px",
        },
      })}
    >
      <Grid container>
        <Grid xs={6} alignItems="flex-end" display="flex">
          <Typography
            level="body3"
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
    </CardOverflow>
  );
};

export default React.memo(BookingSummary);

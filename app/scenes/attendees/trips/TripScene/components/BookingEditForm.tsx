import { graphql, useFragment } from "react-relay";
import React from "react";
import { Divider, Grid, useTheme } from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { BookingEditForm_BookingFragment$key } from "../../../../../artifacts/BookingEditForm_BookingFragment.graphql";
import BookingOptionsEditForm from "./BookingOptionsEditForm";
import BookingDatesEditForm from "./BookingDatesEditForm";
import useSubscription from "../../../../../lib/hooks/useSubscription";

interface BookingEditFormProps {
  bookingFragmentRef: BookingEditForm_BookingFragment$key;
}

const BookingEditForm = ({ bookingFragmentRef }: BookingEditFormProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();
  const booking = useFragment(
    graphql`
      fragment BookingEditForm_BookingFragment on Booking {
        id
        status
        bookedFor
        paymentType
        leftToPayDepositPrice {
          cents
        }
        leftToPayPrice {
          cents
        }
        eventOptions {
          status
        }
        ...BookingDatesEditForm_BookingFragment
        ...BookingOptionsEditForm_BookingFragment
        ...CheckoutForm_BookingFragmentRef
        ...useBookingStates_CancellableBookingFragment
      }
    `,
    bookingFragmentRef
  );

  useSubscription({
    variables: { bookingId: booking.id },
    subscription: graphql`
      subscription BookingEditForm_BookingChangedSubscription($bookingId: ID!) {
        bookingChanged(bookingId: $bookingId) {
          booking {
            ...BookingEditForm_BookingFragment
          }
        }
      }
    `,
  });

  const eventOptions = React.useMemo(() => booking.eventOptions.filter(({ status }) => status === 'available'), [booking])

  return (
    <Grid container spacing={0}>
      <Grid lg={12} md={12}>
        {eventOptions.length > 0 && <>
          <Grid xs={12}>
            <BookingOptionsEditForm bookingFragmentRef={booking} />
          </Grid>
          <Grid xs={12}>
            <Divider sx={{ margin: 2}} />
          </Grid>
        </>}
        <Grid xs={12} paddingTop={1}>
          <BookingDatesEditForm bookingFragmentRef={booking} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(BookingEditForm);

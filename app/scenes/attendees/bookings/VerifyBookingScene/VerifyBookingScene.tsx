import { graphql, useFragment } from "react-relay";
import React from "react";
import {
  AspectRatio,
  Card,
  CardContent,
  CardOverflow,
  Divider,
  Grid,
} from "@mui/joy";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { VerifyBookingScene_BookingFragment$key } from "../../../../artifacts/VerifyBookingScene_BookingFragment.graphql";
import Typography from "../../../../components/v2/Typography";
import BookingSummary from "../../../../components/shared/BookingSummary";
import Checkout from "../../../../components/shared/Checkout";
import useSubscription from "../../../../lib/hooks/useSubscription";
import Link from "../../../../components/v2/Link";

interface VerifyBookingSceneProps {
  bookingFragmentRef: VerifyBookingScene_BookingFragment$key;
}

const VerifyBookingScene = ({
  bookingFragmentRef,
}: VerifyBookingSceneProps) => {
  const booking = useFragment<VerifyBookingScene_BookingFragment$key>(
    graphql`
      fragment VerifyBookingScene_BookingFragment on Booking {
        bookedFor
        status
        id
        trip {
          id
        }
        event {
          title
          images
          fullAddress
          attendeePricePerUom {
            cents
            currency {
              name
            }
          }
        }
        alreadyPaidPrice {
          cents
          currency {
            name
          }
        }
        leftToPayDepositPrice {
          cents
          currency {
            name
          }
        }
        leftToPayPrice {
          cents
          currency {
            name
          }
        }
        paymentType
        bookingOptions {
          eventOption {
            title
            attendeePrice {
              cents
              currency {
                name
              }
            }
          }
        }
        attendees(filters: { status: [registered, not_registered] }) {
          fullName
          attendeeOptions {
            eventOption {
              title
              attendeePrice {
                cents
                currency {
                  name
                }
              }
            }
          }
        }
        ...BookingSummary_BookingFragment
        ...Checkout_BookingFragment
      }
    `,
    bookingFragmentRef
  );

  useSubscription({
    variables: { bookingId: booking.id },
    subscription: graphql`
      subscription VerifyBookingScene_BookingChangedSubscription(
        $bookingId: ID!
      ) {
        bookingChanged(bookingId: $bookingId) {
          booking {
            ...VerifyBookingScene_BookingFragment
            ...Checkout_BookingFragment
          }
        }
      }
    `,
  });
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1 }} justifyContent="center">
      <Grid md={12} lg={4}>
        <Link href={`/trips/${booking.trip.id}`} sx={{ paddingLeft: "10px" }}>
          {t("scenes.attendees.bookings.verifyBookingScene.toTrip")}
        </Link>
        <Card variant="outlined">
          <CardOverflow>
            <AspectRatio ratio="2">
              <img src={booking.event.images?.[0]} loading="lazy" alt="" />
            </AspectRatio>
          </CardOverflow>
          <CardContent>
            <Typography level="title-lg">{booking.event.title}</Typography>
            <Typography>{booking.event.fullAddress}</Typography>
            <BookingSummary bookingFragmentRef={booking} />
            <Checkout bookingFragmentRef={booking} />
          </CardContent>
          <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
            <Divider inset="context" />
            <CardContent>
              <Typography fontWeight="md" textColor="text.secondary">
                {moment(booking.bookedFor).calendar()}
              </Typography>
            </CardContent>
          </CardOverflow>
        </Card>
      </Grid>
    </Grid>
  );
};

export default React.memo(VerifyBookingScene);

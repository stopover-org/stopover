import { graphql, useFragment } from "react-relay";
import React from "react";
import moment from "moment/moment";
import { Box, Grid, Stack } from "@mui/joy";
import Typography from "../../../../components/v2/Typography";
import { BookingScene_FirmBookingFragment$key } from "../../../../artifacts/BookingScene_FirmBookingFragment.graphql";
import Breadcrumbs from "../../../../components/v2/Breadcrumbs/Breadcrumbs";
import { getHumanDateTime } from "../../../../lib/utils/dates";
import EventOptionsTable from "./components/EventOptionsTable";
import AttendeesTable from "./components/AttendeesTable";
import Link from "../../../../components/v2/Link";
import Tag from "../../../../components/v2/Tag/Tag";
import useStatusColor from "../../../../lib/hooks/useStatusColor";
import {
  usePaymentsColumns,
  usePaymentsHeaders,
} from "../../../../components/shared/tables/columns/payments";
import Table from "../../../../components/v2/Table";
import {
  useRefundsColumns,
  useRefundsHeaders,
} from "../../../../components/shared/tables/columns/refunds";
import RefundBookingModal from "./components/RefundBookingModal";
import Button from "../../../../components/v2/Button";
import AddAttendeeModal from "./components/AddAttendeeModal";
import useSubscription from "../../../../lib/hooks/useSubscription";

interface BookingSceneProps {
  bookingFragmentRef: BookingScene_FirmBookingFragment$key;
}
const BookingScene = ({ bookingFragmentRef }: BookingSceneProps) => {
  const booking = useFragment<BookingScene_FirmBookingFragment$key>(
    graphql`
      fragment BookingScene_FirmBookingFragment on Booking {
        bookedFor
        id
        status
        event {
          id
          title
        }
        schedule {
          id
        }
        payments {
          id
          status
          totalPrice {
            cents
            currency {
              name
            }
          }
          createdAt
        }
        refunds {
          id
          status
          totalAmount {
            cents
            currency {
              name
            }
          }
          penaltyAmount {
            cents
            currency {
              name
            }
          }
          createdAt
        }
        ...EventOptionsTable_BookingFragment
        ...AttendeesTable_BookingFragment
        ...AddAttendeeModal_BookingFragment
        ...RefundBookingModal_BookingFragment
      }
    `,
    bookingFragmentRef
  );

  useSubscription({
    variables: { bookingId: booking.id },
    subscription: graphql`
      subscription BookingScene_BookingChangedSubscription($bookingId: ID!) {
        bookingChanged(bookingId: $bookingId) {
          booking {
            ...BookingScene_FirmBookingFragment
          }
        }
      }
    `,
  });

  const [refundModal, setRefundModal] = React.useState(false);
  const tagColor = useStatusColor({
    primary: ["active"],
    danger: ["cancelled"],
    status: booking.status,
  });
  const paymentsHeaders = usePaymentsHeaders();
  const paymentsData = usePaymentsColumns(
    booking.payments.map((payment) => ({
      event: {
        id: booking.event.id,
        title: booking.event.title,
      },
      booking: {
        id: booking.id,
      },
      createdAt: payment.createdAt,
      totalPrice: payment.totalPrice,
      status: payment.status,
    }))
  );
  const refundsHeaders = useRefundsHeaders();
  const refundsData = useRefundsColumns(
    booking.refunds.map((refund) => ({
      event: {
        id: booking.event.id,
        title: booking.event.title,
      },
      booking: {
        id: booking.id,
      },
      createdAt: refund.createdAt,
      totalAmount: refund.totalAmount,
      penaltyAmount: refund.penaltyAmount,
      status: refund.status,
    }))
  );

  return (
    <>
      <Grid container>
        <Grid xs={12}>
          <Breadcrumbs
            padding={0}
            items={[
              { title: "My Firm", href: "/my-firm" },
              "Bookings",
              getHumanDateTime(moment(booking.bookedFor!))!,
              booking.id,
            ]}
          />
        </Grid>
        <Grid xs={12}>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography>
                <Link level="h3" href={`/my-firm/events/${booking.event.id}`}>
                  {booking.event.title}
                </Link>
                <Tag color={tagColor} link={false}>
                  {booking.status} booking
                </Tag>
              </Typography>
              <Typography>
                {getHumanDateTime(moment(booking.bookedFor!))}
              </Typography>
            </Box>
            {booking.status !== "cancelled" && (
              <Box>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => setRefundModal(true)}
                >
                  Refund this booking
                </Button>
              </Box>
            )}
          </Stack>
        </Grid>
        <Grid xs={8}>
          <Typography level="title-lg">Attendees</Typography>
          <AttendeesTable bookingFragmentRef={booking} />
          <br />
          {booking.status !== "cancelled" && (
            <AddAttendeeModal bookingFragmentRef={booking} />
          )}
        </Grid>
        <Grid xs={4}>
          <Typography level="title-lg">Booking Options</Typography>
          <EventOptionsTable bookingFragmentRef={booking} />
        </Grid>
        <Grid xs={12}>
          <Typography level="title-lg">Payments</Typography>
          <Table headers={paymentsHeaders} data={paymentsData} />
        </Grid>
        <Grid xs={12}>
          <Typography level="title-lg">Refunds</Typography>
          <Table headers={refundsHeaders} data={refundsData} />
        </Grid>
      </Grid>
      <RefundBookingModal
        bookingFragmentRef={booking}
        open={refundModal}
        onClose={() => setRefundModal(false)}
      />
    </>
  );
};

export default React.memo(BookingScene);

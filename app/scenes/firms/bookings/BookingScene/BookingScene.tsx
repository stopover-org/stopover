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
import Button from "../../../../components/v2/Button";
import Link from "../../../../components/v2/Link";
import Tag from "../../../../components/v2/Tag/Tag";
import useStatusColor from "../../../../lib/hooks/useStatusColor";
import AddAttendee from "../../../../components/shared/AddAttendee";
import {
  usePaymentsColumns,
  usePaymentsHeaders,
} from "../../../../components/shared/tables/columns/payments";
import Table from "../../../../components/v2/Table";

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
        ...EventOptionsTable_BookingFragment
        ...AttendeesTable_BookingFragment
        ...AddAttendee_BookingFragment
      }
    `,
    bookingFragmentRef
  );

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

  return (
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
              <Button size="sm" color="danger">
                Refund
              </Button>
            </Box>
          )}
        </Stack>
      </Grid>
      <Grid xs={8}>
        <Typography level="h4">Attendees</Typography>
        <AttendeesTable bookingFragmentRef={booking} />
        <br />
        {booking.status !== "cancelled" && (
          <AddAttendee bookingFragmentRef={booking} />
        )}
      </Grid>
      <Grid xs={4}>
        <Typography level="h4">Booking Options</Typography>
        <EventOptionsTable bookingFragmentRef={booking} />
      </Grid>
      <Grid xs={12}>
        <Typography level="h4">Payments</Typography>
        <Table headers={paymentsHeaders} data={paymentsData} />
      </Grid>
    </Grid>
  );
};

export default React.memo(BookingScene);

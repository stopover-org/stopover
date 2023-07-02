import { graphql, useFragment } from "react-relay";
import React from "react";
import moment from "moment/moment";
import { Box, Grid, Stack } from "@mui/joy";
import Typography from "../../../../components/v2/Typography";
import { BookingScene_FirmBookingFragment$key } from "./__generated__/BookingScene_FirmBookingFragment.graphql";
import Breadcrumbs from "../../../../components/v2/Breadcrumbs/Breadcrumbs";
import { getHumanDateTime } from "../../../../lib/utils/dates";
import EventOptionsTable from "./components/EventOptionsTable";
import AttendeesTable from "./components/AttendeesTable";
import Button from "../../../../components/v2/Button";
import Link from "../../../../components/v2/Link";
import Tag from "../../../../components/v2/Tag/Tag";
import useStatusColor from "../../../../lib/hooks/useStatusColor";

interface BookingSceneProps {
  bookingFragmentRef: BookingScene_FirmBookingFragment$key;
}

const BookingScene = ({ bookingFragmentRef }: BookingSceneProps) => {
  const booking = useFragment(
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
        ...EventOptionsTable_BookingFragment
        ...AttendeesTable_BookingFragment
      }
    `,
    bookingFragmentRef
  );

  const tagColor = useStatusColor({
    primary: "active",
    danger: "cancelled",
    status: booking.status,
  });
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
        <AttendeesTable bookingFragmentRef={booking} />
      </Grid>
      <Grid xs={4}>
        <EventOptionsTable bookingFragmentRef={booking} />
      </Grid>
    </Grid>
  );
};

export default React.memo(BookingScene);

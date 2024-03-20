import moment from "moment";
import { graphql, useFragment } from "react-relay";
import React from "react";
import { Box, Stack, useTheme } from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import {
  calculateDate,
  shortDayMonthFormat,
  timeFormat,
} from "lib/utils/dates";
import Typography from "components/v2/Typography";
import { BookingTime_BookingFragment$key } from "artifacts/BookingTime_BookingFragment.graphql";

interface BookingTimeProps {
  bookingFragmentRef: BookingTime_BookingFragment$key;
}

const BookingTime = ({ bookingFragmentRef }: BookingTimeProps) => {
  const booking = useFragment(
    graphql`
      fragment BookingTime_BookingFragment on Booking {
        bookedFor
        event {
          durationTime
        }
      }
    `,
    bookingFragmentRef
  );

  const endTime = React.useMemo(
    () =>
      calculateDate(
        moment(booking.bookedFor),
        booking.event.durationTime,
        "add"
      ),
    [booking]
  );

  const startEndDiffDate = React.useMemo(
    () => !endTime.isSame(booking.bookedFor, "day"),
    [endTime, booking]
  );
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Stack
      justifyContent={isMobileView ? "flex-start" : "flex-end"}
      flexDirection="row"
      paddingTop={isMobileView ? "10px" : "inherit"}
    >
      <Typography
        level="title-lg"
        sx={{
          fontSize: "22px",
        }}
      >
        {moment(booking.bookedFor).format(timeFormat)}
        <Box>
          <Typography
            sx={{
              fontSize: "sm",
            }}
          >
            {moment(booking.bookedFor).format(shortDayMonthFormat)}
          </Typography>
        </Box>
      </Typography>
      <Typography
        level="title-lg"
        sx={{
          fontSize: "22px",
        }}
      >
        &nbsp;-&nbsp;
      </Typography>
      <Typography
        level="title-lg"
        sx={{
          fontSize: "22px",
        }}
      >
        {endTime.format(timeFormat)}
        {startEndDiffDate && (
          <Box>
            <Typography
              sx={{
                fontSize: "sm",
              }}
            >
              {endTime.format(shortDayMonthFormat)}
            </Typography>
          </Box>
        )}
      </Typography>
    </Stack>
  );
};

export default React.memo(BookingTime);

import { Box, useTheme } from "@mui/joy";
import React from "react";
import moment from "moment";
import { graphql, useFragment } from "react-relay";
import Scrollbars from "react-custom-scrollbars-2";
import { useMediaQuery } from "@mui/material";
import Typography from "../../../components/v2/Typography";
import { calculateDate } from "../../../lib/utils/dates";

interface BookingDescriptionProps {
  bookingFragmentRef: any;
}

const BookingDescription = ({
  bookingFragmentRef,
}: BookingDescriptionProps) => {
  const booking = useFragment(
    graphql`
      fragment BookingDescription_BookingFragment on Booking {
        bookedFor
        event {
          durationTime
          description
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
  const descriptionHeight = startEndDiffDate ? "160px" : "180px";
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ paddingTop: "5px" }}>
      <Scrollbars
        autoHeight={isMobileView}
        style={{
          width: "100%",
          height: isMobileView ? undefined : descriptionHeight,
        }}
      >
        <Typography
          level="body3"
          sx={{
            fontSize: "md",
          }}
        >
          {booking.event.description}
        </Typography>
      </Scrollbars>
    </Box>
  );
};

export default React.memo(BookingDescription);

import { Box, useTheme } from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import Scrollbars from "react-custom-scrollbars-2";
import { useMediaQuery } from "@mui/material";
import { BookingDescription_BookingFragment$key } from "artifacts/BookingDescription_BookingFragment.graphql";
import Description from "components/v2/Description/Description";

interface BookingDescriptionProps {
  bookingFragmentRef: BookingDescription_BookingFragment$key;
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
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Scrollbars
        autoHeight={isMobileView}
        style={{
          width: "100%",
          overflow: "hidden",
          minHeight: "160px",
        }}
      >
        <Description html={booking.event.description} />
      </Scrollbars>
    </Box>
  );
};

export default React.memo(BookingDescription);

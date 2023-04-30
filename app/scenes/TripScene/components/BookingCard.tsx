import React from "react";
import { graphql, useFragment } from "react-relay";
import {
  AspectRatio,
  Box,
  Card,
  CardOverflow,
  Stack,
  useTheme,
} from "@mui/joy";
import moment from "moment";
import { useMediaQuery } from "@mui/material";
import Typography from "../../../components/v2/Typography/Typography";
import { calculateDate } from "../../../lib/utils/dates";
import Link from "../../../components/v2/Link";
import BookingTime from "./BookingTime";
import BookingSummary from "./BookingSummary";

interface BookingCardProps {
  bookingFragmentRef: any;
}

const BookingCard = ({ bookingFragmentRef }: BookingCardProps) => {
  const booking = useFragment(
    graphql`
      fragment BookingCard_BookingFragment on Booking {
        id
        bookedFor
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
        event {
          id
          images
          title
          description
          durationTime
        }
        ...BookingTime_BookingFragment
        ...BookingSummary_BookingFragment
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
  const maxWidth = isMobileView ? "100%" : "880px";
  const imageWidthHeight = isMobileView ? "100%" : "320px";
  const descriptionHeight = startEndDiffDate ? "160px" : "180px";

  return (
    <Box
      width={maxWidth}
      padding="10px"
      paddingLeft={isMobileView ? "0" : "10px"}
    >
      <Card
        variant="outlined"
        sx={{ width: maxWidth }}
        orientation={isMobileView ? "vertical" : "horizontal"}
      >
        <CardOverflow>
          <AspectRatio
            minHeight={imageWidthHeight}
            maxHeight={imageWidthHeight}
            ratio="2"
            sx={
              isMobileView
                ? {}
                : {
                    width: imageWidthHeight,
                  }
            }
            objectFit="cover"
          >
            <img src={booking.event.images[0]} loading="lazy" alt="" />
          </AspectRatio>
        </CardOverflow>
        <Stack paddingLeft="10px" width="100%" sx={{ position: "relative" }}>
          <Box>
            <Stack
              justifyContent="space-between"
              flexDirection={isMobileView ? "column" : "row"}
            >
              <Link
                href={`/events/${booking.event.id}`}
                sx={{ display: "block" }}
              >
                <Typography
                  level="h3"
                  sx={{
                    fontSize: "22px",
                    textOverflow: "ellipsis",
                    whiteSpace: isMobileView ? "wrap" : "nowrap",
                    maxWidth: "400px",
                    display: "block",
                    overflow: "hidden",
                  }}
                >
                  {booking.event.title}
                </Typography>
              </Link>
              <BookingTime bookingFragmentRef={booking} />
            </Stack>
          </Box>
          <Box sx={{ paddingTop: "5px" }}>
            <Typography
              level="body3"
              sx={{
                fontSize: "md",
                textOverflow: "ellipsis",
                height: isMobileView ? "unset" : descriptionHeight,
                width: "100%",
                display: "inline-block",
                overflow: "hidden",
              }}
            >
              {booking.event.description.slice(0, 300)}
            </Typography>
          </Box>
          <BookingSummary bookingFragmentRef={booking} />
        </Stack>
      </Card>
    </Box>
  );
};

export default React.memo(BookingCard);

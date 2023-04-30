import React from "react";
import { graphql, useFragment } from "react-relay";
import { AspectRatio, Box, Card, CardOverflow, Grid, Stack } from "@mui/joy";
import moment from "moment";
import Typography from "../../../components/v2/Typography/Typography";
import {
  calculateDate,
  shortDayMonthFormat,
  timeFormat,
} from "../../../lib/utils/dates";
import { getCurrencyFormat } from "../../../lib/utils/currencyFormatter";
import Link from "../../../components/v2/Link";

interface BookingCardProps {
  bookingFragmentRef: any;
}

const BookingCard = ({ bookingFragmentRef }: BookingCardProps) => {
  const booking = useFragment(
    graphql`
      fragment BookingCard_BookingFragment on Booking {
        id
        bookedFor
        attendeeTotalPrice {
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

  return (
    <Box width="970px" padding="10px">
      <Card variant="outlined" sx={{ width: "950px" }} orientation="horizontal">
        <CardOverflow>
          <AspectRatio
            minHeight="320px"
            maxHeight="320px"
            ratio="2"
            sx={{ width: "320px" }}
            objectFit="cover"
          >
            <img src={booking.event.images[0]} loading="lazy" alt="" />
          </AspectRatio>
        </CardOverflow>
        <Stack paddingLeft="10px" width="100%" sx={{ position: "relative" }}>
          <Box>
            <Stack justifyContent="space-between" flexDirection="row">
              <Link href={`/events/${booking.event.id}`}>
                <Typography
                  level="h3"
                  sx={{
                    fontSize: "22px",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    width: "450px",
                    display: "inline-block",
                    overflow: "hidden",
                  }}
                >
                  {booking.event.title}
                </Typography>
              </Link>
              <Typography
                level="h3"
                sx={{
                  fontSize: "22px",
                }}
              >
                {moment(booking.bookedFor).format(timeFormat)}
                {startEndDiffDate && (
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "sm",
                      }}
                    >
                      {moment(booking.bookedFor).format(shortDayMonthFormat)}
                    </Typography>
                  </Box>
                )}
              </Typography>
              <Typography
                level="h3"
                sx={{
                  fontSize: "22px",
                }}
              >
                {" "}
                -{" "}
              </Typography>
              <Typography
                level="h3"
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
          </Box>
          <Box sx={{ paddingTop: "5px" }}>
            <Typography
              level="body3"
              sx={{
                fontSize: "md",
                textOverflow: "ellipsis",
                height: "180px",
                width: "100%",
                display: "inline-block",
                overflow: "hidden",
              }}
            >
              {booking.event.description}
            </Typography>
          </Box>

          <CardOverflow
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              padding: "10px 5px 5px",
            }}
          >
            <Grid container>
              <Grid xs={6} alignItems="flex-end" display="flex">
                <Typography
                  level="body3"
                  sx={{
                    fontSize: "22px",
                  }}
                >
                  {booking.attendees.length} attendee(-s)
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography
                  sx={{
                    fontSize: "32px",
                    textAlign: "end",
                  }}
                >
                  {getCurrencyFormat(
                    booking.attendeeTotalPrice.cents,
                    booking.attendeeTotalPrice.currency.name
                  )}
                </Typography>
              </Grid>
            </Grid>
          </CardOverflow>
        </Stack>
      </Card>
    </Box>
  );
};

export default React.memo(BookingCard);

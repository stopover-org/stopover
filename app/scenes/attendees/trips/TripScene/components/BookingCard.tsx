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
import { useMediaQuery } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import moment from "moment";
import Typography from "../../../../../components/v2/Typography/Typography";
import Link from "../../../../../components/v2/Link";
import BookingTime from "./BookingTime";
import BookingSummary from "./BookingSummary";
import BookingDescription from "./BookingDescription";
import BookingEditForm from "./BookingEditForm";
import Tag from "../../../../../components/v2/Tag/Tag";
import { getDate, getHumanDateTime } from "../../../../../lib/utils/dates";

interface BookingCardProps {
  bookingFragmentRef: any;
}

const BookingCard = ({ bookingFragmentRef }: BookingCardProps) => {
  const booking = useFragment(
    graphql`
      fragment BookingCard_BookingFragment on Booking {
        id
        bookedFor
        status
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
        ...BookingDescription_BookingFragment
        ...BookingEditForm_BookingFragment
      }
    `,
    bookingFragmentRef
  );
  const [isFormOpened, setIsFormOpened] = React.useState(false);
  const onShowBookingInfo = React.useCallback(
    () => setIsFormOpened(!isFormOpened),
    [isFormOpened, setIsFormOpened]
  );
  const thme = useTheme();
  const isMobileView = useMediaQuery(thme.breakpoints.down("md"));
  const imageWidthHeight = isMobileView ? "100%" : "320px";
  const isPast = React.useMemo(
    () => moment(booking.bookedFor).isBefore(new Date()),
    [booking.bookedFor]
  );

  const isPaid = React.useMemo(
    () => booking.status === "paid",
    [booking.status]
  );

  return (
    <Box
      sx={(theme) => ({
        padding: "10px",
        width: "880px",
        [theme.breakpoints.down("md")]: {
          paddingLeft: "0",
          width: "100%",
        },
      })}
    >
      <Card
        variant="outlined"
        sx={(theme) => ({
          width: "880px",
          [theme.breakpoints.down("md")]: { width: "100%" },
        })}
        orientation={isMobileView ? "vertical" : "horizontal"}
      >
        <CardOverflow>
          <AspectRatio
            ratio="2"
            minHeight={imageWidthHeight}
            maxHeight={imageWidthHeight}
            sx={(theme) => ({
              width: "320px",
              [theme.breakpoints.down("md")]: {
                width: "unset",
              },
            })}
            objectFit="cover"
          >
            <img src={booking.event.images[0]} loading="lazy" alt="" />
          </AspectRatio>
          <Box
            sx={{
              position: "absolute",
              zIndex: 2,
              right: "1rem",
              top: "1rem",
            }}
          >
            {isPast && (
              <Tag link={false} underline={false} primary>
                Past
              </Tag>
            )}
            {isPaid && (
              <Tag link={false} underline={false} color="primary">
                Paid
              </Tag>
            )}
          </Box>
        </CardOverflow>
        <Stack paddingLeft="10px" width="100%" sx={{ position: "relative" }}>
          <Box>
            <Stack
              sx={(theme) => ({
                flexDirection: "row",
                justifyContent: "space-between",
                [theme.breakpoints.down("md")]: {
                  flexDirection: "column",
                },
              })}
            >
              <Link
                href={`/events/${booking.event.id}`}
                sx={{ display: "block" }}
              >
                <Typography
                  level="h3"
                  sx={(theme) => ({
                    fontSize: "22px",
                    whiteSpace: "nowrap",
                    maxWidth: "400px",
                    display: "block",
                    overflow: "hidden",
                    [theme.breakpoints.down("md")]: {
                      whiteSpace: "wrap",
                    },
                  })}
                >
                  {booking.event.title}
                </Typography>
              </Link>
              <BookingTime bookingFragmentRef={booking} />
            </Stack>
          </Box>
          <BookingDescription bookingFragmentRef={booking} />
          <BookingSummary bookingFragmentRef={booking} />
        </Stack>
      </Card>
      <Box width="100%">
        <Typography
          alignItems="flex-end"
          color="primary"
          onClick={onShowBookingInfo}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          Booking Info&nbsp;
          <KeyboardArrowDownIcon
            sx={{
              transform: isFormOpened ? "rotate(180deg)" : "unset",
              lineHeight: "1.5em",
              verticalAlign: "middle",
            }}
          />
        </Typography>
        {isFormOpened && <BookingEditForm bookingFragmentRef={booking} />}
      </Box>
    </Box>
  );
};

export default React.memo(BookingCard);
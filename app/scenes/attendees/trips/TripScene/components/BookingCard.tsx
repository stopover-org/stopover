import React from "react";
import { graphql, useFragment } from "react-relay";
import {
  AspectRatio,
  Box,
  Card,
  CardOverflow,
  Divider,
  Grid,
  Stack,
  useTheme,
} from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import moment from "moment";
import { useTranslation } from "react-i18next";
import Typography from "../../../../../components/v2/Typography/Typography";
import Link from "../../../../../components/v2/Link";
import BookingTime from "./BookingTime";
import BookingDescription from "./BookingDescription";
import BookingEditForm from "./BookingEditForm";
import Tag from "../../../../../components/v2/Tag/Tag";
import { BookingCard_BookingFragment$key } from "../../../../../artifacts/BookingCard_BookingFragment.graphql";
import BookingSummary from "../../../../../components/shared/BookingSummary";
import EditAttendeesModal from "./EditAttendeesModal";
import EditBookingModal from "./EditBookingModal";
import CancelBookingModal from "./CancelBookingModal";
import { useBookingCancellable } from "../../../../../lib/hooks/useBookingStates";
import CheckoutForm from "./CheckoutForm";

interface BookingCardProps {
  bookingFragmentRef: BookingCard_BookingFragment$key;
}

const BookingCard = ({ bookingFragmentRef }: BookingCardProps) => {
  const { t } = useTranslation();
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
        event {
          id
          images
          title
          description
          durationTime
        }
        ...EditAttendeesModal_BookingFragment
        ...BookingTime_BookingFragment
        ...BookingSummary_BookingFragment
        ...BookingDescription_BookingFragment
        ...BookingEditForm_BookingFragment
        ...EditBookingModal_BookingFragment
        ...CancelBookingModal_BookingFragment
        ...CheckoutForm_BookingFragmentRef
        ...useBookingStates_CancellableBookingFragment
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

  // uses for tagging
  const isPaid = React.useMemo(
    () => booking.status === "paid",
    [booking.status]
  );

  // uses for tagging
  const isCancelled = React.useMemo(
    () => booking.status === "cancelled",
    [booking.status]
  );

  const [editAttendeesOpened, setEditAttendeesOpened] = React.useState<boolean>(false)
  const [editBookingOpened, setEditBookingOpened] = React.useState<boolean>(false)
  const [cancelBookingOpened, setCancelBookingOpened] = React.useState<boolean>(false)
  const cancellable = useBookingCancellable(booking)


  return (
    <Stack
      direction={'column'}
      sx={(theme) => ({
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
                {t("statuses.past")}
              </Tag>
            )}
            {isPaid && (
              <Tag link={false} underline={false} color="primary">
                {t("statuses.paid")}
              </Tag>
            )}
            {isCancelled && (
              <Tag link={false} underline={false} color="danger">
                {t("statuses.cancelled")}
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
          <CardOverflow
            sx={(theme) => ({
              [theme.breakpoints.up("md")]: {
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                padding: "10px 5px 5px",
              },
            })}
          >
            <BookingSummary bookingFragmentRef={booking} />
          </CardOverflow>
        </Stack>
      </Card>
      <Grid container spacing={2}>
        <Grid xs={12} sm={12} md={9} lg={9}>
          <CheckoutForm bookingFragmentRef={booking} />
        </Grid>
        <Grid xs={12} sm={12} md={3} lg={3}>
          <Box width='100%' pl="10px">
            <Typography
              alignItems="flex-end"
              color="primary"
              onClick={() => setEditAttendeesOpened(true)}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  textDecoration: 'underline',
                },
              }}
            >
              Настроить участников
            </Typography>
          </Box>
          <Box width='100%' pl="10px">
            <Typography
              fontSize="12px"
              alignItems="flex-end"
              color="primary"
              onClick={() => setEditBookingOpened(true)}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  textDecoration: 'underline',
                },
              }}
            >
              Изменить бронирование
            </Typography>
          </Box>
          {cancellable && <Box width='100%' pl="10px">
            <Typography
              fontSize="12px"
              alignItems="flex-end"
              color="danger"
              onClick={() => setCancelBookingOpened(true)}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  textDecoration: 'underline',
                },
              }}
            >
              Отменить бронирование
            </Typography>
          </Box>}
        </Grid>
      </Grid>
      <Divider sx={{ margin: '20px' }} />
      <EditAttendeesModal
        bookingFragmentRef={booking}
        opened={editAttendeesOpened}
        onClose={() => setEditAttendeesOpened(false)}
      />
      <EditBookingModal
        bookingFragmentRef={booking}
        opened={editBookingOpened}
        onClose={() => setEditBookingOpened(false)}
      />
      {cancellable && <CancelBookingModal
        open={cancelBookingOpened}
        onClose={() => setCancelBookingOpened(false)}
        bookingFragmentRef={booking}
      />}
    </Stack>
  );
};

export default React.memo(BookingCard);

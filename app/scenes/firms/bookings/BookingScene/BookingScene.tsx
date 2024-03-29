import { graphql, useFragment } from "react-relay";
import React from "react";
import moment from "moment/moment";
import { Box, Divider, Grid, Stack, useTheme } from "@mui/joy";
import { useTranslation } from "react-i18next";
import Typography from "components/v2/Typography";
import { BookingScene_FirmBookingFragment$key } from "artifacts/BookingScene_FirmBookingFragment.graphql";
import Breadcrumbs from "components/v2/Breadcrumbs/Breadcrumbs";
import { getHumanDateTime } from "lib/utils/dates";
import Link from "components/v2/Link";
import Tag from "components/v2/Tag/Tag";
import useStatusColor from "lib/hooks/useStatusColor";
import {
  usePaymentsColumns,
  usePaymentsHeaders,
} from "components/shared/tables/columns/payments";
import Table from "components/v2/Table";
import {
  useRefundsColumns,
  useRefundsHeaders,
} from "components/shared/tables/columns/refunds";
import Button from "components/v2/Button";
import { getCurrencyFormat } from "lib/utils/currencyFormatter";
import { useMediaQuery } from "@mui/material";
import CreateNotification from "components/shared/CreateNotification";
import AddAttendeeModal from "./components/AddAttendeeModal";
import RefundBookingModal from "./components/RefundBookingModal";
import AttendeesTable from "./components/AttendeesTable";
import EventOptionsTable from "./components/EventOptionsTable";
import BookingInformation from "./components/BookingInformation";

interface BookingSceneProps {
  bookingFragmentRef: BookingScene_FirmBookingFragment$key;
}

const BookingScene = ({ bookingFragmentRef }: BookingSceneProps) => {
  const booking = useFragment<BookingScene_FirmBookingFragment$key>(
    graphql`
      fragment BookingScene_FirmBookingFragment on Booking {
        ...BookingInformation_BookingFragment
        id
        status
        paymentType
        bookedFor
        attendeeTotalPrice {
          cents
          currency {
            name
          }
        }
        organizerTotalPrice {
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
        leftToPayPrice {
          cents
          currency {
            name
          }
        }
        leftToPayDepositPrice {
          cents
          currency {
            name
          }
        }
        event {
          id
          title
        }
        schedule {
          id
        }
        payments {
          ...payments_usePaymentsColumns_PaymentsConnectionFragment
          edges {
            node {
              __typename
              id
            }
          }
        }
        refunds {
          ...refunds_useRefundsColumns_RefundsFragment
          edges {
            node {
              __typename
              id
            }
          }
        }
        ...CreateNotification_BookingFragment
        ...EventOptionsTable_BookingFragment
        ...AttendeesTable_BookingFragment
        ...AddAttendeeModal_BookingFragment
        ...RefundBookingModal_BookingFragment
      }
    `,
    bookingFragmentRef
  );
  const [refundModal, setRefundModal] = React.useState(false);
  const tagColor = useStatusColor({
    primary: ["active"],
    danger: ["cancelled"],
    status: booking.status,
  });
  const paymentsHeaders = usePaymentsHeaders();
  const paymentsData = usePaymentsColumns(booking.payments);
  const refundsHeaders = useRefundsHeaders();
  const refundsData = useRefundsColumns(booking.refunds);
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Breadcrumbs
            padding={0}
            items={[
              { title: t("layout.header.myFirm"), href: "/my-firm" },
              t("models.booking.plural"),
              getHumanDateTime(moment(booking.bookedFor!))!,
              booking.id,
            ]}
          />
        </Grid>

        <Grid xs={12}>
          <Stack
            direction={isMobileView ? "column" : "row"}
            justifyContent="space-between"
          >
            <Box>
              <Typography>
                <Link level="h3" href={`/my-firm/events/${booking.event.id}`}>
                  {booking.event.title}
                </Link>
                <Tag color={tagColor} link={false}>
                  {t(`statuses.${booking.status}`)}{" "}
                  {t("models.booking.singular").toLowerCase()}
                </Tag>
                {booking.paymentType && (
                  <Tag color="primary" link={false}>
                    {t(
                      `models.booking.enums.paymentTypes.${booking.paymentType}`
                    )}{" "}
                  </Tag>
                )}
              </Typography>
              <Typography>
                {getHumanDateTime(moment(booking.bookedFor!))}
              </Typography>
            </Box>
            {booking.status !== "cancelled" && (
              <Stack direction="row" spacing={1} useFlexGap>
                <Box>
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() => setRefundModal(true)}
                  >
                    {t("scenes.firms.bookings.bookingScene.refundBooking")}
                  </Button>
                </Box>
                <Box>
                  <CreateNotification bookingFragmentRef={booking} />
                </Box>
              </Stack>
            )}
          </Stack>
        </Grid>

        <Grid xs={12}>
          <Typography level="body-lg">
            {t("models.booking.attributes.organizerTotalPrice")}:{" "}
            {getCurrencyFormat(
              booking.organizerTotalPrice.cents,
              booking.organizerTotalPrice.currency.name
            )}
          </Typography>
          <Typography level="body-lg">
            {t("models.booking.attributes.attendeeTotalPrice")}:{" "}
            {getCurrencyFormat(
              booking.attendeeTotalPrice.cents,
              booking.attendeeTotalPrice.currency.name
            )}
          </Typography>
        </Grid>

        <BookingInformation bookingFragmentRef={booking} />

        <Grid lg={12} md={12} pt={3}>
          <Typography level="title-lg" pb={1}>
            {t("models.attendee.plural")}
          </Typography>
          <AttendeesTable bookingFragmentRef={booking} />
          {booking.status !== "cancelled" && (
            <AddAttendeeModal bookingFragmentRef={booking} />
          )}
        </Grid>

        <Grid lg={12} md={12} pt={3}>
          <Typography level="title-lg" pb={1}>
            {t("models.bookingOption.plural")}
          </Typography>
          <EventOptionsTable bookingFragmentRef={booking} />
        </Grid>

        <Grid xs={12} padding={5}>
          <Divider />
        </Grid>

        <Grid xs={12}>
          <Typography level="title-lg" pb={1}>
            {t("models.payment.plural")}
          </Typography>
          <Table headers={paymentsHeaders} data={paymentsData} />
        </Grid>

        <Grid xs={12} padding={5}>
          <Divider />
        </Grid>

        <Grid xs={12}>
          <Typography level="title-lg" pb={1}>
            {t("models.refund.plural")}
          </Typography>
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

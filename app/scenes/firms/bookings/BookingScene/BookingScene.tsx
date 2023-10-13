import { graphql, useFragment } from "react-relay";
import React from "react";
import moment from "moment/moment";
import { Box, Divider, Grid, Stack } from "@mui/joy";
import { useTranslation } from "react-i18next";
import Typography from "../../../../components/v2/Typography";
import { BookingScene_FirmBookingFragment$key } from "../../../../artifacts/BookingScene_FirmBookingFragment.graphql";
import Breadcrumbs from "../../../../components/v2/Breadcrumbs/Breadcrumbs";
import { getHumanDateTime } from "../../../../lib/utils/dates";
import EventOptionsTable from "./components/EventOptionsTable";
import AttendeesTable from "./components/AttendeesTable";
import Link from "../../../../components/v2/Link";
import Tag from "../../../../components/v2/Tag/Tag";
import useStatusColor from "../../../../lib/hooks/useStatusColor";
import {
  usePaymentsColumns,
  usePaymentsHeaders,
} from "../../../../components/shared/tables/columns/payments";
import Table from "../../../../components/v2/Table";
import {
  useRefundsColumns,
  useRefundsHeaders,
} from "../../../../components/shared/tables/columns/refunds";
import RefundBookingModal from "./components/RefundBookingModal";
import Button from "../../../../components/v2/Button";
import AddAttendeeModal from "./components/AddAttendeeModal";
import useSubscription from "../../../../lib/hooks/useSubscription";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";

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
        paymentType
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
        refunds {
          id
          status
          totalAmount {
            cents
            currency {
              name
            }
          }
          penaltyAmount {
            cents
            currency {
              name
            }
          }
          createdAt
        }
        ...EventOptionsTable_BookingFragment
        ...AttendeesTable_BookingFragment
        ...AddAttendeeModal_BookingFragment
        ...RefundBookingModal_BookingFragment
      }
    `,
    bookingFragmentRef
  );

  useSubscription({
    variables: { bookingId: booking.id },
    subscription: graphql`
      subscription BookingScene_BookingChangedSubscription($bookingId: ID!) {
        bookingChanged(bookingId: $bookingId) {
          booking {
            ...BookingScene_FirmBookingFragment
          }
        }
      }
    `,
  });

  const [refundModal, setRefundModal] = React.useState(false);
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
  const refundsHeaders = useRefundsHeaders();
  const refundsData = useRefundsColumns(
    booking.refunds.map((refund) => ({
      event: {
        id: booking.event.id,
        title: booking.event.title,
      },
      booking: {
        id: booking.id,
      },
      createdAt: refund.createdAt,
      totalAmount: refund.totalAmount,
      penaltyAmount: refund.penaltyAmount,
      status: refund.status,
    }))
  );
  const { t } = useTranslation();

  return (
    <>
      <Grid container>
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
          <Stack direction="row" justifyContent="space-between">
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
                    {t(`models.firm.enums.paymentTypes.${booking.paymentType}`)}{" "}
                    {t("models.payment.singular").toLowerCase()}
                  </Tag>
                )}
              </Typography>
              <Typography>
                {getHumanDateTime(moment(booking.bookedFor!))}
              </Typography>
            </Box>
            {booking.status !== "cancelled" && (
              <Box>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() => setRefundModal(true)}
                >
                  {t("scenes.firms.bookings.bookingScene.refundBooking")}
                </Button>
              </Box>
            )}
          </Stack>
        </Grid>

        <Grid xs={4}>
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

        <Grid xs={4}>
          <Typography level="body-lg">
            {t("models.booking.attributes.alreadyPaidPrice")}:{" "}
            {getCurrencyFormat(
              booking.alreadyPaidPrice.cents,
              booking.alreadyPaidPrice.currency.name
            )}
          </Typography>
          {booking.paymentType === "stripe" && (
            <Typography level="body-lg">
              {t("models.booking.attributes.leftToPayPrice")}:{" "}
              {getCurrencyFormat(
                booking.leftToPayPrice.cents,
                booking.leftToPayPrice.currency.name
              )}
            </Typography>
          )}
          {booking.paymentType === "cash" && (
            <Typography level="body-lg">
              {t("models.booking.attributes.leftToPayDeposit")}:{" "}
              {getCurrencyFormat(
                booking.leftToPayDepositPrice.cents,
                booking.leftToPayDepositPrice.currency.name
              )}
            </Typography>
          )}
        </Grid>

        <Grid xs={12} padding={5}>
          <Divider />
        </Grid>

        <Grid lg={8} md={12}>
          <Typography level="title-lg" pb={1}>
            {t("models.attendee.plural")}
          </Typography>
          <AttendeesTable bookingFragmentRef={booking} />
          {booking.status !== "cancelled" && (
            <AddAttendeeModal bookingFragmentRef={booking} />
          )}
        </Grid>

        <Grid lg={4} md={12}>
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

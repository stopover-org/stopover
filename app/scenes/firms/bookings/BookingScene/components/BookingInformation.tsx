import { Card, CardContent, Grid } from "@mui/joy";
import Typography from "components/v2/Typography/Typography";
import CopyToClipboard from "components/shared/CopyToClipboard/CopyToClipboard";
import moment from "moment/moment";
import { dateTimeFormat } from "lib/utils/dates";
import Link from "components/v2/Link/Link";
import React from "react";
import { useTranslation } from "react-i18next";
import { graphql, useFragment } from "react-relay";
import { BookingInformation_BookingFragment$key } from "artifacts/BookingInformation_BookingFragment.graphql";
import { getCurrencyFormat } from "lib/utils/currencyFormatter";

interface BookingInformationProps {
  bookingFragmentRef: BookingInformation_BookingFragment$key;
}

const BookingInformation = ({
  bookingFragmentRef,
}: BookingInformationProps) => {
  const booking = useFragment<BookingInformation_BookingFragment$key>(
    graphql`
      fragment BookingInformation_BookingFragment on Booking {
        id
        bookedFor
        event {
          id
          title
        }
        status
        paymentType
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
        alreadyPaidPrice {
          cents
          currency {
            name
          }
        }
        contactEmail
        contactPhone
      }
    `,
    bookingFragmentRef
  );
  const { t } = useTranslation();

  return (
    <Grid lg={6} md={8} sm={12} xs={12} pt="20px">
      <Card sx={{ margin: "0 auto" }}>
        <Typography level="title-lg">{t("models.booking.singular")}</Typography>
        <CardContent>
          <Grid container>
            <Grid xs={4}>{t("models.booking.attributes.id")}</Grid>
            <Grid xs={8}>
              <CopyToClipboard text={booking.id} />
            </Grid>
            <Grid xs={4}>{t("models.booking.attributes.bookedFor")}</Grid>
            <Grid xs={8}>
              {moment(booking.bookedFor).format(dateTimeFormat)}
            </Grid>
            <Grid xs={4}>{t("models.event.singular")}</Grid>
            <Grid xs={8}>
              <Link href={`/my-firm/events/${booking.event.id}`} primary>
                {booking.event.title}
              </Link>
            </Grid>
            <Grid xs={4}>{t("models.booking.attributes.status")}</Grid>
            <Grid xs={8}>{t(`statuses.${booking.status.toLowerCase()}`)}</Grid>
            <Grid xs={4}>{t("models.booking.attributes.paymentType")}</Grid>
            <Grid xs={8}>
              {booking.paymentType
                ? t(`models.booking.enums.paymentTypes.${booking.paymentType}`)
                : null}
            </Grid>
            <Grid xs={4}>
              {t("models.booking.attributes.alreadyPaidPrice")}
            </Grid>
            <Grid xs={8}>
              {getCurrencyFormat(
                booking.alreadyPaidPrice.cents,
                booking.alreadyPaidPrice.currency.name
              )}{" "}
            </Grid>
            {booking.paymentType === "stripe" && (
              <>
                <Grid xs={4}>
                  {t("models.booking.attributes.leftToPayPrice")}
                </Grid>
                <Grid xs={8}>
                  {getCurrencyFormat(
                    booking.leftToPayPrice.cents,
                    booking.leftToPayPrice.currency.name
                  )}
                </Grid>
              </>
            )}
            {booking.paymentType === "cash" && (
              <>
                <Grid xs={4}>
                  {t("models.booking.attributes.leftToPayDeposit")}
                </Grid>
                <Grid xs={8}>
                  {getCurrencyFormat(
                    booking.leftToPayDepositPrice.cents,
                    booking.leftToPayDepositPrice.currency.name
                  )}
                </Grid>
              </>
            )}
            <Grid xs={4}>{t("models.booking.attributes.contactEmail")}</Grid>
            <Grid xs={8}>{booking.contactEmail}</Grid>
            <Grid xs={4}>{t("models.booking.attributes.contactPhone")}</Grid>
            <Grid xs={8}>{booking.contactPhone}</Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default React.memo(BookingInformation);

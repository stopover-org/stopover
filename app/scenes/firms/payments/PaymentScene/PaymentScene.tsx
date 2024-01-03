import { graphql, useFragment } from "react-relay";
import { PaymentScene_PaymentFragment$key } from "artifacts/PaymentScene_PaymentFragment.graphql";
import { Card, CardContent, Grid } from "@mui/joy";
import React from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import Typography from "components/v2/Typography/Typography";
import Link from "components/v2/Link/Link";
import Tag from "components/v2/Tag/Tag";
import useStatusColor from "lib/hooks/useStatusColor";
import { getCurrencyFormat } from "lib/utils/currencyFormatter";
import { dateTimeFormat } from "lib/utils/dates";
import {
  useRefundsColumns,
  useRefundsHeaders,
} from "components/shared/tables/columns/refunds";
import Table from "components/v2/Table/Table";
import CopyToClipboard from "../../../../components/shared/CopyToClipboard";

interface PaymentSceneProp {
  paymentFragmentRef: PaymentScene_PaymentFragment$key;
}

const PaymentScene = ({ paymentFragmentRef }: PaymentSceneProp) => {
  const payment = useFragment<PaymentScene_PaymentFragment$key>(
    graphql`
      fragment PaymentScene_PaymentFragment on Payment {
        id
        status
        createdAt
        updatedAt
        paymentType
        totalPrice {
          cents
          currency {
            name
          }
        }
        booking {
          id
          bookedFor
          leftToPayDepositPrice {
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
          alreadyPaidPrice {
            cents
            currency {
              name
            }
          }
          event {
            id
            title
            firm {
              id
              title
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
      }
    `,
    paymentFragmentRef
  );

  const tagColor = useStatusColor({
    primary: ["successful"],
    danger: ["canceled"],
    info: ["processing"],
    neutral: ["pending"],
    status: payment.status,
  });
  const { t } = useTranslation();
  const refundHeaders = useRefundsHeaders();
  const refundColumns = useRefundsColumns(payment.refunds);

  return (
    <Grid container spacing={2} sm={12} md={12}>
      <Grid lg={8} sm={12}>
        <Typography level="h4" sx={{ display: "block" }}>
          {payment.booking.event.firm.title}
        </Typography>
        <Typography level="h3" sx={{ display: "inline" }}>
          {getCurrencyFormat(
            payment.totalPrice?.cents,
            payment.totalPrice?.currency?.name
          )}{" "}
          <Link href={`/my-firm/bookings/${payment.booking.id}`} primary>
            {t("models.booking.singular")}{" "}
            {moment(payment.booking.bookedFor).format(dateTimeFormat)}
          </Link>
          <Tag color={tagColor} link={false}>
            {t(`statuses.${payment.status}`)}
          </Tag>
        </Typography>
        <Link
          href={`/my-firm/events/${payment.booking.event.id}`}
          fontSize="14px"
          primary
          sx={{ display: "block" }}
        >
          {payment.booking.event.title}
        </Link>
      </Grid>
      <Grid lg={6} md={8} sm={12} xs={12}>
        <Card sx={{ margin: "0 auto" }}>
          <Typography level="title-lg">
            {t("models.payment.singular")}
          </Typography>
          <CardContent>
            <Grid container>
              <Grid xs={4}>{t("models.payment.attributes.id")}</Grid>
              <Grid xs={8}>
                <CopyToClipboard text={payment.id} />
              </Grid>
              <Grid xs={4}>{t("models.booking.singular")}</Grid>
              <Grid xs={8}>
                <Link href={`/my-firm/bookings/${payment.booking.id}`} primary>
                  {moment(payment.booking.bookedFor).format(dateTimeFormat)}
                </Link>
              </Grid>
              <Grid xs={4}>{t("models.event.singular")}</Grid>
              <Grid xs={8}>
                <Link
                  href={`/my-firm/events/${payment.booking.event.id}`}
                  primary
                >
                  {payment.booking.event.title}
                </Link>
              </Grid>
              <Grid xs={4}>{t("models.payment.attributes.status")}</Grid>
              <Grid xs={8}>
                {t(`statuses.${payment.status.toLowerCase()}`)}
              </Grid>
              <Grid xs={4}>{t("models.payment.attributes.paymentType")}</Grid>
              <Grid xs={8}>
                {t(
                  `models.payment.enums.paymentTypes.${payment.paymentType?.toLowerCase()}`
                )}
              </Grid>
              <Grid xs={4}>{t("models.payment.attributes.createdAt")}</Grid>
              <Grid xs={8}>
                {moment(payment.createdAt).format(dateTimeFormat)}
              </Grid>
              <Grid xs={4}>{t("models.payment.attributes.updatedAt")}</Grid>
              <Grid xs={8}>
                {moment(payment.updatedAt).format(dateTimeFormat)}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid lg={12} sm={12}>
        <Typography level="h4">{t("models.refund.plural")}</Typography>
        <Table headers={refundHeaders} data={refundColumns} />
      </Grid>
    </Grid>
  );
};

export default React.memo(PaymentScene);

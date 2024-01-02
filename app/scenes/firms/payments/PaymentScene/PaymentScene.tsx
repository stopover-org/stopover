import { graphql, useFragment } from "react-relay";
import { PaymentScene_PaymentFragment$key } from "artifacts/PaymentScene_PaymentFragment.graphql";
import { Grid } from "@mui/joy";
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
} from "../../../../components/shared/tables/columns/refunds";
import Table from "../../../../components/v2/Table/Table";

interface PaymentSceneProp {
  paymentFragmentRef: PaymentScene_PaymentFragment$key;
}

const PaymentScene = ({ paymentFragmentRef }: PaymentSceneProp) => {
  const payment = useFragment<PaymentScene_PaymentFragment$key>(
    graphql`
      fragment PaymentScene_PaymentFragment on Payment {
        id
        status
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
      <Grid lg={12} sm={12}>
        <Typography level="h4">{t("models.refund.plural")}</Typography>
        <Table headers={refundHeaders} data={refundColumns} />
      </Grid>
    </Grid>
  );
};

export default React.memo(PaymentScene);

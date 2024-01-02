import React from "react";
import moment from "moment/moment";
import { useTranslation } from "react-i18next";
import Link from "components/v2/Link";
import { getHumanDateTime } from "lib/utils/dates";
import { getCurrencyFormat } from "lib/utils/currencyFormatter";
import useStatusColor from "lib/hooks/useStatusColor";
import Tag from "components/v2/Tag/Tag";
import useEdges from "lib/hooks/useEdges";
import { graphql, useFragment } from "react-relay";
import { payments_usePaymentsColumns_PaymentsConnectionFragment$key } from "artifacts/payments_usePaymentsColumns_PaymentsConnectionFragment.graphql";

const TagColor = ({ status }: { status: string }) => {
  const color = useStatusColor({
    neutral: ["processing"],
    danger: ["canceled"],
    status,
  });
  const { t } = useTranslation();

  return (
    <Tag link={false} color={color}>
      {t(`statuses.${status}`)}
    </Tag>
  );
};

export function usePaymentsHeaders() {
  const { t } = useTranslation();
  return React.useMemo(
    () => [
      {
        label: t("models.event.singular"),
        width: 300,
        key: "event",
      },
      {
        label: t("models.booking.singular"),
        width: 150,
        key: "booking",
      },
      {
        label: t("models.payment.attributes.createdAt"),
        width: 150,
        key: "creationDate",
      },
      {
        label: t("models.payment.attributes.totalPrice"),
        width: 100,
        key: "amount",
      },
      {
        label: t("models.payment.attributes.status"),
        width: 100,
        key: "status",
      },
    ],
    []
  );
}

export function usePaymentsColumns(
  paymentsConnectionFragmentRef: payments_usePaymentsColumns_PaymentsConnectionFragment$key
) {
  const payments =
    useFragment<payments_usePaymentsColumns_PaymentsConnectionFragment$key>(
      graphql`
        fragment payments_usePaymentsColumns_PaymentsConnectionFragment on PaymentConnection {
          edges {
            node {
              id
              status
              createdAt
              booking {
                event {
                  id
                  title
                }
                id
              }
              totalPrice {
                cents
                currency {
                  name
                }
              }
            }
          }
        }
      `,
      paymentsConnectionFragmentRef
    );
  const paymentsData = useEdges(payments).map((v) => v!);
  return React.useMemo(
    () =>
      paymentsData.map((payment) => ({
        event: (
          <Link href={`/my-firm/events/${payment.booking.event?.id}`}>
            {payment.booking.event?.title}
          </Link>
        ),
        booking: (
          <Link href={`/my-firm/bookings/${payment.booking?.id}`}>
            {payment.booking?.id}
          </Link>
        ),
        creationDate: getHumanDateTime(moment(payment.createdAt)),
        amount: getCurrencyFormat(
          payment.totalPrice?.cents,
          payment.totalPrice?.currency.name
        ),
        status: <TagColor status={payment.status} />,
      })),
    [payments]
  );
}

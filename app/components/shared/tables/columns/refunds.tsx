import React from "react";
import moment from "moment/moment";
import { useTranslation } from "react-i18next";
import Link from "components/v2/Link";
import { getHumanDateTime } from "lib/utils/dates";
import { getCurrencyFormat } from "lib/utils/currencyFormatter";
import useStatusColor from "lib/hooks/useStatusColor";
import Tag from "components/v2/Tag/Tag";
import { graphql, useFragment } from "react-relay";
import { refunds_useRefundsColumns_RefundsFragment$key } from "artifacts/refunds_useRefundsColumns_RefundsFragment.graphql";
import useEdges from "lib/hooks/useEdges";

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

export function useRefundsHeaders() {
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
        label: t("models.refund.attributes.createdAt"),
        width: 100,
        key: "creationDate",
      },
      {
        label: t("models.refund.attributes.totalAmount"),
        width: 100,
        key: "amount",
      },
      {
        label: t("models.refund.attributes.penaltyAmount"),
        width: 100,
        key: "penalty",
      },
      {
        label: t("models.refund.attributes.status"),
        width: 100,
        key: "status",
      },
    ],
    []
  );
}

export function useRefundsColumns(
  refundsConnectionFragmentRef: refunds_useRefundsColumns_RefundsFragment$key
) {
  const refunds = useFragment<refunds_useRefundsColumns_RefundsFragment$key>(
    graphql`
      fragment refunds_useRefundsColumns_RefundsFragment on RefundConnection {
        edges {
          node {
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
            booking {
              id
              event {
                id
                title
              }
            }
            createdAt
          }
        }
      }
    `,
    refundsConnectionFragmentRef
  );
  const refundsData = useEdges(refunds).map((v) => v!);
  return React.useMemo(
    () =>
      refundsData.map((refund) => ({
        event: (
          <Link href={`/my-firm/events/${refund.booking.event?.id}`}>
            {refund.booking.event?.title}
          </Link>
        ),
        booking: (
          <Link href={`/my-firm/bookings/${refund.booking?.id}`}>
            {refund.booking?.id}
          </Link>
        ),
        creationDate: getHumanDateTime(moment(refund.createdAt)),
        amount: getCurrencyFormat(
          refund.totalAmount?.cents,
          refund.totalAmount?.currency.name
        ),
        penalty: getCurrencyFormat(
          refund.penaltyAmount?.cents,
          refund.penaltyAmount?.currency.name
        ),
        status: <TagColor status={refund.status} />,
      })),
    [refunds]
  );
}

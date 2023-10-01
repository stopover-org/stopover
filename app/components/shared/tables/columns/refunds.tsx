import React from "react";
import moment from "moment/moment";
import { useTranslation } from "react-i18next";
import Link from "../../../v2/Link";
import { getHumanDateTime } from "../../../../lib/utils/dates";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";
import useStatusColor from "../../../../lib/hooks/useStatusColor";
import Tag from "../../../v2/Tag/Tag";

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

export function useRefundsColumns(refunds: ReadonlyArray<Record<string, any>>) {
  return React.useMemo(
    () =>
      refunds.map((refund) => ({
        event: (
          <Link href={`/my-firm/events/${refund.event?.id}`}>
            {refund.event?.title}
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

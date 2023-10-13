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
  payments: ReadonlyArray<Record<string, any>>
) {
  return React.useMemo(
    () =>
      payments.map((payment) => ({
        event: (
          <Link href={`/my-firm/events/${payment.event?.id}`}>
            {payment.event?.title}
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

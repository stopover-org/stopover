import React from "react";
import moment from "moment/moment";
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

  return (
    <Tag level="body-md" link={false} color={color}>
      {status}
    </Tag>
  );
};
export function usePaymentsHeaders() {
  return React.useMemo(
    () => [
      {
        label: "Event Title",
        width: 300,
        key: "event",
      },
      {
        label: "Booking",
        width: 150,
        key: "booking",
      },
      {
        label: "Creation Date",
        width: 100,
        key: "creationDate",
      },
      {
        label: "Amount",
        width: 100,
        key: "amount",
      },
      {
        label: "Status",
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

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
    <Tag link={false} color={color}>
      {status}
    </Tag>
  );
};
export function useRefundsHeaders() {
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
        label: "Penalty",
        width: 100,
        key: "penalty",
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

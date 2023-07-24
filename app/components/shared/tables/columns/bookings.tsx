import React from "react";
import moment from "moment";
import UnfoldMoreDoubleIcon from "@mui/icons-material/UnfoldMoreDouble";
import { IconButton } from "@mui/joy";
import Link from "../../../v2/Link/Link";
import { getHumanDateTime } from "../../../../lib/utils/dates";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";
import useStatusColor from "../../../../lib/hooks/useStatusColor";
import Tag from "../../../v2/Tag/Tag";
import Table from "../../../v2/Table/Table";
import Typography from "../../../v2/Typography";

export function useBookingsHeaders() {
  return React.useMemo(
    () => [
      {
        label: "ID",
        width: 150,
        key: "id",
      },
      { label: "Status", width: 100, key: "status" },
      {
        label: "Booked For",
        width: 150,
        key: "bookedFor",
      },
      {
        label: "You Get",
        width: 100,
        key: "organizerPrice",
      },
      {
        label: "Attendee Pay",
        width: 100,
        key: "attendeePrice",
      },
      {
        label: "Already Paid",
        width: 100,
        key: "alreadyPaid",
      },
      { label: "", width: 100, key: "expand" },
    ],
    []
  );
}

const TagColor = ({ status }: { status: string }) => {
  const color = useStatusColor({
    danger: ["cancelled"],
    status,
  });

  return (
    <Tag level="body3" link={false} color={color}>
      {status}
    </Tag>
  );
};

export function useBookingsColumns(
  bookings: ReadonlyArray<Record<string, any>>
) {
  const attendeesHeaders = React.useMemo(
    () => [
      { label: "ID", width: 50, key: "id" },
      { label: "First Name", key: "firstName" },
      { label: "Last Name", key: "lastName" },
      { label: "Email", key: "email" },
      { label: "Phone", key: "phone" },
    ],
    []
  );

  const bookingOptionsHeaders = React.useMemo(
    () => [
      { label: "ID", width: 50, key: "id" },
      { label: "Title", key: "title" },
      { label: "You get", key: "organizerPrice" },
      { label: "Attendee pay", key: "attendeePrice" },
    ],
    []
  );
  return React.useMemo(
    () =>
      bookings.map((booking) => {
        const attendeesData = booking.attendees.map(
          (attendee: any, index: number) => ({
            id: index + 1,
            firstName: attendee.firstName?.trim() || "N/A",
            lastName: attendee.lastName?.trim() || "N/A",
            email: attendee.email?.trim() || "N/A",
            phone: attendee.phone?.trim() || "N/A",
          })
        );

        const bookingOptionsData = booking.bookingOptions.map(
          (opt: any, index: number) => ({
            id: index + 1,
            title: opt.eventOption.title,
            organizerPrice: getCurrencyFormat(
              opt.organizerPrice.cents,
              opt.organizerPrice.currency.name
            ),
            attendeePrice: getCurrencyFormat(
              opt.attendeePrice.cents,
              opt.attendeePrice.currency.name
            ),
          })
        );
        return {
          id: (
            <Link primary href={`/my-firm/bookings/${booking.id}`}>
              {booking.id}
            </Link>
          ),
          status: <TagColor status={booking.status} />,
          bookedFor: getHumanDateTime(moment(booking.bookedFor)),
          organizerPrice: getCurrencyFormat(
            booking?.organizerTotalPrice?.cents,
            booking?.organizerTotalPrice?.currency?.name
          ),
          attendeePrice: getCurrencyFormat(
            booking?.attendeeTotalPrice?.cents,
            booking?.attendeeTotalPrice?.currency?.name
          ),
          alreadyPaid: getCurrencyFormat(
            booking?.alreadyPaidPrice?.cents,
            booking?.alreadyPaidPrice?.currency?.name
          ),
          expand: (
            <IconButton size="sm">
              <UnfoldMoreDoubleIcon />
            </IconButton>
          ),
          tables: [
            <Typography level="h5">Attendees</Typography>,
            <Table
              hoverRow={false}
              headers={attendeesHeaders}
              data={attendeesData}
            />,
            <Typography level="h5">Booking Options</Typography>,
            <Table
              hoverRow={false}
              headers={bookingOptionsHeaders}
              data={bookingOptionsData}
            />,
          ],
        };
      }),
    [bookings]
  );
}

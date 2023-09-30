import React from "react";
import moment from "moment";
import UnfoldMoreDoubleIcon from "@mui/icons-material/UnfoldMoreDouble";
import { IconButton } from "@mui/joy";
import { useTranslation } from "react-i18next";
import Link from "../../../v2/Link/Link";
import { getHumanDateTime } from "../../../../lib/utils/dates";
import { getCurrencyFormat } from "../../../../lib/utils/currencyFormatter";
import useStatusColor from "../../../../lib/hooks/useStatusColor";
import Tag from "../../../v2/Tag/Tag";
import Table from "../../../v2/Table/Table";
import Typography from "../../../v2/Typography";

export function useBookingsHeaders() {
  const { t } = useTranslation();
  return React.useMemo(
    () => [
      {
        label: t("models.booking.attributes.id"),
        width: 150,
        key: "id",
      },
      {
        label: t("models.booking.attributes.status"),
        width: 100,
        key: "status",
      },
      {
        label: t("models.booking.attributes.bookedFor"),
        width: 150,
        key: "bookedFor",
      },
      {
        label: t("models.booking.attributes.organizerTotalPrice"),
        width: 100,
        key: "organizerPrice",
      },
      {
        label: t("models.booking.attributes.attendeeTotalPrice"),
        width: 100,
        key: "attendeePrice",
      },
      {
        label: t("models.booking.attributes.alreadyPaidPrice"),
        width: 100,
        key: "alreadyPaid",
      },
      { label: t("general.additional"), width: 100, key: "expand" },
    ],
    []
  );
}

const TagColor = ({ status }: { status: string }) => {
  const color = useStatusColor({
    danger: ["cancelled"],
    status,
  });
  const { t } = useTranslation();

  return (
    <Tag link={false} color={color}>
      {t(`statuses.${status}`)}
    </Tag>
  );
};

export function useBookingsColumns(
  bookings: ReadonlyArray<Record<string, any>>
) {
  const { t } = useTranslation();
  const attendeesHeaders = React.useMemo(
    () => [
      { label: t("general.id"), width: 50, key: "id" },
      { label: t("models.attendee.attributes.firstName"), key: "firstName" },
      { label: t("models.attendee.attributes.lastName"), key: "lastName" },
      { label: t("models.attendee.attributes.email"), key: "email" },
      { label: t("models.attendee.attributes.phone"), key: "phone" },
    ],
    []
  );

  const bookingOptionsHeaders = React.useMemo(
    () => [
      { label: t("general.id"), width: 50, key: "id" },
      { label: t("models.eventOption.attributes.title"), key: "title" },
      {
        label: t("models.bookingOption.attributes.organizerPrice"),
        key: "organizerPrice",
      },
      {
        label: t("models.bookingOption.attributes.attendeePrice"),
        key: "attendeePrice",
      },
    ],
    []
  );
  return React.useMemo(
    () =>
      bookings.map((booking) => {
        const attendeesData = booking.attendees.map(
          (attendee: any, index: number) => ({
            id: index + 1,
            firstName: attendee.firstName?.trim() || t("general.noData"),
            lastName: attendee.lastName?.trim() || t("general.noData"),
            email: attendee.email?.trim() || t("general.noData"),
            phone: attendee.phone?.trim() || t("general.noData"),
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
            <Typography level="title-lg">Attendees</Typography>,
            <Table
              hoverRow={false}
              headers={attendeesHeaders}
              data={attendeesData}
            />,
            <Typography level="title-lg">Booking Options</Typography>,
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

import React from "react";
import moment from "moment";
import UnfoldMoreDoubleIcon from "@mui/icons-material/UnfoldMoreDouble";
import { IconButton } from "@mui/joy";
import { useTranslation } from "react-i18next";
import { graphql, useFragment } from "react-relay";
import { bookings_useBookingsColumns_BookingsConnectionFragment$key } from "artifacts/bookings_useBookingsColumns_BookingsConnectionFragment.graphql";
import Link from "components/v2/Link/Link";
import { getHumanDateTime } from "lib/utils/dates";
import { getCurrencyFormat } from "lib/utils/currencyFormatter";
import useStatusColor from "lib/hooks/useStatusColor";
import Tag from "components/v2/Tag/Tag";
import Table from "components/v2/Table/Table";
import Typography from "components/v2/Typography";
import Checkbox from "components/v2/Checkbox";
import useEdges from "lib/hooks/useEdges";

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
        label: t("models.event.singular"),
        width: 150,
        key: "event",
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
  connectionFragmentRef: bookings_useBookingsColumns_BookingsConnectionFragment$key
) {
  const bookings =
    useFragment<bookings_useBookingsColumns_BookingsConnectionFragment$key>(
      graphql`
        fragment bookings_useBookingsColumns_BookingsConnectionFragment on BookingConnection {
          edges {
            node {
              id
              status
              bookedFor
              event {
                id
                title
              }
              organizerTotalPrice {
                cents
                currency {
                  name
                }
              }
              attendeeTotalPrice {
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
              attendees {
                firstName
                lastName
                phone
                email
              }
              bookingOptions {
                eventOption {
                  title
                  builtIn
                }
                status
                organizerPrice {
                  cents
                  currency {
                    name
                  }
                }
                attendeePrice {
                  cents
                  currency {
                    name
                  }
                }
              }
            }
          }
        }
      `,
      connectionFragmentRef
    );
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
      {
        label: t("models.eventOption.attributes.builtIn"),
        key: "builtIn",
      },
      {
        label: t("models.bookingOption.attributes.status"),
        key: "status",
      },
    ],
    []
  );
  const pagedBookings = useEdges(bookings);
  return React.useMemo(
    () =>
      pagedBookings
        .map((v) => v!)
        .map((booking) => {
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
                opt.eventOption.builtIn ? 0 : opt.organizerPrice.cents,
                opt.organizerPrice.currency.name
              ),
              attendeePrice: getCurrencyFormat(
                opt.eventOption.builtIn ? 0 : opt.attendeePrice.cents,
                opt.attendeePrice.currency.name
              ),
              builtIn: (
                <Checkbox label="" checked={opt.eventOption.builtIn} readOnly />
              ),
              status: <TagColor status={opt.status} />,
            })
          );
          return {
            id: (
              <Link primary href={`/my-firm/bookings/${booking.id}`}>
                {booking.id}
              </Link>
            ),
            event: (
              <Link primary href={`/my-firm/events/${booking.event.id}`}>
                {booking.event.title}
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
    [pagedBookings]
  );
}

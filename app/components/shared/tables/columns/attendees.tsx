import React from "react";
import { Box, IconButton, Stack } from "@mui/joy";
import { graphql, useFragment } from "react-relay";
import UnfoldMoreDoubleIcon from "@mui/icons-material/UnfoldMoreDouble";
import { useTranslation } from "react-i18next";
import { getCurrencyFormat } from "lib/utils/currencyFormatter";
import { attendees_BookingFragment$key } from "artifacts/attendees_BookingFragment.graphql";
import useStatusColor from "lib/hooks/useStatusColor";
import Tag from "components/v2/Tag/Tag";
import RegisterAttendee from "../../RegisterAttendee";
import DeregisterAttendee from "../../DeregisterAttendee";
import RemoveAttendee from "../../RemoveAttendeeModal";
import ChangeAttendeeOptionAvailabilityModal from "../../ChangeAttendeeOptionAvailabilityModal";
import OptionTagColor from "../../OptionTagColor/OptionTagColor";
import Typography from "../../../v2/Typography/Typography";
import Table from "../../../v2/Table/Table";
import Checkbox from "../../../v2/Checkbox";
import { ChangeAttendeeOptionAvailabilityModal_AttendeeOptionFragment$key } from "../../../../artifacts/ChangeAttendeeOptionAvailabilityModal_AttendeeOptionFragment.graphql";

export function useAttendeesHeaders() {
  const { t } = useTranslation();
  return React.useMemo(
    () => [
      { label: t("general.id"), width: 50, key: "index" },
      {
        label: t("models.attendee.attributes.fullName"),
        width: 150,
        key: "fullName",
      },
      {
        label: t("models.attendee.attributes.phone"),
        width: 150,
        key: "phone",
      },
      {
        label: t("models.attendee.attributes.email"),
        width: 150,
        key: "email",
      },
      {
        label: t("models.attendee.attributes.status"),
        width: 150,
        key: "status",
      },
      { label: t("models.attendeeOption.plural"), width: 150, key: "expand" },
      { label: t("general.actions"), width: 100, key: "actions" },
    ],
    []
  );
}

const TagColor = ({ status }: { status: string }) => {
  const color = useStatusColor({
    danger: ["removed"],
    neutral: ["not_registered"],
    primary: ["registered"],
    status,
  });
  const { t } = useTranslation();

  return (
    <Tag link={false} color={color}>
      {t(`statuses.${status}`)}
    </Tag>
  );
};

export function useAttendeesColumns(bookingFragmentRef: any) {
  const booking = useFragment<attendees_BookingFragment$key>(
    graphql`
      fragment attendees_BookingFragment on Booking {
        status
        event {
          requiresCheckIn
        }
        attendees {
          fullName
          phone
          email
          status
          attendeeOptions {
            status
            eventOption {
              title
              builtIn
            }
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
            ...ChangeAttendeeOptionAvailabilityModal_AttendeeOptionFragment
          }
          ...RegisterAttendee_AttendeeFragment
          ...DeregisterAttendee_AttendeeFragment
          ...RemoveAttendeeModal_BookingFragment
        }
      }
    `,
    bookingFragmentRef
  );
  const { t } = useTranslation();
  const attendeeOptionsHeaders = React.useMemo(
    () => [
      { label: t("general.id"), width: 50, key: "id" },
      {
        label: t("models.eventOption.attributes.title"),
        width: 100,
        key: "title",
      },
      {
        label: t("models.attendeeOption.attributes.organizerPrice"),
        width: 100,
        key: "organizerPrice",
      },
      {
        label: t("models.attendeeOption.attributes.attendeePrice"),
        width: 100,
        key: "attendeePrice",
      },
      {
        label: t("models.attendeeOption.attributes.status"),
        width: 100,
        key: "status",
      },
      {
        label: t("models.attendeeOption.attributes.builtIn"),
        width: 100,
        key: "builtIn",
      },
      { label: t("general.actions"), width: 100, key: "actions" },
    ],
    []
  );
  return React.useMemo(
    () =>
      booking.attendees.map((att, index) => {
        const attendeeOptionsData = att.attendeeOptions.map(
          (opt: Record<string, any>, i: number) => {
            const {
              eventOption: { title, builtIn },
              organizerPrice,
              attendeePrice,
              status,
            } = opt;
            return {
              id: i + 1,
              title: title || t("general.noData"),
              organizerPrice:
                getCurrencyFormat(
                  builtIn ? 0 : organizerPrice?.cents,
                  organizerPrice?.currency?.name
                ) || t("general.noData"),
              attendeePrice:
                getCurrencyFormat(
                  builtIn ? 0 : attendeePrice?.cents,
                  attendeePrice?.currency?.name
                ) || t("general.noData"),
              builtIn: <Checkbox label="" checked={builtIn} readOnly />,
              status: <OptionTagColor status={status} />,
              actions: att.status !== "removed" &&
                booking.status !== "cancelled" && (
                  <ChangeAttendeeOptionAvailabilityModal
                    optionFragmentRef={
                      opt as ChangeAttendeeOptionAvailabilityModal_AttendeeOptionFragment$key
                    }
                  />
                ),
            };
          }
        );
        return {
          index: index + 1,
          fullName:
            att.fullName?.trim() === "" ? t("general.noData") : att.fullName,
          phone: att.phone || t("general.noData"),
          email: att.email || t("general.noData"),
          status: <TagColor status={att.status} />,
          expand: (
            <IconButton size="sm">
              <UnfoldMoreDoubleIcon />
            </IconButton>
          ),
          tables: [
            <Box sx={{ marginLeft: "50px" }}>
              <Typography level="title-md">
                {t("models.attendeeOption.plural")} (
                {t("models.attendee.singular")})
              </Typography>
              <Table
                hoverRow={false}
                headers={attendeeOptionsHeaders}
                data={attendeeOptionsData}
              />
            </Box>,
          ],
          actions:
            att.status !== "removed" ? (
              <Stack direction="row" justifyContent="flex-end">
                {booking.event.requiresCheckIn &&
                  att.status === "not_registered" &&
                  booking.status !== "cancelled" && (
                    <RegisterAttendee attendeeFragmentRef={att} />
                  )}
                {booking.event.requiresCheckIn &&
                  att.status === "registered" &&
                  booking.status !== "cancelled" && (
                    <DeregisterAttendee attendeeFragmentRef={att} />
                  )}
                {booking.status !== "cancelled" &&
                  booking.attendees.length > 1 && (
                    <RemoveAttendee attendeeFragmentRef={att} />
                  )}
              </Stack>
            ) : null,
        };
      }),
    [booking]
  );
}

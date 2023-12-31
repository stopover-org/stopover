import React from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { getHumanDateTime } from "../../../../lib/utils/dates";
import useStatusColor from "../../../../lib/hooks/useStatusColor";
import Tag from "../../../v2/Tag/Tag";
import Link from "../../../v2/Link";

const TagColor = ({ status }: { status: string }) => {
  const color = useStatusColor({
    danger: ["disabled"],
    status,
  });
  const { t } = useTranslation();

  return (
    <Tag link={false} color={color}>
      {t(`statuses.${status}`)}
    </Tag>
  );
};

export function useSchedulesHeaders() {
  const { t } = useTranslation();
  return React.useMemo(
    () => [
      {
        label: t("models.event.singular"),
        width: 300,
        key: "eventId",
      },
      {
        label: t("models.schedule.attributes.scheduledFor"),
        width: 150,
        key: "date",
      },
      {
        label: t("models.attendee.plural"),
        width: 50,
        key: "attendees",
      },
      {
        label: t("models.booking.plural"),
        width: 50,
        key: "bookings",
      },
      {
        label: t("models.schedule.attributes.status"),
        width: 100,
        key: "status",
      },
    ],
    []
  );
}

export function useSchedulesColumns(
  schedules: ReadonlyArray<Record<string, any>>
) {
  return React.useMemo(
    () =>
      schedules.map((scheduleRow) => ({
        date: getHumanDateTime(moment(scheduleRow.scheduledFor)),
        bookings: scheduleRow.bookings?.length,
        attendees: scheduleRow.bookedPlaces,
        status: <TagColor status={scheduleRow.status} />,
        eventId: (
          <Link
            href={`/my-firm/events/${scheduleRow.event?.id}`}
            primary
            fontSize="sm"
          >
            {scheduleRow.event?.title}
          </Link>
        ),
      })),
    [schedules]
  );
}

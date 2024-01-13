import React from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { graphql, useFragment } from "react-relay";
import { getHumanDateTime } from "lib/utils/dates";
import useStatusColor from "lib/hooks/useStatusColor";
import Tag from "components/v2/Tag/Tag";
import Link from "components/v2/Link";
import { schedules_useSchedulesColumns_SchedulesConnectionFragment$key } from "artifacts/schedules_useSchedulesColumns_SchedulesConnectionFragment.graphql";
import useEdges from "../../../../lib/hooks/useEdges";

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
        label: t("models.schedule.attributes.id"),
        width: 150,
        key: "id",
      },
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
  schedulesConnectionRef: schedules_useSchedulesColumns_SchedulesConnectionFragment$key
) {
  const schedules =
    useFragment<schedules_useSchedulesColumns_SchedulesConnectionFragment$key>(
      graphql`
        fragment schedules_useSchedulesColumns_SchedulesConnectionFragment on ScheduleConnection {
          edges {
            node {
              id
              scheduledFor
              status
              bookedPlaces
              bookings {
                nodes {
                  id
                }
                total
              }
              event {
                id
                title
              }
            }
          }
        }
      `,
      schedulesConnectionRef
    );
  const scheduleNodes = useEdges(schedules);
  return React.useMemo(
    () =>
      scheduleNodes
        .map((v) => v!)
        .map((scheduleRow) => ({
          id: (
            <Link
              href={`/my-firm/schedules/${scheduleRow.id}`}
              primary
              fontSize="sm"
            >
              {scheduleRow.id}
            </Link>
          ),
          date: getHumanDateTime(moment(scheduleRow.scheduledFor)),
          bookings: scheduleRow.bookings.total,
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
    [scheduleNodes]
  );
}

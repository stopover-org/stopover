import { graphql, useFragment } from "react-relay";
import React from "react";
import { useTranslation } from "react-i18next";
import moment, { Moment } from "moment";
import { TimetableBookEvent_EventFragment$key } from "artifacts/TimetableBookEvent_EventFragment.graphql";
import { TimetableBookEvent_AccountFragment$key } from "artifacts/TimetableBookEvent_AccountFragment.graphql";
import Link from "components/v2/Link";
import Button from "components/v2/Button";
import { Stack } from "@mui/joy";

interface TimetableBookEventProps {
  eventFragmentRef: TimetableBookEvent_EventFragment$key;
  accountFragmentRef: TimetableBookEvent_AccountFragment$key;
  timetableDate: Moment;
}

const TimetableBookEvent = ({
  eventFragmentRef,
  accountFragmentRef,
  timetableDate,
}: TimetableBookEventProps) => {
  const event = useFragment<TimetableBookEvent_EventFragment$key>(
    graphql`
      fragment TimetableBookEvent_EventFragment on Event {
        ...useBookEventForm_EventFragment
        id
        myBookings {
          id
          bookedFor
          trip {
            id
          }
        }
      }
    `,
    eventFragmentRef
  );

  const account = useFragment<TimetableBookEvent_AccountFragment$key>(
    graphql`
      fragment TimetableBookEvent_AccountFragment on Account {
        ...useBookEventForm_AccountFragment
      }
    `,
    accountFragmentRef
  );
  const { t } = useTranslation();
  const booking = React.useMemo(
    () =>
      event.myBookings.find((b) => timetableDate.isSame(b.bookedFor, "minute")),
    [event, account, timetableDate]
  );

  const isPast = React.useMemo(
    () => moment(timetableDate).isBefore(new Date()),
    [timetableDate]
  );

  return (
    <Stack direction="row" spacing={2} useFlexGap alignItems="flex-end">
      {booking ? (
        <Link
          href={`/trips/${booking.trip.id}#${booking.id}`}
          underline={false}
        >
          <Button size="sm">
            {t("scenes.attendees.events.eventsScene.details")}
          </Button>
        </Link>
      ) : (
        <Link href={`/events/${event.id}`} underline={false}>
          <Button size="sm">{t("event.book")}</Button>
        </Link>
      )}
      {isPast && t("models.booking.reasons.past")}
    </Stack>
  );
};

export default React.memo(TimetableBookEvent);

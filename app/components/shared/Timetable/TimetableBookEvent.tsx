import { graphql, useFragment } from "react-relay";
import { Box, Stack } from "@mui/joy";
import React from "react";
import { useTranslation } from "react-i18next";
import { Moment } from "moment";
import Typography from "components/v2/Typography";
import { useBookEventForm } from "scenes/attendees/events/EventScene/useBookEventForm";
import { TimetableBookEvent_EventFragment$key } from "artifacts/TimetableBookEvent_EventFragment.graphql";
import { TimetableBookEvent_AccountFragment$key } from "artifacts/TimetableBookEvent_AccountFragment.graphql";
import Link from "components/v2/Link";
import Button from "components/v2/Button";
import SubmitButton from "components/shared/SubmitButton";

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

  const account = useFragment(
    graphql`
      fragment TimetableBookEvent_AccountFragment on Account {
        ...useBookEventForm_AccountFragment
      }
    `,
    accountFragmentRef
  );
  const { t } = useTranslation();
  const isPast = React.useMemo(
    () => timetableDate.isBefore(new Date()),
    [timetableDate]
  );

  const booking = React.useMemo(
    () =>
      event.myBookings.find((b) => timetableDate.isSame(b.bookedFor, "minute")),
    [event, account, timetableDate]
  );
  const form = useBookEventForm(event, account);

  return booking ? (
    <Link href={`/trips/${booking.trip.id}#${booking.id}`} underline={false}>
      <Button size="sm">
        {t("scenes.attendees.events.eventsScene.details")}
      </Button>
    </Link>
  ) : (
    <Box>
      <Stack direction="row" spacing={2} useFlexGap alignItems="flex-end">
        <form onSubmit={form.handleSubmit()}>
          <SubmitButton
            submitting={form.formState.isSubmitting}
            size="sm"
            color="primary"
            disabled={isPast}
          >
            {t("event.book")}
          </SubmitButton>
        </form>
        {isPast && (
          <Typography fontSize="sm">
            {t("models.booking.reasons.past")}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default React.memo(TimetableBookEvent);

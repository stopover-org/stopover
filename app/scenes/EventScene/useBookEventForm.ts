import { graphql, useFragment } from "react-relay";
import React from "react";
import * as Yup from "yup";
import moment, { Moment } from "moment";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useBookEventForm_EventFragment$key } from "./__generated__/useBookEventForm_EventFragment.graphql";
import useMutationForm from "../../lib/hooks/useMutationForm";
import useClosestDate from "../../lib/hooks/useClosestDate";
import useUniqueMomentDates from "../../lib/hooks/useUniqueMomentDates";
import { dateFormat } from "../../lib/utils/dates";

interface BookEventFields {
  eventId: string;
  date: Moment | null | undefined;
  attendeesCount: number;
}

function useDefaultValues(
  eventFragmentRef: useBookEventForm_EventFragment$key
): BookEventFields {
  const router = useRouter();
  const event = useFragment(
    graphql`
      fragment useBookEventForm_EventFragment on Event {
        id
        availableDates
        myBookings {
          bookedFor
        }
      }
    `,
    eventFragmentRef
  );
  const closestDate = useClosestDate(event.availableDates as Date[]);
  const availableDates = useUniqueMomentDates(event.availableDates as Date[]);
  const parsedDate = React.useMemo(() => {
    if (event?.myBookings?.length! > 0) {
      return moment(event?.myBookings?.[0]?.bookedFor);
    }

    const date = moment(router.query.date, dateFormat);
    if (availableDates.find((dt) => dt.isSame(date, "day"))) {
      if (date.isValid()) return date.startOf("day");
    }
    return closestDate?.startOf("day");
  }, []);

  return React.useMemo(
    () => ({
      eventId: event.id,
      date: parsedDate,
      attendeesCount: 1,
    }),
    [event]
  );
}

const validationSchema = Yup.object().shape({
  eventId: Yup.string().required(),
  date: Yup.date().required(),
  attendeesCount: Yup.number().required(),
});

export function useBookEventForm(
  eventFragmentRef: useBookEventForm_EventFragment$key
) {
  return useMutationForm(
    graphql`
      mutation useBookEventForm_BookEventMutation($input: BookEventInput!) {
        bookEvent(input: $input) {
          booking {
            id
          }
        }
      }
    `,
    ({ date, ...values }) => ({
      input: {
        bookedFor: date,
        ...values,
      },
    }),
    {
      defaultValues: useDefaultValues(eventFragmentRef),
      resolver: yupResolver(validationSchema),
      onCompleted(result) {
        console.log(result);
      },
    }
  );
}

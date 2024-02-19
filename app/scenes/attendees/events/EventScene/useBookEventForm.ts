import { graphql, useFragment } from "react-relay";
import React from "react";
import * as Yup from "yup";
import { Moment } from "moment";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "lib/hooks/useMutationForm";
import useClosestDate from "lib/hooks/useClosestDate";
import useMomentDates from "lib/hooks/useMomentDates";
import { useBookEventForm_EventFragment$key } from "artifacts/useBookEventForm_EventFragment.graphql";
import { useBookEventForm_AccountFragment$key } from "../../../../artifacts/useBookEventForm_AccountFragment.graphql";

interface BookEventFields {
  eventId: string;
  date: Moment | null | undefined;
  attendeesCount: number;
  places: number[][];
  email: string;
  phone: string;
}

function useDefaultValues(
  eventFragmentRef: useBookEventForm_EventFragment$key,
  accountFragmentRef: useBookEventForm_AccountFragment$key
): BookEventFields {
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

  const account = useFragment(
    graphql`
      fragment useBookEventForm_AccountFragment on Account {
        primaryPhone
        primaryEmail
      }
    `,
    accountFragmentRef
  );
  const closestDate = useClosestDate((event?.availableDates || []) as Date[]);
  const bookedDates = useMomentDates(
    event?.myBookings?.map((b) => b.bookedFor)
  );
  const closestBookedDate = useClosestDate(bookedDates);
  const parsedDate = React.useMemo(() => {
    if (closestBookedDate) return closestBookedDate;

    return closestDate;
  }, []);

  return React.useMemo(
    () => ({
      eventId: event.id,
      date: parsedDate,
      attendeesCount: 1,
      places: [],
      email: account.primaryEmail || "",
      phone: account.primaryPhone || "",
    }),
    [event]
  );
}

const validationSchema = Yup.object().shape({
  eventId: Yup.string().required(),
  date: Yup.date().required("Required"),
  attendeesCount: Yup.number().required("Required"),
  email: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
});

export function useBookEventForm(
  eventFragmentRef: useBookEventForm_EventFragment$key,
  accountFragmentRef: useBookEventForm_AccountFragment$key
) {
  return useMutationForm(
    graphql`
      mutation useBookEventForm_BookEventMutation($input: BookEventInput!) {
        bookEvent(input: $input) {
          booking {
            id
            event {
              ...EventScene_EventFragment
            }
            trip {
              ...TripScene_TripFragment
            }
          }
          notification
          errors
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
      defaultValues: useDefaultValues(eventFragmentRef, accountFragmentRef),
      resolver: yupResolver(validationSchema),
    }
  );
}

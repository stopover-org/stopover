import { graphql, useFragment, useMutation } from "react-relay";
import React from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Moment } from "moment";
import { useBookEventForm_EventFragment$key } from "./__generated__/useBookEventForm_EventFragment.graphql";
import { useBookEventForm_BookEventMutation } from "./__generated__/useBookEventForm_BookEventMutation.graphql";
import { setTime } from "../../lib/utils/dates";

interface BookEventFields {
  id: string;
  date: Moment | null;
  time: string | null;
  attendeesCount: number;
}

function useDefaultValues(
  eventFragmentRef: useBookEventForm_EventFragment$key
): BookEventFields {
  const event = useFragment(
    graphql`
      fragment useBookEventForm_EventFragment on Event {
        id
      }
    `,
    eventFragmentRef
  );

  return React.useMemo(
    () => ({
      id: event.id,
      date: null,
      time: null,
      attendeesCount: 1,
    }),
    [event]
  );
}

const validationSchema = Yup.object().shape({
  id: Yup.string().required(),
  date: Yup.date().required(),
  time: Yup.string().required(),
  attendeesCount: Yup.number().required(),
});

export function useBookEventForm(
  eventFragmentRef: useBookEventForm_EventFragment$key
) {
  const [bookEvent] = useMutation<useBookEventForm_BookEventMutation>(graphql`
    mutation useBookEventForm_BookEventMutation($input: BookEventInput!) {
      bookEvent(input: $input) {
        booking {
          id
        }
      }
    }
  `);

  const form = useForm<BookEventFields>({
    resolver: yupResolver(validationSchema),
    defaultValues: useDefaultValues(eventFragmentRef),
  });

  function onSubmit() {
    return function submit({ date, time, id, ...values }: BookEventFields) {
      bookEvent({
        variables: {
          input: {
            ...values,
            eventId: id,
            bookedFor: setTime(date!, time!),
          },
        },
      });
    };
  }
}

import moment, { Moment } from "moment";
import { graphql, useFragment } from "react-relay";
import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "../../../lib/hooks/useMutationForm";
import { useAttendeeEditForm_AttendeeFragment$key } from "./__generated__/useAttendeeEditForm_AttendeeFragment.graphql";

interface AttendeeEditFormFields {
  attendeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  eventOptionIds: string[];
}

function useDefaultValues(
  attendeeFragmentRef: useAttendeeEditForm_AttendeeFragment$key
): AttendeeEditFormFields {
  const attendee = useFragment(
    graphql`
      fragment useAttendeeEditForm_AttendeeFragment on Attendee {
        firstName
        lastName
        email
        phone
        id
        attendeeOptions {
          id
          eventOption {
            id
          }
        }
      }
    `,
    attendeeFragmentRef
  );

  return React.useMemo(
    () => ({
      attendeeId: attendee.id,
      firstName: attendee.firstName || "",
      lastName: attendee.lastName || "",
      email: attendee.email || "",
      phone: attendee.phone || "",
      eventOptionIds: attendee.attendeeOptions.map(
        ({ eventOption }) => eventOption.id
      ),
    }),
    [attendee]
  );
}

const validationSchema = Yup.object().shape({
  attendeeId: Yup.string().required(),
  firstName: Yup.string(),
  lastName: Yup.string(),
  email: Yup.string(),
  phone: Yup.string(),
  eventOptionIds: Yup.array().of(Yup.string().required()).required(),
});

export function useAttendeeEditForm(
  attendeeFragmentRef: useAttendeeEditForm_AttendeeFragment$key
) {
  return useMutationForm(
    graphql`
      mutation useAttendeeEditForm_UpdateBookingAttendeeMutation(
        $input: UpdateAttendeeInput!
      ) {
        updateAttendee(input: $input) {
          attendee {
            ...AttendeeEditForm_AttendeeFragment
            id
            attendeeOptions {
              id
              eventOption {
                id
              }
            }
          }
        }
      }
    `,
    (values) => ({
      input: {
        ...values,
      },
    }),
    {
      defaultValues: useDefaultValues(attendeeFragmentRef),
      resolver: yupResolver(validationSchema),
      autosave: true,
    }
  );
}

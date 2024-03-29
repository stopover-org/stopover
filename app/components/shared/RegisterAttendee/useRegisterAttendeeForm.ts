import React from "react";
import * as Yup from "yup";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "lib/hooks/useMutationForm";
import { useRegisterAttendeeForm_AttendeeFragment$key } from "artifacts/useRegisterAttendeeForm_AttendeeFragment.graphql";

interface RegisterAttendeeFields {
  attendeeId: string;
}

function useDefaultValues(
  attendeeFragmentRef: useRegisterAttendeeForm_AttendeeFragment$key
): RegisterAttendeeFields {
  const attendee = useFragment(
    graphql`
      fragment useRegisterAttendeeForm_AttendeeFragment on Attendee {
        id
      }
    `,
    attendeeFragmentRef
  );

  return React.useMemo(() => ({ attendeeId: attendee.id }), [attendee]);
}

const validationSchema = Yup.object().shape({
  attendeeId: Yup.string().required(),
});

export function useRegisterAttendeeForm(
  attendeeFragmentRef: useRegisterAttendeeForm_AttendeeFragment$key
) {
  return useMutationForm(
    graphql`
      mutation useRegisterAttendeeForm_RegisterAttendeeMutation(
        $input: RegisterAttendeeInput!
      ) {
        registerAttendee(input: $input) {
          attendee {
            booking {
              ...attendees_BookingFragment
              ...BookingScene_FirmBookingFragment
            }
          }
          notification
          errors
        }
      }
    `,
    ({ attendeeId }) => ({ input: { attendeeId } }),
    {
      defaultValues: useDefaultValues(attendeeFragmentRef),
      resolver: yupResolver(validationSchema),
    }
  );
}

import React from "react";
import * as Yup from "yup";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "lib/hooks/useMutationForm";
import { useRemoveAttendeeForm_AttendeeFragment$key } from "artifacts/useRemoveAttendeeForm_AttendeeFragment.graphql";

interface DeregisterAttendeeFields {
  attendeeId: string;
}

function useDefaultValues(
  attendeeFragmentRef: useRemoveAttendeeForm_AttendeeFragment$key
): DeregisterAttendeeFields {
  const attendee = useFragment(
    graphql`
      fragment useRemoveAttendeeForm_AttendeeFragment on Attendee {
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

export function useRemoveAttendeeForm(
  attendeeFragmentRef: useRemoveAttendeeForm_AttendeeFragment$key,
  onSuccess: () => void = () => {}
) {
  return useMutationForm(
    graphql`
      mutation useRemoveAttendeeForm_RemoveAttendeeMutation(
        $input: RemoveAttendeeInput!
      ) {
        removeAttendee(input: $input) {
          booking {
            ...BookingSummary_BookingFragment
            ...BookingScene_FirmBookingFragment
            ...attendees_BookingFragment
            ...useBookingEditForm_BookingFragment
            ...BookingEditForm_BookingFragment
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
      onCompleted: onSuccess,
    }
  );
}

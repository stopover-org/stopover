import React from "react";
import * as Yup from "yup";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "lib/hooks/useMutationForm";
import { useChangeAttendeeOptionAvailabilityForm_AttendeeOption$key } from "artifacts/useChangeAttendeeOptionAvailabilityForm_AttendeeOption.graphql";

interface DeregisterAttendeeFields {
  attendeeOptionId: string;
}

function useDefaultValues(
  optionFragmentRef: useChangeAttendeeOptionAvailabilityForm_AttendeeOption$key
): DeregisterAttendeeFields {
  const option = useFragment(
    graphql`
      fragment useChangeAttendeeOptionAvailabilityForm_AttendeeOption on AttendeeOption {
        id
      }
    `,
    optionFragmentRef
  );

  return React.useMemo(() => ({ attendeeOptionId: option.id }), [option]);
}

const validationSchema = Yup.object().shape({
  attendeeOptionId: Yup.string().required(),
});

export function useChangeAttendeeOptionAvailabilityForm(
  optionFragmentRef: useChangeAttendeeOptionAvailabilityForm_AttendeeOption$key,
  onSuccess: () => void
) {
  return useMutationForm(
    graphql`
      mutation useChangeAttendeeOptionAvailabilityForm_ChangeAttendeeOptionAvailabilityMutation(
        $input: ChangeAttendeeOptionAvailabilityInput!
      ) {
        changeAttendeeOptionAvailability(input: $input) {
          attendeeOption {
            attendee {
              booking {
                ...attendees_BookingFragment
                ...BookingScene_FirmBookingFragment
              }
            }
          }
          notification
          errors
        }
      }
    `,
    ({ attendeeOptionId }) => ({ input: { attendeeOptionId } }),
    {
      defaultValues: useDefaultValues(optionFragmentRef),
      resolver: yupResolver(validationSchema),
      onCompleted: onSuccess,
    }
  );
}

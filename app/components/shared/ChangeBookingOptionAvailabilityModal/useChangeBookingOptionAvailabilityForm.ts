import React from "react";
import * as Yup from "yup";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "lib/hooks/useMutationForm";
import { useChangeBookingOptionAvailabilityForm_BookingOption$key } from "artifacts/useChangeBookingOptionAvailabilityForm_BookingOption.graphql";

interface DeregisterAttendeeFields {
  bookingOptionId: string;
}

function useDefaultValues(
  optionFragmentRef: useChangeBookingOptionAvailabilityForm_BookingOption$key
): DeregisterAttendeeFields {
  const option = useFragment(
    graphql`
      fragment useChangeBookingOptionAvailabilityForm_BookingOption on BookingOption {
        id
      }
    `,
    optionFragmentRef
  );

  return React.useMemo(() => ({ bookingOptionId: option.id }), [option]);
}

const validationSchema = Yup.object().shape({
  bookingOptionId: Yup.string().required(),
});

export function useChangeBookingOptionAvailabilityForm(
  optionFragmentRef: useChangeBookingOptionAvailabilityForm_BookingOption$key,
  onSuccess: () => void
) {
  return useMutationForm(
    graphql`
      mutation useChangeBookingOptionAvailabilityForm_ChangeBookingOptionAvailabilityMutation(
        $input: ChangeBookingOptionAvailabilityInput!
      ) {
        changeBookingOptionAvailability(input: $input) {
          bookingOption {
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
    ({ bookingOptionId }) => ({ input: { bookingOptionId } }),
    {
      defaultValues: useDefaultValues(optionFragmentRef),
      resolver: yupResolver(validationSchema),
      onCompleted: onSuccess,
    }
  );
}

import React from "react";
import * as Yup from "yup";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "../../../lib/hooks/useMutationForm";
import { useAddAttendeeForm_BookingFragment$key } from "../../../artifacts/useAddAttendeeForm_BookingFragment.graphql";

interface AddAttendeeFields {
  bookingId: string;
}

function useDefaultValues(
  bookingFragmentRef: useAddAttendeeForm_BookingFragment$key
): AddAttendeeFields {
  const booking = useFragment(
    graphql`
      fragment useAddAttendeeForm_BookingFragment on Booking {
        id
      }
    `,
    bookingFragmentRef
  );

  return React.useMemo(() => ({ bookingId: booking.id }), [booking]);
}

const validationSchema = Yup.object().shape({
  bookingId: Yup.string().required("Required"),
});

export function useAddAttendeeForm(
  bookingFragmentRef: useAddAttendeeForm_BookingFragment$key
) {
  return useMutationForm(
    graphql`
      mutation useAddAttendeeForm_AddAttendeeMutation(
        $input: AddAttendeeInput!
      ) {
        addAttendee(input: $input) {
          booking {
            ...BookingScene_FirmBookingFragment
          }
          notification
          errors
        }
      }
    `,
    ({ bookingId }) => ({ input: { bookingId } }),
    {
      defaultValues: useDefaultValues(bookingFragmentRef),
      resolver: yupResolver(validationSchema),
    }
  );
}

import { graphql, useFragment } from "react-relay";
import React from "react";
import { useCreateNotificationForm_BookingFragment$key } from "artifacts/useCreateNotificationForm_BookingFragment.graphql";
import useMutationForm from "lib/hooks/useMutationForm";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface PublishEventFields {
  bookingId: string;
  subject: string;
  content: string;
}

function useDefaultValues(
  bookingFragmentRef: useCreateNotificationForm_BookingFragment$key
): PublishEventFields {
  const booking = useFragment<useCreateNotificationForm_BookingFragment$key>(
    graphql`
      fragment useCreateNotificationForm_BookingFragment on Booking {
        id
      }
    `,
    bookingFragmentRef
  );

  return React.useMemo(
    () => ({ bookingId: booking.id, subject: "", content: "" }),
    [booking]
  );
}

const validationSchema = Yup.object().shape({
  subject: Yup.string().required(),
  content: Yup.string().required(),
});

export function useCreateNotificationForm(
  bookingFragmentRef: useCreateNotificationForm_BookingFragment$key,
  onComplete?: () => void
) {
  return useMutationForm(
    graphql`
      mutation useCreateNotificationForm_CreateNotificationMutation(
        $input: CreateNotificationInput!
      ) {
        createNotification(input: $input) {
          booking {
            ...BookingInformation_BookingFragment
          }
          notification
          errors
        }
      }
    `,
    ({ bookingId, subject, content }) => ({
      input: { bookingId, subject, content },
    }),
    {
      defaultValues: useDefaultValues(bookingFragmentRef),
      resolver: yupResolver(validationSchema),
      onCompleted: onComplete,
    }
  );
}

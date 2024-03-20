import React from "react";
import * as Yup from "yup";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import { useVerifyEvent_EventFragment$key } from "artifacts/useVerifyEvent_EventFragment.graphql";
import useMutationForm from "lib/hooks/useMutationForm";

interface VerifyEventFields {
  eventId: string;
}

function useDefaultValues(
  eventFragmentRef: useVerifyEvent_EventFragment$key
): VerifyEventFields {
  const event = useFragment(
    graphql`
      fragment useVerifyEvent_EventFragment on Event {
        id
      }
    `,
    eventFragmentRef
  );

  return React.useMemo(() => ({ eventId: event.id }), [event]);
}

const validationSchema = Yup.object().shape({
  eventId: Yup.string().required(),
});

export function useVerifyEvent(
  eventFragmentRef: useVerifyEvent_EventFragment$key,
  onComplete?: () => void
) {
  return useMutationForm(
    graphql`
      mutation useVerifyEvent_VerifyEventMutation($input: VerifyEventInput!) {
        verifyEvent(input: $input) {
          event {
            ...EventScene_FirmEventFragment
          }
          notification
          errors
        }
      }
    `,
    ({ eventId }) => ({ input: { eventId } }),
    {
      defaultValues: useDefaultValues(eventFragmentRef),
      resolver: yupResolver(validationSchema),
      onCompleted: onComplete,
    }
  );
}

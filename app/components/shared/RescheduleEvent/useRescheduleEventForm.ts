import React from "react";
import * as Yup from "yup";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "../../../lib/hooks/useMutationForm";
import { useRescheduleEventForm_EventFragment$key } from "./__generated__/useRescheduleEventForm_EventFragment.graphql";

interface RescheduleEventFields {
  eventId: string;
}

function useDefaultValues(
  eventFragmentRef: useRescheduleEventForm_EventFragment$key
): RescheduleEventFields {
  const event = useFragment(
    graphql`
      fragment useRescheduleEventForm_EventFragment on Event {
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

export function useRescheduleEventForm(
  eventFragmentRef: useRescheduleEventForm_EventFragment$key
) {
  return useMutationForm(
    graphql`
      mutation useRescheduleEventForm_RescheduleEventMutation(
        $input: RescheduleEventInput!
      ) {
        rescheduleEvent(input: $input) {
          event {
            ...EventScene_FirmEventFragment
            ...SchedulesInformation_EventFragment
          }
        }
      }
    `,
    ({ eventId }) => ({ input: { eventId } }),
    {
      defaultValues: useDefaultValues(eventFragmentRef),
      resolver: yupResolver(validationSchema),
    }
  );
}
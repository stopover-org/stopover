import React from "react";
import * as Yup from "yup";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "../../../lib/hooks/useMutationForm";
import { useRemoveEventForm_EventFragment$key } from "../../../artifacts/useRemoveEventForm_EventFragment.graphql";

interface RemoveEventFields {
  eventId: string;
}

function useDefaultValues(
  eventFragmentRef: useRemoveEventForm_EventFragment$key
): RemoveEventFields {
  const event = useFragment(
    graphql`
      fragment useRemoveEventForm_EventFragment on Event {
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

export function useRemoveEventForm(
  eventFragmentRef: useRemoveEventForm_EventFragment$key
) {
  return useMutationForm(
    graphql`
      mutation useRemoveEventForm_RemoveEventMutation(
        $input: RemoveEventInput!
      ) {
        removeEvent(input: $input) {
          event {
            ...EventScene_FirmEventFragment
            ...SchedulesInformation_EventFragment
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
    }
  );
}

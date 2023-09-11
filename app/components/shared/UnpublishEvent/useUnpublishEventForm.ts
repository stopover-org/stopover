import React from "react";
import * as Yup from "yup";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "../../../lib/hooks/useMutationForm";
import { useUnpublishEventForm_EventFragment$key } from "../../../artifacts/useUnpublishEventForm_EventFragment.graphql";

interface UnpublishEventFields {
  eventId: string;
}

function useDefaultValues(
  eventFragmentRef: useUnpublishEventForm_EventFragment$key
): UnpublishEventFields {
  const event = useFragment(
    graphql`
      fragment useUnpublishEventForm_EventFragment on Event {
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

export function useUnpublishEventForm(
  eventFragmentRef: useUnpublishEventForm_EventFragment$key
) {
  return useMutationForm(
    graphql`
      mutation useUnpublishEventForm_UnpublishEventMutation(
        $input: UnpublishEventInput!
      ) {
        unpublishEvent(input: $input) {
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

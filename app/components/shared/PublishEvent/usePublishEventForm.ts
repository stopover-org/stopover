import React from "react";
import * as Yup from "yup";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "../../../lib/hooks/useMutationForm";
import { usePublishEventForm_EventFragment$key } from "./__generated__/usePublishEventForm_EventFragment.graphql";

interface PublishEventFields {
  eventId: string;
}

function useDefaultValues(
  eventFragmentRef: usePublishEventForm_EventFragment$key
): PublishEventFields {
  const event = useFragment(
    graphql`
      fragment usePublishEventForm_EventFragment on Event {
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

export function usePublishEventForm(
  eventFragmentRef: usePublishEventForm_EventFragment$key
) {
  return useMutationForm(
    graphql`
      mutation usePublishEventForm_PublishEventMutation(
        $input: PublishEventInput!
      ) {
        publishEvent(input: $input) {
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

import React from "react";
import * as Yup from "yup";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "../../../lib/hooks/useMutationForm";
import { useUnpublishEventForm_EventFragment$key } from "./__generated__/useUnpublishEventForm_EventFragment.graphql";
import { useUnpublishEventForm_UnpublishEventMutation } from "./__generated__/useUnpublishEventForm_UnpublishEventMutation.graphql";

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
  eventFragmentRef: useUnpublishEventForm_UnpublishEventMutation
) {
  return useMutationForm(
    graphql`
      mutation useUnpublishEventForm_UnpublishEventMutation(
        $input: UnpublishEventInput!
      ) {
        unpublishEvent(input: $input) {
          event {
            ...EventScene_FirmEventFragment
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

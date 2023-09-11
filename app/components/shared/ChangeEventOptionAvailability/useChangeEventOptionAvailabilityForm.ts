import React from "react";
import * as Yup from "yup";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "../../../lib/hooks/useMutationForm";
import { useChangeEventOptionAvailabilityForm_EventOption$key } from "../../../artifacts/useChangeEventOptionAvailabilityForm_EventOption.graphql";

interface DeregisterAttendeeFields {
  eventOptionId: string;
}

function useDefaultValues(
  optionFragmentRef: useChangeEventOptionAvailabilityForm_EventOption$key
): DeregisterAttendeeFields {
  const option = useFragment(
    graphql`
      fragment useChangeEventOptionAvailabilityForm_EventOption on EventOption {
        id
      }
    `,
    optionFragmentRef
  );

  return React.useMemo(() => ({ eventOptionId: option.id }), [option]);
}

const validationSchema = Yup.object().shape({
  eventOptionId: Yup.string().required(),
});

export function useChangeEventOptionAvailabilityForm(
  optionFragmentRef: useChangeEventOptionAvailabilityForm_EventOption$key
) {
  return useMutationForm(
    graphql`
      mutation useChangeEventOptionAvailabilityForm_ChangeEventOptionAvailabilityMutation(
        $input: ChangeEventOptionAvailabilityInput!
      ) {
        changeEventOptionAvailability(input: $input) {
          eventOption {
            event {
              ...EventOptionsInformation_EventFragment
            }
          }
          notification
          errors
        }
      }
    `,
    ({ eventOptionId }) => ({ input: { eventOptionId } }),
    {
      defaultValues: useDefaultValues(optionFragmentRef),
      resolver: yupResolver(validationSchema),
    }
  );
}

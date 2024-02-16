import { graphql, useFragment } from "react-relay";
import React from "react";
import useMutationForm from "lib/hooks/useMutationForm";
import { useCreateEventPlacementForm_EventFragment$key } from "artifacts/useCreateEventPlacementForm_EventFragment.graphql";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface CreateEventPlacementFields {
  eventId: string;
  widthPlaces: number;
  heightPlaces: number;
}

function useDefaultValues(
  eventFragmentRef: useCreateEventPlacementForm_EventFragment$key
): CreateEventPlacementFields {
  const event = useFragment(
    graphql`
      fragment useCreateEventPlacementForm_EventFragment on Event {
        id
      }
    `,
    eventFragmentRef
  );

  return React.useMemo(
    () => ({ eventId: event.id, title: "", widthPlaces: 0, heightPlaces: 0 }),
    [event]
  );
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  widthPlaces: Yup.number().min(1).required(),
  heightPlaces: Yup.number().min(1).required(),
});

export function useCreateEventPlacementForm(
  eventFragmentRef: useCreateEventPlacementForm_EventFragment$key,
  onSuccess: () => void
) {
  return useMutationForm(
    graphql`
      mutation useCreateEventPlacementForm_CreateEventPlacementMutation(
        $input: CreatePlacementInput!
      ) {
        createPlacement(input: $input) {
          eventPlacement {
            id
            title
            event {
              ...EventPlacementsInformation_EventFragment
            }
          }
          notification
          errors
        }
      }
    `,
    (values) => ({
      input: values,
    }),
    {
      defaultValues: useDefaultValues(eventFragmentRef),
      resolver: yupResolver(validationSchema),
      onCompleted: onSuccess,
    }
  );
}

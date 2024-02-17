import { graphql, useFragment } from "react-relay";
import React from "react";
import useMutationForm from "lib/hooks/useMutationForm";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEditEventPlacementForm_EventPlacementFragment$key } from "artifacts/useEditEventPlacementForm_EventPlacementFragment.graphql";

interface EditEventPlacementFields {
  placementId: string;
  widthPlaces: number;
  heightPlaces: number;
}

function useDefaultValues(
  eventPlacementFragmentRef: useEditEventPlacementForm_EventPlacementFragment$key
): EditEventPlacementFields {
  const placement =
    useFragment<useEditEventPlacementForm_EventPlacementFragment$key>(
      graphql`
        fragment useEditEventPlacementForm_EventPlacementFragment on EventPlacement {
          id
          title
          widthPlaces
          heightPlaces
        }
      `,
      eventPlacementFragmentRef
    );

  return React.useMemo(
    () => ({
      placementId: placement.id,
      title: placement.title,
      widthPlaces: placement.widthPlaces,
      heightPlaces: placement.heightPlaces,
    }),
    [placement]
  );
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  widthPlaces: Yup.number().min(1).required(),
  heightPlaces: Yup.number().min(1).required(),
});

export function useEditEventPlacementForm(
  placementFragmentRef: useEditEventPlacementForm_EventPlacementFragment$key,
  onSuccess: () => void
) {
  return useMutationForm(
    graphql`
      mutation useEditEventPlacementForm_CreateEventPlacementMutation(
        $input: UpdatePlacementInput!
      ) {
        updatePlacement(input: $input) {
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
      defaultValues: useDefaultValues(placementFragmentRef),
      resolver: yupResolver(validationSchema),
      onCompleted: onSuccess,
    }
  );
}

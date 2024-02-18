import { graphql, useFragment } from "react-relay";
import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEditEventTourPlanForm_UpdateEventMutation } from "artifacts/useEditEventTourPlanForm_UpdateEventMutation.graphql";
import { useEditEventTourPlanForm_EventFragment$key } from "artifacts/useEditEventTourPlanForm_EventFragment.graphql";
import useMutationForm from "lib/hooks/useMutationForm";

export interface TourPlace {
  id?: string;
  title: string;
  description?: string;
  durationTime?: string;
  image?: string | null;
}

export interface EditEventTourPlanFormFields {
  eventId: string;
  tourPlanId?: string;
  title?: string;
  description?: string;
  image?: string | null;
  tourPlaces: Array<TourPlace>;
}

function useDefaultValues(
  eventFragmentRef: useEditEventTourPlanForm_EventFragment$key
): EditEventTourPlanFormFields {
  const event = useFragment<useEditEventTourPlanForm_EventFragment$key>(
    graphql`
      fragment useEditEventTourPlanForm_EventFragment on Event {
        id
        tourPlan {
          id
          title
          description
          image
          tourPlaces {
            id
            title
            description
            durationTime
            image
          }
        }
      }
    `,
    eventFragmentRef
  );

  return React.useMemo(
    () => ({
      eventId: event.id,
      tourPlanId: event.tourPlan?.id,
      title: event.tourPlan?.title || "",
      description: event.tourPlan?.description || "",
      image: event.tourPlan?.image,
      tourPlaces:
        event.tourPlan?.tourPlaces?.map((place) => ({
          id: place.id,
          title: place.title || "",
          description: place.description || "",
          durationTime: place.durationTime || "",
          image: place.image,
        })) || [],
    }),
    [event]
  );
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().nullable(),
});

export function useEditEventTourPlanForm(
  eventFragmentRef: useEditEventTourPlanForm_EventFragment$key,
  onSuccess?: () => void
) {
  return useMutationForm<
    EditEventTourPlanFormFields,
    useEditEventTourPlanForm_UpdateEventMutation
  >(
    graphql`
      mutation useEditEventTourPlanForm_UpdateEventMutation(
        $input: UpdateEventInput!
      ) {
        updateEvent(input: $input) {
          event {
            id
          }
        }
      }
    `,
    (values) => ({ input: values }),
    {
      defaultValues: useDefaultValues(eventFragmentRef),
      resolver: yupResolver(validationSchema),
      onCompleted: onSuccess,
    }
  );
}

import React from "react";
import * as Yup from "yup";
import useMutationForm from "lib/hooks/useMutationForm";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import { numberTransform } from "lib/utils/transforms";
import { useCreateEventOptionForm_UpdateEventMutation } from "artifacts/useCreateEventOptionForm_UpdateEventMutation.graphql";
import { useCreateEventOptionForm_EventFragment$key } from "artifacts/useCreateEventOptionForm_EventFragment.graphql";

export interface CreateEventOptionFormFields {
  eventId: string;
  eventOptions: Array<{
    id?: string;
    title: string;
    organizerPriceCents: number;
    builtIn: boolean;
    forAttendee: boolean;
  }>;
}

function useDefaultValues(
  eventFragmentRef: useCreateEventOptionForm_EventFragment$key
): CreateEventOptionFormFields {
  const event = useFragment<useCreateEventOptionForm_EventFragment$key>(
    graphql`
      fragment useCreateEventOptionForm_EventFragment on Event {
        id
        eventOptions {
          id
          title
          organizerPrice {
            cents
            currency {
              name
            }
          }
          builtIn
          forAttendee
        }
      }
    `,
    eventFragmentRef
  );
  return React.useMemo(
    () => ({
      eventId: event.id,
      eventOptions: [
        ...event.eventOptions.map((opt) => ({
          id: opt.id,
          title: opt.title,
          organizerPriceCents: opt.organizerPrice?.cents || 0,
          builtIn: opt.builtIn,
          forAttendee: opt.forAttendee,
        })),
        {
          title: "",
          organizerPriceCents: 0,
          builtIn: false,
          forAttendee: false,
        },
      ],
    }),
    []
  );
}

const validationSchema = Yup.object().shape({
  eventOptions: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required(),
        organizerPriceCents: Yup.number().transform(numberTransform).required(),
        builtIn: Yup.boolean().required(),
        forAttendee: Yup.boolean().required(),
      })
    )
    .required(),
});

export function useCreateEventOptionForm(
  eventFragmentRef: useCreateEventOptionForm_EventFragment$key,
  onComplete: () => void
) {
  return useMutationForm<
    CreateEventOptionFormFields,
    useCreateEventOptionForm_UpdateEventMutation
  >(
    graphql`
      mutation useCreateEventOptionForm_UpdateEventMutation(
        $input: UpdateEventInput!
      ) {
        updateEvent(input: $input) {
          event {
            ...EventOptionsInformation_EventFragment
          }
          notification
          errors
        }
      }
    `,
    (values) => ({
      input: {
        ...values,
        eventOptions: values.eventOptions.map(
          ({ organizerPriceCents, ...opt }) => ({
            organizerPriceCents: organizerPriceCents * 100,
            ...opt,
          })
        ),
      },
    }),
    {
      defaultValues: useDefaultValues(eventFragmentRef),
      resolver: yupResolver(validationSchema),
      onCompleted: onComplete,
    }
  );
}

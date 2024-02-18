import { graphql, useFragment } from "react-relay";
import React from "react";
import * as Yup from "yup";
import { numberTransform } from "lib/utils/transforms";
import { useEditEventCancellationsForm_EventFragment$key } from "artifacts/useEditEventCancellationsForm_EventFragment.graphql";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "lib/hooks/useMutationForm";
import { useEditEventCancellationsForm_UpdateEventMutation } from "artifacts/useEditEventCancellationsForm_UpdateEventMutation.graphql";

export interface EditEventCancellationFormFields {
  eventId: string;
  bookingCancellationOptions: Array<{
    id?: string;
    deadline: number;
    penaltyPriceCents: number;
    description: string;
  }>;
}

function useDefaultValues(
  eventFragmentRef: useEditEventCancellationsForm_EventFragment$key
): EditEventCancellationFormFields {
  const event = useFragment<useEditEventCancellationsForm_EventFragment$key>(
    graphql`
      fragment useEditEventCancellationsForm_EventFragment on Event {
        id
        bookingCancellationOptions {
          id
          deadline
          description
          penaltyPrice {
            cents
          }
        }
      }
    `,
    eventFragmentRef
  );

  return React.useMemo(
    () => ({
      eventId: event.id,
      bookingCancellationOptions: event.bookingCancellationOptions.map(
        (opt) => ({
          id: opt.id,
          deadline: opt.deadline,
          description: opt.description,
          penaltyPriceCents: opt.penaltyPrice.cents / 100,
        })
      ),
    }),
    [event]
  );
}

const validationSchema = Yup.object().shape({
  bookingCancellationOptions: Yup.array().of(
    Yup.object().shape({
      deadline: Yup.number().transform(numberTransform).required("Required"),
      description: Yup.string().required("Required"),
      penaltyPriceCents: Yup.number().required("Required"),
    })
  ),
});

export function useEditEventCancellationsForm(
  eventFragmentRef: useEditEventCancellationsForm_EventFragment$key,
  onComplete: () => void
) {
  return useMutationForm<
    EditEventCancellationFormFields,
    useEditEventCancellationsForm_UpdateEventMutation
  >(
    graphql`
      mutation useEditEventCancellationsForm_UpdateEventMutation(
        $input: UpdateEventInput!
      ) {
        updateEvent(input: $input) {
          event {
            bookingCancellationOptions {
              deadline
              description
              penaltyPrice {
                cents
                currency {
                  name
                }
              }
            }
          }
        }
      }
    `,
    (values) => ({
      input: {
        ...values,
        bookingCancellationOptions: values.bookingCancellationOptions.map(
          (opt) => ({ ...opt, penaltyPriceCents: opt.penaltyPriceCents * 100 })
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

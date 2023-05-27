import React from "react";
import * as Yup from "yup";
import { graphql } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "../../lib/hooks/useMutationForm";

interface CreateEventFields {
  title: string;
  description: string;
  houseNumber: string;
  street: string;
  city: string;
  country: string;
  region: string;
  fullAddress: string;
  durationTime: string;
  eventType: string;
  maxAttendees: number;
  minAttendees: number;
  organizerPricePerUomCents: number;
  recurringType: string;
  requiresCheckIn: boolean;
  requiresContract: boolean;
  requiresPassport: boolean;
  requiresPrepaid: boolean;
  images: string[];
}

function useDefaultValues(): CreateEventFields {
  return React.useMemo(
    () => ({
      title: "",
      description: "",
      houseNumber: "",
      street: "",
      city: "",
      country: "",
      region: "",
      fullAddress: "",
      durationTime: "",
      eventType: "excursion",
      maxAttendees: 0,
      minAttendees: 0,
      organizerPricePerUomCents: 0,
      recurringType: "regular",
      requiresCheckIn: false,
      requiresContract: false,
      requiresPassport: false,
      requiresPrepaid: false,
      images: [],
    }),
    []
  );
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  houseNumber: Yup.string(),
  street: Yup.string(),
  city: Yup.string(),
  country: Yup.string(),
  region: Yup.string(),
  fullAddress: Yup.string(),
  durationTime: Yup.string(),
  eventType: Yup.string(),
  maxAttendees: Yup.number(),
  minAttendees: Yup.number(),
  organizerPricePerUomCents: Yup.number(),
  recurringType: Yup.string(),
  requiresCheckIn: Yup.boolean(),
  requiresContract: Yup.boolean(),
  requiresPassport: Yup.boolean(),
  requiresPrepaid: Yup.boolean(),
});

export function useCreateEventForm() {
  return useMutationForm(
    graphql`
      mutation useCreateEventForm_CreateEventMutation(
        $input: CreateEventInput!
      ) {
        createEvent(input: $input) {
          event {
            id
          }
        }
      }
    `,
    ({ images, ...values }) => ({
      input: {
        ...values,
        base64Images: images,
      },
    }),
    {
      defaultValues: useDefaultValues(),
      resolver: yupResolver(validationSchema),
    }
  );
}

import React from "react";
import * as Yup from "yup";
import { graphql } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import useMutationForm from "../../../../lib/hooks/useMutationForm";

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
  images: string[];
  dates: Array<{
    day: string | null;
    hour: number | null;
    minute: number | null;
  }>;
}

function useDefaultValues(): CreateEventFields {
  return React.useMemo(
    () => ({
      dates: [{ day: null, hour: null, minute: null }],
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
    ({ images, dates, ...values }) => ({
      input: {
        ...values,
        base64Images: images,
        dates: dates.map((dt) => `${dt.day} ${dt.hour}:${dt.minute}`),
      },
    }),
    {
      defaultValues: useDefaultValues(),
      resolver: yupResolver(validationSchema),
    }
  );
}

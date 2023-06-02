import React from "react";
import * as Yup from "yup";
import { graphql } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import useMutationForm from "../../../../lib/hooks/useMutationForm";
import {
  EventTypeEnum,
  RecurringTypeEnum,
  useCreateEventForm_CreateEventMutation,
} from "./__generated__/useCreateEventForm_CreateEventMutation.graphql";

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
  eventType: EventTypeEnum;
  maxAttendees?: number;
  minAttendees?: number;
  organizerPricePerUomCents?: number;
  recurringType: RecurringTypeEnum;
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
      durationTime: "0h 0m",
      eventType: "excursion",
      maxAttendees: undefined,
      minAttendees: undefined,
      recurringType: "general",
      requiresCheckIn: false,
      requiresContract: false,
      requiresPassport: false,
      images: [],
    }),
    []
  );
}

const validationSchema = Yup.object().shape({
  dates: Yup.array()
    .of(
      Yup.object().shape({
        day: Yup.string().required(),
        hour: Yup.string().required(),
        minute: Yup.string().required(),
      })
    )
    .required(),
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
  images: Yup.array(),
});

export function useCreateEventForm() {
  console.log();
  const router = useRouter();
  return useMutationForm<
    CreateEventFields,
    useCreateEventForm_CreateEventMutation
  >(
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
      onCompleted(result) {
        if (result.createEvent?.event?.id) {
          router.replace(`my-firm/events/${result.createEvent?.event?.id}`);
        }
      },
    }
  );
}

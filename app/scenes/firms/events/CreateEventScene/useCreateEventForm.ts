import React from "react";
import * as Yup from "yup";
import { graphql } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { Moment } from "moment";
import useMutationForm from "../../../../lib/hooks/useMutationForm";
import {
  EventTypeEnum,
  RecurringTypeEnum,
  useCreateEventForm_CreateEventMutation,
} from "./__generated__/useCreateEventForm_CreateEventMutation.graphql";
import { dateTimeFormat } from "../../../../lib/utils/dates";

export interface CreateEventFields {
  city: string;
  country: string;
  description: string;
  durationTime: string;
  eventType: EventTypeEnum;
  fullAddress: string;
  houseNumber: string;
  images: string[];
  maxAttendees?: number;
  minAttendees?: number;
  organizerPricePerUomCents?: number;
  recurringType: RecurringTypeEnum;
  region: string;
  requiresCheckIn: boolean;
  requiresContract: boolean;
  requiresPassport: boolean;
  recurringDates: Array<{
    day: string | null;
    hour: number | null;
    minute: number | null;
  }>;
  singleDates: Moment[];
  street: string;
  title: string;
}

function useDefaultValues(): CreateEventFields {
  return React.useMemo(
    () => ({
      city: "",
      country: "",
      description: "",
      durationTime: "0h 0m",
      eventType: "excursion",
      fullAddress: "",
      houseNumber: "",
      images: [],
      maxAttendees: undefined,
      minAttendees: undefined,
      recurringDates: [{ day: null, hour: null, minute: null }],
      recurringType: "general",
      region: "",
      requiresCheckIn: false,
      requiresContract: false,
      requiresPassport: false,
      singleDates: [],
      street: "",
      title: "",
    }),
    []
  );
}

const validationSchema = Yup.object().shape({
  city: Yup.string(),
  country: Yup.string(),
  description: Yup.string().required(),
  durationTime: Yup.string().required(),
  eventType: Yup.string(),
  fullAddress: Yup.string(),
  houseNumber: Yup.string(),
  images: Yup.array(),
  maxAttendees: Yup.number(),
  minAttendees: Yup.number(),
  organizerPricePerUomCents: Yup.number().required(),
  recurringDates: Yup.array()
    .of(
      Yup.object().shape({
        day: Yup.string().required(),
        hour: Yup.string().required(),
        minute: Yup.string().required(),
      })
    )
    .required(),
  recurringType: Yup.string().required(),
  region: Yup.string(),
  requiresCheckIn: Yup.boolean(),
  requiresContract: Yup.boolean(),
  requiresPassport: Yup.boolean(),
  singleDates: Yup.array().required(),
  street: Yup.string(),
  title: Yup.string().required(),
});

export function useCreateEventForm() {
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
    ({ images, singleDates, recurringDates, ...values }) => ({
      input: {
        ...values,
        base64Images: images,
        recurringDates: recurringDates.map(
          (dt) => `${dt.day} ${dt.hour}:${dt.minute}`
        ),
        singleDates: singleDates.map((date) => date.format(dateTimeFormat)),
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

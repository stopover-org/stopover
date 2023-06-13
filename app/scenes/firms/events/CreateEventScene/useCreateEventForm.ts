import React from "react";
import * as Yup from "yup";
import { graphql } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import moment, { Moment } from "moment";
import useMutationForm from "../../../../lib/hooks/useMutationForm";
import {
  EventTypeEnum,
  RecurringTypeEnum,
  useCreateEventForm_CreateEventMutation,
} from "./__generated__/useCreateEventForm_CreateEventMutation.graphql";
import { dateTimeFormat, setTime } from "../../../../lib/utils/dates";
import { numberTransform } from "../../../../lib/utils/validations";

export interface CreateEventFields {
  city?: string;
  country?: string;
  description: string;
  durationTime: string;
  eventOptions: Array<{
    title: string;
    organizerPriceCents: number;
    builtIn: boolean;
  }>;
  eventType: EventTypeEnum;
  fullAddress: string;
  houseNumber?: string;
  images?: string[];
  maxAttendees?: number;
  minAttendees?: number;
  organizerPricePerUomCents?: number;
  recurringType: RecurringTypeEnum;
  region?: string;
  requiresCheckIn: boolean;
  requiresContract: boolean;
  requiresPassport: boolean;
  recurringDates: Array<{
    day: string | null;
    hour: number | null;
    minute: number | null;
  }>;
  singleDates: Array<{
    date: Moment;
    hour: number | null;
    minute: number | null;
  }>;
  street?: string;
  title: string;
}

function useDefaultValues(): Partial<CreateEventFields> {
  return React.useMemo(
    () => ({
      eventOptions: [],
      eventType: "excursion",
      images: [],
      recurringDates: [{ day: null, hour: null, minute: null }],
      recurringType: "general",
      requiresCheckIn: false,
      requiresContract: false,
      requiresPassport: false,
      singleDates: [],
    }),
    []
  );
}

const validationSchema = Yup.object().shape({
  city: Yup.string(),
  country: Yup.string(),
  description: Yup.string().required("Required"),
  durationTime: Yup.string().required("Required"),
  eventOptions: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required("Required"),
        organizerPriceCents: Yup.number()
          .transform((value) => numberTransform(value))
          .required("Required"),
        builtIn: Yup.boolean().required("Required"),
      })
    )
    .required("Required"),
  eventType: Yup.string(),
  fullAddress: Yup.string().required("Required"),
  houseNumber: Yup.string(),
  images: Yup.array(),
  maxAttendees: Yup.number().transform((value) => numberTransform(value)),
  minAttendees: Yup.number().transform((value) => numberTransform(value)),
  organizerPricePerUomCents: Yup.number()
    .transform((value) => numberTransform(value))
    .required("Required"),
  recurringDates: Yup.array()
    .of(
      Yup.object().shape({
        day: Yup.string().required("Required"),
        hour: Yup.string().required("Required"),
        minute: Yup.string().required("Required"),
      })
    )
    .required("Required"),
  recurringType: Yup.string().required("Required"),
  region: Yup.string(),
  requiresCheckIn: Yup.boolean(),
  requiresContract: Yup.boolean(),
  requiresPassport: Yup.boolean(),
  singleDates: Yup.array()
    .of(
      Yup.object().shape({
        date: Yup.date()
          .transform((value) =>
            moment(value).isValid() ? moment(value).toDate() : undefined
          )
          .required("Required"),
        hour: Yup.string().required("Required"),
        minute: Yup.string().required("Required"),
      })
    )
    .required("Required"),
  street: Yup.string(),
  title: Yup.string().required("Required"),
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
    ({
      images,
      organizerPricePerUomCents,
      singleDates,
      recurringDates,
      ...values
    }) => ({
      input: {
        ...values,
        base64Images: images,
        recurringDates: recurringDates.map(
          (dt) =>
            `${dt.day} ${dt.hour?.toString().padStart(2, "0")}:${dt.minute
              ?.toString()
              .padStart(2, "0")}`
        ),
        singleDates: singleDates.map(({ date, hour, minute }) =>
          setTime(
            moment(date),
            `${hour?.toString().padStart(2, "0")}:${minute
              ?.toString()
              .padStart(2, "0")}`
          ).format(dateTimeFormat)
        ),
        organizerPricePerUomCents: organizerPricePerUomCents!,
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

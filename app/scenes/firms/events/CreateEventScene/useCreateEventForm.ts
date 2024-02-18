import React from "react";
import * as Yup from "yup";
import { graphql } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import moment, { Moment } from "moment";
import useMutationForm from "lib/hooks/useMutationForm";
import {
  EventTypeEnum,
  useCreateEventForm_CreateEventMutation,
} from "artifacts/useCreateEventForm_CreateEventMutation.graphql";
import { dateTimeFormat, setTime } from "lib/utils/dates";
import { momentTransform, numberTransform } from "lib/utils/transforms";

export interface CreateEventFields {
  description: string;
  durationTime: string;
  eventOptions: Array<{
    title: string;
    organizerPriceCents: number;
    builtIn: boolean;
    forAttendee: boolean;
  }>;
  eventType: EventTypeEnum;
  images?: string[];
  maxAttendees?: number;
  minAttendees?: number;
  organizerPricePerUomCents?: number;
  requiresCheckIn: boolean;
  requiresContract: boolean;
  requiresPassport: boolean;
  recurringDates: Array<{
    day: string | null;
    hour: number | null;
    minute: number | null;
  }>;
  requiresDeposit: boolean;
  depositAmountCents: number;
  singleDates: Array<{
    date: Moment;
    hour: number | null;
    minute: number | null;
  }>;
  endDate: Moment | null;
  title: string;
}

function useDefaultValues(): Partial<CreateEventFields> {
  return React.useMemo(
    () => ({
      depositAmountCents: 0,
      durationTime: "",
      endDate: null,
      eventOptions: [],
      eventType: "excursion",
      images: [],
      organizerPricePerUomCents: 0,
      recurringDates: [{ day: null, hour: null, minute: null }],
      requiresCheckIn: false,
      requiresContract: false,
      requiresDeposit: false,
      requiresPassport: false,
      singleDates: [],
    }),
    []
  );
}

const validationSchema = Yup.object().shape({
  description: Yup.string().required("Required"),
  durationTime: Yup.string().required("Required"),
  eventOptions: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required("Required"),
        organizerPriceCents: Yup.number()
          .transform(numberTransform)
          .required("Required"),
        builtIn: Yup.boolean().required("Required"),
        forAttendee: Yup.boolean().required("Required"),
      })
    )
    .required("Required"),
  eventType: Yup.string(),
  houseNumber: Yup.string().nullable(),
  images: Yup.array(),
  maxAttendees: Yup.number().transform(numberTransform),
  minAttendees: Yup.number().transform(numberTransform),
  organizerPricePerUomCents: Yup.number()
    .transform(numberTransform)
    .min(0)
    .integer()
    .required("Required"),
  depositAmountCents: Yup.number()
    .min(0)
    .lessThan(
      Yup.ref("organizerPricePerUomCents"),
      "Deposit should be less then general for attendee price"
    )
    .integer()
    .transform(numberTransform),
  recurringDates: Yup.array()
    .of(
      Yup.object().shape({
        day: Yup.string().required("Required"),
        hour: Yup.string().required("Required"),
        minute: Yup.string().required("Required"),
      })
    )
    .required("Required"),
  requiresCheckIn: Yup.boolean(),
  requiresContract: Yup.boolean(),
  requiresPassport: Yup.boolean(),
  requiresDeposit: Yup.boolean(),
  singleDates: Yup.array()
    .of(
      Yup.object().shape({
        date: Yup.date().transform(momentTransform).required("Required"),
        hour: Yup.string().required("Required"),
        minute: Yup.string().required("Required"),
      })
    )
    .required("Required"),
  endDate: Yup.date().transform(momentTransform).nullable(),
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
          notification
          errors
        }
      }
    `,
    ({
      images,
      organizerPricePerUomCents,
      singleDates,
      recurringDates,
      eventOptions,
      depositAmountCents,
      requiresDeposit,
      ...values
    }) => ({
      input: {
        ...values,
        images,
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
        eventOptions: eventOptions.map(({ organizerPriceCents, ...opt }) => ({
          organizerPriceCents: organizerPriceCents * 100,
          ...opt,
        })),
        organizerPricePerUomCents: organizerPricePerUomCents! * 100,
        depositAmountCents: (depositAmountCents || 0) * 100,
        requiresDeposit: requiresDeposit
          ? depositAmountCents !== 0
          : requiresDeposit,
        language: "en",
      },
    }),
    {
      defaultValues: useDefaultValues(),
      resolver: yupResolver(validationSchema),
      onCompleted(result) {
        if (result.createEvent?.event?.id) {
          router.replace(`/my-firm/events/${result.createEvent?.event?.id}`);
        }
      },
    }
  );
}

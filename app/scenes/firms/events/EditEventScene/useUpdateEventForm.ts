import React from "react";
import * as Yup from "yup";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import moment, { Moment } from "moment";
import useMutationForm from "../../../../lib/hooks/useMutationForm";
import { dateTimeFormat, setTime } from "../../../../lib/utils/dates";
import {
  momentTransform,
  numberTransform,
} from "../../../../lib/utils/transforms";
import {
  EventTypeEnum,
  useUpdateEventForm_UpdateEventMutation,
} from "../../../../artifacts/useUpdateEventForm_UpdateEventMutation.graphql";
import { useUpdateEventForm_EventFragment$key } from "../../../../artifacts/useUpdateEventForm_EventFragment.graphql";

export interface UpdateEventFields {
  id: string;
  city?: string | null;
  country?: string | null;
  description: string;
  durationTime: string;
  endDate: Moment | null;
  eventOptions: Array<{
    id?: string;
    title: string;
    organizerPriceCents: number;
    builtIn: boolean;
    forAttendee: boolean;
  }>;
  eventType: EventTypeEnum;
  fullAddress: string;
  houseNumber?: string | null;
  images?: string[];
  maxAttendees?: number | null;
  minAttendees?: number | null;
  organizerPricePerUomCents: number;
  depositAmountCents: number;
  region?: string | null;
  requiresCheckIn: boolean;
  requiresContract: boolean;
  requiresPassport: boolean;
  requiresDeposit: boolean;
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
  street?: string | null;
  title: string;
  bookingCancellationOptions: Array<{
    id?: string;
    penaltyPriceCents: number;
    description: string;
    deadline: number;
    status: string;
  }>;
}

function useDefaultValues(
  eventFragmentRef: useUpdateEventForm_EventFragment$key
): Partial<UpdateEventFields> {
  const event = useFragment<useUpdateEventForm_EventFragment$key>(
    graphql`
      fragment useUpdateEventForm_EventFragment on Event {
        city
        country
        description
        durationTime
        endDate
        eventType
        fullAddress
        houseNumber
        id
        images
        maxAttendees
        minAttendees
        organizerPricePerUom {
          cents
        }
        depositAmount {
          cents
        }
        recurringDaysWithTime
        region
        requiresCheckIn
        requiresContract
        requiresPassport
        requiresDeposit
        singleDaysWithTime
        street
        title
        bookingCancellationOptions {
          id
          penaltyPrice {
            cents
          }
          deadline
          status
          description
        }
        eventOptions {
          builtIn
          forAttendee
          id
          title
          description
          organizerPrice {
            cents
          }
        }
      }
    `,
    eventFragmentRef
  );
  return React.useMemo(
    () => ({
      eventOptions: event.eventOptions.map((opt) => ({
        builtIn: opt.builtIn,
        forAttendee: opt.forAttendee,
        id: opt.id,
        organizerPriceCents: opt.organizerPrice!.cents! / 100,
        title: opt.title,
      })),
      recurringDates: event.recurringDaysWithTime.map((dt) => {
        const splittedDt = dt.split(" ");
        return {
          day: splittedDt[0],
          hour: parseInt(splittedDt[1].split(":")[0], 10),
          minute: parseInt(splittedDt[1].split(":")[1], 10),
        };
      }),
      singleDates: event.singleDaysWithTime.map((dt) => {
        const date = moment(dt);
        return {
          date,
          hour: date.hour(),
          minute: date.minute(),
        };
      }),
      bookingCancellationOptions: event.bookingCancellationOptions.map(
        (opt) => ({
          id: opt.id,
          description: opt.description,
          deadline: opt.deadline,
          penaltyPriceCents: opt.penaltyPrice.cents / 100,
          status: opt.status,
        })
      ),
      city: event.city,
      country: event.country,
      description: event.description,
      durationTime: event.durationTime,
      endDate: event.endDate ? moment(event.endDate) : null,
      eventType: event.eventType,
      fullAddress: event.fullAddress!,
      houseNumber: event.houseNumber,
      id: event.id,
      images: event.images as string[],
      maxAttendees: event.maxAttendees,
      minAttendees: event.minAttendees,
      organizerPricePerUomCents: event.organizerPricePerUom!.cents! / 100,
      depositAmountCents: event.depositAmount!.cents! / 100,
      region: event.region,
      requiresCheckIn: Boolean(event.requiresCheckIn),
      requiresContract: Boolean(event.requiresContract),
      requiresPassport: Boolean(event.requiresPassport),
      requiresDeposit: Boolean(event.requiresDeposit),
      street: event.street,
      title: event.title,
    }),
    [event]
  );
}

const validationSchema = Yup.object().shape({
  city: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  durationTime: Yup.string().required("Required"),
  endDate: Yup.date().transform(momentTransform).nullable(),
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
  fullAddress: Yup.string().required("Required"),
  houseNumber: Yup.string().nullable(),
  images: Yup.array(),
  maxAttendees: Yup.number().transform(numberTransform),
  minAttendees: Yup.number().transform(numberTransform),
  organizerPricePerUomCents: Yup.number()
    .min(0)
    .integer()
    .transform(numberTransform)
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
  region: Yup.string().nullable(),
  requiresCheckIn: Yup.boolean(),
  requiresContract: Yup.boolean(),
  requiresPassport: Yup.boolean(),
  singleDates: Yup.array()
    .of(
      Yup.object().shape({
        date: Yup.date().transform(momentTransform).required("Required"),
        hour: Yup.string().required("Required"),
        minute: Yup.string().required("Required"),
      })
    )
    .required("Required"),
  street: Yup.string().nullable(),
  title: Yup.string().required("Required"),
  bookingCancellationOptions: Yup.array().of(
    Yup.object().shape({
      deadline: Yup.number().transform(numberTransform).required("Required"),
      description: Yup.string().required("Required"),
      penaltyPriceCents: Yup.number()
        .transform(numberTransform)
        .required("Required"),
    })
  ),
});

export function useUpdateEventForm(
  eventFragmentRef: useUpdateEventForm_EventFragment$key
) {
  const router = useRouter();
  return useMutationForm<
    UpdateEventFields,
    useUpdateEventForm_UpdateEventMutation
  >(
    graphql`
      mutation useUpdateEventForm_UpdateEventMutation(
        $input: UpdateEventInput!
      ) {
        updateEvent(input: $input) {
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
      depositAmountCents,
      singleDates,
      recurringDates,
      id,
      eventOptions,
      bookingCancellationOptions,
      requiresDeposit,
      ...values
    }) => ({
      input: {
        ...values,
        images,
        eventId: id,
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
        depositAmountCents: depositAmountCents! * 100,
        requiresDeposit: requiresDeposit
          ? depositAmountCents !== 0
          : requiresDeposit,
        bookingCancellationOptions: bookingCancellationOptions.map((opt) => ({
          id: opt.id,
          penaltyPriceCents: opt.penaltyPriceCents * 100,
          deadline: opt.deadline,
          description: opt.description,
        })),
      },
    }),
    {
      defaultValues: useDefaultValues(eventFragmentRef),
      resolver: yupResolver(validationSchema),
      onCompleted(result) {
        if (result.updateEvent?.event?.id) {
          router.replace(`/my-firm/events/${result.updateEvent?.event?.id}`);
        }
      },
    }
  );
}

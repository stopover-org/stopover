import React from "react";
import * as Yup from "yup";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import moment, { Moment } from "moment";
import useMutationForm from "../../../../lib/hooks/useMutationForm";
import { dateTimeFormat, setTime } from "../../../../lib/utils/dates";
import { numberTransform } from "../../../../lib/utils/validations";
import {
  EventTypeEnum,
  useUpdateEventForm_UpdateEventMutation,
} from "./__generated__/useUpdateEventForm_UpdateEventMutation.graphql";
import { useUpdateEventForm_EventFragment$key } from "./__generated__/useUpdateEventForm_EventFragment.graphql";

export interface UpdateEventFields {
  id: string;
  city?: string | null;
  country?: string | null;
  description: string;
  durationTime: string;
  eventOptions: Array<{
    id: string;
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
  organizerPricePerUomCents?: number;
  region?: string | null;
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
  endDate: Moment | null;
  street?: string | null;
  title: string;
}

function useDefaultValues(
  eventFragmentRef: useUpdateEventForm_EventFragment$key
): Partial<UpdateEventFields> {
  const event = useFragment(
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
        recurringDaysWithTime
        region
        requiresCheckIn
        requiresContract
        requiresPassport
        singleDaysWithTime
        street
        title
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
        organizerPriceCents: opt.organizerPrice?.cents!,
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
      city: event.city,
      country: event.country,
      description: event.description,
      durationTime: event.durationTime,
      endDate: event.endDate,
      eventType: event.eventType,
      fullAddress: event.fullAddress!,
      houseNumber: event.houseNumber,
      id: event.id,
      images: event.images as string[],
      maxAttendees: event.maxAttendees,
      minAttendees: event.minAttendees,
      organizerPricePerUomCents: event.organizerPricePerUom?.cents!,
      region: event.region,
      requiresCheckIn: Boolean(event.requiresCheckIn),
      requiresContract: Boolean(event.requiresContract),
      requiresPassport: Boolean(event.requiresPassport),
      street: event.street,
      title: event.title,
    }),
    [event]
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
  endDate: Yup.date(),
  street: Yup.string(),
  title: Yup.string().required("Required"),
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
        }
      }
    `,
    ({
      images,
      organizerPricePerUomCents,
      singleDates,
      recurringDates,
      id,
      ...values
    }) => ({
      input: {
        ...values,
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
        organizerPricePerUomCents: organizerPricePerUomCents!,
      },
    }),
    {
      defaultValues: useDefaultValues(eventFragmentRef),
      resolver: yupResolver(validationSchema),
      onCompleted(result) {
        if (result.updateEvent?.event?.id) {
          router.replace(`my-firm/events/${result.updateEvent?.event?.id}`);
        }
      },
    }
  );
}

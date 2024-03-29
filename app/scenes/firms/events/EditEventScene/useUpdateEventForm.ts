import React from "react";
import * as Yup from "yup";
import { graphql, useFragment } from "react-relay";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import moment, { Moment } from "moment";
import useMutationForm from "lib/hooks/useMutationForm";
import { dateTimeFormat, setTime } from "lib/utils/dates";
import { momentTransform, numberTransform } from "lib/utils/transforms";
import {
  EventTypeEnum,
  useUpdateEventForm_UpdateEventMutation,
} from "artifacts/useUpdateEventForm_UpdateEventMutation.graphql";
import { useUpdateEventForm_EventFragment$key } from "artifacts/useUpdateEventForm_EventFragment.graphql";

export interface UpdateEventFields {
  id: string;
  description: string;
  durationTime: string;
  endDate: Moment | null;
  eventType: EventTypeEnum;
  images?: string[];
  maxAttendees?: number | null;
  minAttendees?: number | null;
  organizerPricePerUomCents: number;
  depositAmountCents: number;
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
  title: string;
  interestIds: string[];
  language: string;
}

function useDefaultValues(
  eventFragmentRef: useUpdateEventForm_EventFragment$key
): Partial<UpdateEventFields> {
  const event = useFragment<useUpdateEventForm_EventFragment$key>(
    graphql`
      fragment useUpdateEventForm_EventFragment on Event {
        description
        durationTime
        endDate
        eventType
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
        interests {
          id
        }
        recurringDaysWithTime
        requiresDeposit
        singleDaysWithTime
        title
        language
      }
    `,
    eventFragmentRef
  );
  return React.useMemo(
    () => ({
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
      description: event.description,
      durationTime: event.durationTime,
      endDate: event.endDate ? moment(event.endDate) : null,
      eventType: event.eventType,
      id: event.id,
      images: event.images as string[],
      maxAttendees: event.maxAttendees,
      minAttendees: event.minAttendees,
      organizerPricePerUomCents: event.organizerPricePerUom!.cents! / 100,
      depositAmountCents: event.depositAmount!.cents! / 100,
      requiresDeposit: Boolean(event.requiresDeposit),
      title: event.title,
      interestIds: event.interests.map((interest) => interest.id),
      language: event.language,
    }),
    [event]
  );
}

const validationSchema = Yup.object().shape({
  description: Yup.string().required("Required"),
  durationTime: Yup.string().required("Required"),
  endDate: Yup.date().transform(momentTransform).nullable(),
  eventType: Yup.string(),
  images: Yup.array(),
  maxAttendees: Yup.number().transform(numberTransform),
  minAttendees: Yup.number().transform(numberTransform),
  organizerPricePerUomCents: Yup.number()
    .min(0)
    .integer()
    .transform(numberTransform)
    .nullable(),
  depositAmountCents: Yup.number().min(0).integer().transform(numberTransform),
  recurringDates: Yup.array()
    .of(
      Yup.object().shape({
        day: Yup.string().required("Required"),
        hour: Yup.string().required("Required"),
        minute: Yup.string().required("Required"),
      })
    )
    .required("Required"),
  singleDates: Yup.array()
    .of(
      Yup.object().shape({
        date: Yup.date().transform(momentTransform).required("Required"),
        hour: Yup.string().required("Required"),
        minute: Yup.string().required("Required"),
      })
    )
    .required("Required"),
  title: Yup.string().required("Required"),
  interestIds: Yup.array().of(Yup.string()),
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
            ...EventScene_FirmEventFragment
            ...EventScene_EventFragment
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
        organizerPricePerUomCents: organizerPricePerUomCents! * 100,
        depositAmountCents: depositAmountCents! * 100,
        requiresDeposit: requiresDeposit
          ? depositAmountCents !== 0
          : requiresDeposit,
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

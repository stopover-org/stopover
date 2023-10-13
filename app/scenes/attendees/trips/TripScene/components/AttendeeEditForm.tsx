import { Divider, Grid } from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import { FormProvider } from "react-hook-form";
import moment from "moment/moment";
import { useTranslation } from "react-i18next";
import Input from "../../../../../components/v2/Input";
import { AttendeeEditForm_AttendeeFragment$key } from "../../../../../artifacts/AttendeeEditForm_AttendeeFragment.graphql";
import EventOptionEditForm from "./EventOptionEditForm";
import { useAttendeeEditForm } from "./useAttendeeEditForm";
import Typography from "../../../../../components/v2/Typography";

interface AttendeeEditFormProps {
  attendeeFragmentRef: AttendeeEditForm_AttendeeFragment$key;
}

const AttendeeEditForm = ({ attendeeFragmentRef }: AttendeeEditFormProps) => {
  const { t } = useTranslation();
  const attendee = useFragment(
    graphql`
      fragment AttendeeEditForm_AttendeeFragment on Attendee {
        id
        booking {
          bookedFor
          status
          alreadyPaidPrice {
            cents
          }
          ...EventOptionEditForm_BookingFragment
        }
        eventOptions {
          id
          builtIn
          ...EventOptionEditForm_EventOptionFragment
        }
        ...useAttendeeEditForm_AttendeeFragment
      }
    `,
    attendeeFragmentRef
  );

  const disabled = React.useMemo(
    () =>
      attendee.booking.status !== "active" ||
      moment(attendee.booking.bookedFor).isBefore(new Date()),
    [attendee.booking.status, attendee.booking.bookedFor]
  );
  const form = useAttendeeEditForm(attendee, disabled);

  return (
    <FormProvider {...form}>
      <form>
        <Grid container spacing={1}>
          <Grid xs={12}>
            <Typography fontSize="title-lg">
              {t("models.attendee.singular")}
            </Typography>
          </Grid>
          <Grid xs={12}>
            <Input
              label={t("models.attendee.attributes.email")}
              placeholder={t("models.attendee.attributes.email")}
              readOnly={disabled}
              {...form.useFormField("email")}
            />
          </Grid>
          {attendee.eventOptions.map((option) => (
            <EventOptionEditForm
              key={option.id}
              eventOptionFragmentRef={option}
              bookingFragmentRef={attendee.booking}
            />
          ))}
          <Grid xs={12}>
            <Divider />
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default React.memo(AttendeeEditForm);

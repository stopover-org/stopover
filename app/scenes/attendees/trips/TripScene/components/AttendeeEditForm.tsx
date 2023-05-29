import { Divider, Grid } from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import { FormProvider } from "react-hook-form";
import moment from "moment/moment";
import Input from "../../../../../components/v2/Input";
import { AttendeeEditForm_AttendeeFragment$key } from "./__generated__/AttendeeEditForm_AttendeeFragment.graphql";
import EventOptionEditForm from "./EventOptionEditForm";
import { useAttendeeEditForm } from "./useAttendeeEditForm";

interface AttendeeEditFormProps {
  attendeeFragmentRef: AttendeeEditForm_AttendeeFragment$key;
}

const AttendeeEditForm = ({ attendeeFragmentRef }: AttendeeEditFormProps) => {
  const attendee = useFragment(
    graphql`
      fragment AttendeeEditForm_AttendeeFragment on Attendee {
        id
        booking {
          bookedFor
          status
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
  const form = useAttendeeEditForm(attendee);
  const disabled = React.useMemo(
    () =>
      attendee.booking.status === "paid" ||
      moment(attendee.booking.bookedFor).isBefore(new Date()),
    [attendee.booking.status, attendee.booking.bookedFor]
  );

  return (
    <FormProvider {...form}>
      <form>
        <Grid container>
          <Grid xs={6}>
            <Input
              label="First Name"
              placeholder="First Name"
              disabled={disabled}
              {...form.useFormField("firstName")}
            />
          </Grid>
          <Grid xs={6}>
            <Input
              label="Last Name"
              placeholder="Last Name"
              disabled={disabled}
              {...form.useFormField("lastName")}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              label="Email"
              placeholder="Email"
              disabled={disabled}
              {...form.useFormField("email")}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              label="Phone"
              placeholder="Phone"
              disabled={disabled}
              {...form.useFormField("phone")}
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
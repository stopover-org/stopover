import { Divider, Grid } from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import Input from "../../../components/v2/Input";
import { AttendeeEditForm_AttendeeFragment$key } from "./__generated__/AttendeeEditForm_AttendeeFragment.graphql";
import EventOptionEditForm from "./EventOptionEditForm";

interface AttendeeEditFormProps {
  attendeeFragmentRef: AttendeeEditForm_AttendeeFragment$key;
}

const AttendeeEditForm = ({ attendeeFragmentRef }: AttendeeEditFormProps) => {
  const attendee = useFragment(
    graphql`
      fragment AttendeeEditForm_AttendeeFragment on Attendee {
        id
        eventOptions {
          id
          ...EventOptionEditForm_EventOptionFragment
        }
      }
    `,
    attendeeFragmentRef
  );

  return (
    <Grid container>
      <Grid xs={6}>
        <Input label="First Name" placeholder={"Enter Attendee's First Name"} />
      </Grid>
      <Grid xs={6}>
        <Input label="Last Name" placeholder={"Enter Attendee's First Name"} />
      </Grid>
      <Grid xs={12}>
        <Input label="Email" placeholder={"Enter Attendee's Email"} />
      </Grid>
      <Grid xs={12}>
        <Input label="Phone" placeholder={"Enter Attendee's Phone"} />
      </Grid>
      {attendee.eventOptions.map((option) => (
        <EventOptionEditForm key={option.id} eventOptionFragmentRef={option} />
      ))}
      <Grid xs={12}>
        <Divider />
      </Grid>
    </Grid>
  );
};

export default React.memo(AttendeeEditForm);

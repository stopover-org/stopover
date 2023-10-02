import { graphql, useFragment } from "react-relay";
import React from "react";
import { Tooltip } from "@mui/joy";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useTranslation } from "react-i18next";
import { useRegisterAttendeeForm } from "./useRegisterAttendeeForm";
import { RegisterAttendee_AttendeeFragment$key } from "../../../artifacts/RegisterAttendee_AttendeeFragment.graphql";
import SubmitButton from "../SubmitButton";

interface RegisterAttendeeProps {
  attendeeFragmentRef: RegisterAttendee_AttendeeFragment$key;
}

const RegisterAttendee = ({ attendeeFragmentRef }: RegisterAttendeeProps) => {
  const attendee = useFragment(
    graphql`
      fragment RegisterAttendee_AttendeeFragment on Attendee {
        ...useRegisterAttendeeForm_AttendeeFragment
      }
    `,
    attendeeFragmentRef
  );
  const form = useRegisterAttendeeForm(attendee);
  const { t } = useTranslation();
  return (
    <form onSubmit={form.handleSubmit()}>
      <SubmitButton submitting={form.formState.isSubmitting} icon size="sm">
        <Tooltip title={t("forms.registerAttendee.tooltip")}>
          <PersonAddIcon />
        </Tooltip>
      </SubmitButton>
    </form>
  );
};

export default React.memo(RegisterAttendee);

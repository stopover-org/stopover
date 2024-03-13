import { Divider, Grid, Stack } from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Input from "components/v2/Input";
import { AttendeeEditForm_AttendeeFragment$key } from "artifacts/AttendeeEditForm_AttendeeFragment.graphql";
import Typography from "components/v2/Typography";
import EventOptionEditForm from "./EventOptionEditForm";
import { useAttendeeEditForm } from "./useAttendeeEditForm";

interface AttendeeEditFormProps {
  attendeeFragmentRef: AttendeeEditForm_AttendeeFragment$key;
  index: number;
  disabled: boolean;
}

const AttendeeEditForm = ({
  attendeeFragmentRef,
  index,
  disabled,
}: AttendeeEditFormProps) => {
  const { t } = useTranslation();
  const attendee = useFragment(
    graphql`
      fragment AttendeeEditForm_AttendeeFragment on Attendee {
        id
        booking {
          ...EventOptionEditForm_BookingFragment
        }
        eventOptions {
          id
          builtIn
          status
          ...EventOptionEditForm_EventOptionFragment
        }
        ...useAttendeeEditForm_AttendeeFragment
        ...RemoveAttendee_AttendeeFragment
      }
    `,
    attendeeFragmentRef
  );
  const form = useAttendeeEditForm(attendee, disabled);
  const firstNameField = form.useFormField("firstName");
  const lastNameField = form.useFormField("lastName");
  const emailField = form.useFormField("email");
  const phoneField = form.useFormField("phone");
  const availableEventOptions = React.useMemo(
    () =>
      attendee.eventOptions.filter((option) => option.status === "available"),
    [attendee]
  );

  return (
    <FormProvider {...form}>
      <form>
        <Grid container spacing={1}>
          <Grid xs={12} paddingTop={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography fontSize="title-lg">
                {firstNameField.value || lastNameField.value || (
                  <>
                    {t("models.attendee.singular")}
                    {index !== 0 && <> ({index})</>}
                  </>
                )}
              </Typography>
            </Stack>
          </Grid>
          <Grid md={6} sm={12} lg={6}>
            <Input
              label={t("models.attendee.attributes.firstName")}
              placeholder={t("models.attendee.attributes.firstName")}
              readOnly={disabled}
              {...firstNameField}
            />
          </Grid>
          <Grid md={6} sm={12} lg={6}>
            <Input
              label={t("models.attendee.attributes.lastName")}
              placeholder={t("models.attendee.attributes.lastName")}
              readOnly={disabled}
              {...lastNameField}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              label={t("models.attendee.attributes.email")}
              placeholder={t("models.attendee.attributes.email")}
              readOnly={disabled}
              {...emailField}
            />
          </Grid>
          <Grid xs={12}>
            <Input
              label={t("models.attendee.attributes.phone")}
              placeholder={t("models.attendee.attributes.phone")}
              readOnly={disabled}
              {...phoneField}
            />
          </Grid>

          {availableEventOptions.length > 0 && (
            <>
              <Grid xs={12}>Доступные опции</Grid>
              {availableEventOptions.map((option) => (
                <EventOptionEditForm
                  key={option.id}
                  eventOptionFragmentRef={option}
                  bookingFragmentRef={attendee.booking}
                />
              ))}
            </>
          )}
          <Grid xs={12} paddingTop={3}>
            <Divider />
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default React.memo(AttendeeEditForm);

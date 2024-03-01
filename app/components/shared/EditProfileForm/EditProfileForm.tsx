import React from "react";
import { graphql, useFragment } from "react-relay";
import { FormProvider } from "react-hook-form";
import { Grid } from "@mui/joy";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { EditProfileForm_AccountFragment$key } from "artifacts/EditProfileForm_AccountFragment.graphql";
import Fieldset from "components/v2/Fieldset";
import Input from "components/v2/Input";
import DatePicker from "components/v2/DatePicker";
import { useEditProfileForm } from "./components/useEditProfileForm";

interface EditProfileFormProps {
  accountFragmentRef: EditProfileForm_AccountFragment$key;
}

const EditProfileForm = ({ accountFragmentRef }: EditProfileFormProps) => {
  const account = useFragment(
    graphql`
      fragment EditProfileForm_AccountFragment on Account {
        ...useEditProfileForm_AccountFragment
      }
    `,
    accountFragmentRef
  );
  const form = useEditProfileForm(account);
  const { t } = useTranslation();
  const dateField = form.useFormField("dateOfBirth");

  return (
    <Fieldset spacing={2} container>
      <FormProvider {...form}>
        <form>
          <Grid container spacing={2}>
            <Grid xs={12} sm={12} md={12} lg={12}>
              <Input
                label={t("forms.editProfile.labels.name")}
                fullWidth
                {...form.useFormField("name")}
                tooltip={t("forms.editProfile.hints.name")}
              />
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={6}>
              <Input
                label={t("forms.editProfile.labels.phone")}
                fullWidth
                {...form.useFormField("primaryPhone")}
                tooltip={t("forms.editProfile.hints.phone")}
              />
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={6}>
              <Input
                label={t("forms.editProfile.labels.email")}
                fullWidth
                {...form.useFormField("primaryEmail")}
                tooltip={t("forms.editProfile.hints.email")}
              />
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={6}>
              <Input
                label={t("forms.editProfile.labels.country")}
                fullWidth
                {...form.useFormField("country")}
                tooltip={t("forms.editProfile.hints.country")}
              />
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={6}>
              <Input
                label={t("forms.editProfile.labels.city")}
                fullWidth
                {...form.useFormField("city")}
                tooltip={t("forms.editProfile.hints.city")}
              />
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={6}>
              <DatePicker
                label={t("forms.editProfile.labels.dateOfBirth")}
                value={moment(dateField.value)}
                onChange={dateField.onChange}
                hint={t("forms.editProfile.hints.dateOfBirth")}
              />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Fieldset>
  );
};

export default React.memo(EditProfileForm);

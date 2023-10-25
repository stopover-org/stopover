import React from "react";
import { graphql, useFragment } from "react-relay";
import { FormProvider } from "react-hook-form";
import { Grid, Stack } from "@mui/joy";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useEditProfileForm } from "./components/useEditProfileForm";
import { EditProfileForm_AccountFragment$key } from "../../../artifacts/EditProfileForm_AccountFragment.graphql";
import Fieldset from "../../v2/Fieldset";
import Input from "../../v2/Input";
import ButtonDatePicker from "../../v2/ButtonDatePicker";
import { dateFormat } from "../../../lib/utils/dates";
import Typography from "../../v2/Typography";

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
    <FormProvider {...form}>
      <form>
        <Fieldset>
          <Grid container spacing={2}>
            <Grid xs={12} sm={12} md={12} lg={12}>
              <Input
                label={t("Как вас зовут")}
                fullWidth
                {...form.useFormField("name")}
              />
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={6}>
              <Input
                label={t("Телефон для уведомлений")}
                fullWidth
                {...form.useFormField("primaryPhone")}
              />
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={6}>
              <Input
                label={t("Email для уведомлений")}
                fullWidth
                {...form.useFormField("primaryEmail")}
              />
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={6}>
              <Input
                label={t("Страна где вы живете")}
                fullWidth
                {...form.useFormField("country")}
              />
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={6}>
              <Input
                label={t("Город где вы живете")}
                fullWidth
                {...form.useFormField("city")}
              />
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={6}>
              <Stack direction="row" spacing={2} useFlexGap>
                <Typography>
                  {moment(dateField.value).format(dateFormat)}
                </Typography>
                <ButtonDatePicker
                  onChange={form.useFormField("dateOfBirth").onChange}
                >
                  {t("Изменить дату рождения")}
                </ButtonDatePicker>
              </Stack>
            </Grid>
          </Grid>
        </Fieldset>
      </form>
    </FormProvider>
  );
};

export default React.memo(EditProfileForm);

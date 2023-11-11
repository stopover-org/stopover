import React from "react";
import { Autocomplete, Grid } from "@mui/joy";
import { useTranslation } from "react-i18next";
import Fieldset from "../../v2/Fieldset/Fieldset";
import Input from "../../v2/Input/Input";
import FileUploader from "../../v2/FileUploader/FileUploader";
import AddressFieldset from "../AddressFieldset/AddressFieldset";
import Typography from "../../v2/Typography/Typography";
import PhoneInput from "../../v2/PhoneInput/PhoneInput";
import ChipsInput from "../../v2/ChipsInput/ChipsInput";
import useFormContext from "../../../lib/hooks/useFormContext";
import ImagePreviewFields from "../ImagePreviewFields";
import { capitalize } from "../../../lib/utils/capitalize";
import SubmitButton from "../SubmitButton";
import Editor from "../../v2/Editor";

const EditFirmForm = () => {
  const form = useFormContext();
  const paymentTypesField = form.useFormField("paymentTypes");
  const imageField = form.useFormField("image");
  const descriptionField = form.useFormField("description");
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} lg={8} md={12} sm={12}>
      <Fieldset>
        <Grid md={6} sm={12}>
          <Input
            {...form.useFormField("title")}
            label={t("models.firm.attributes.title")}
          />
        </Grid>
        <Grid md={6} sm={12}>
          <Input
            {...form.useFormField("contactPerson")}
            label={t("models.firm.attributes.contactPerson")}
          />
        </Grid>
        <Grid xs={12}>
          <FileUploader
            onChange={(images) => imageField.onChange(images[0])}
            pickerOptions={{ maxFiles: 1 }}
          />
        </Grid>
        <ImagePreviewFields />
      </Fieldset>

      <Fieldset>
        <Grid xs={12}>
          <Typography level="title-lg">
            {t("forms.editFirm.paymentInformation")}
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Autocomplete
            disableClearable
            multiple
            placeholder={t("models.firm.attributes.paymentType")}
            options={["Cash", "Stripe"].map((v) => ({
              label: capitalize(v),
              value: v.toLowerCase(),
            }))}
            onChange={(
              event,
              values: Array<{ label: string; value: string }>
            ) => {
              const newValue = values.reduce((res, val) => {
                if (res.includes(val.value)) {
                  return res;
                }
                res.push(val.value);
                return res;
              }, [] as string[]);

              paymentTypesField.onChange(newValue);
            }}
            getOptionLabel={(option) => option.label}
            value={paymentTypesField.value.map((val: string) => ({
              label: capitalize(val),
              value: val.toLowerCase(),
            }))}
          />
        </Grid>
      </Fieldset>

      <AddressFieldset />

      <Fieldset>
        <Grid xs={12}>
          <Typography level="title-lg">
            {t("forms.editFirm.contactInformation")}
          </Typography>
        </Grid>
        <Grid md={6} sm={12}>
          <Input
            {...form.useFormField("primaryEmail")}
            label={t("models.firm.attributes.primaryEmail")}
          />
        </Grid>
        <Grid md={6} sm={12}>
          <PhoneInput
            {...form.useFormField("primaryPhone")}
            label={t("models.firm.attributes.primaryPhone")}
          />
        </Grid>
        <Grid xs={12}>
          <ChipsInput
            {...form.useFormField("contacts")}
            label={t("models.firm.attributes.contacts")}
          />
        </Grid>
        <Grid xs={12}>
          <Input
            {...form.useFormField("website")}
            label={t("models.firm.attributes.website")}
          />
        </Grid>
      </Fieldset>

      <Fieldset>
        <Grid xs={12}>
          <Typography level="title-lg">
            {t("models.firm.attributes.description")}
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Editor
            value={descriptionField.value}
            onChange={descriptionField.onChange}
          />
        </Grid>
      </Fieldset>

      <Fieldset>
        <Grid xs={12}>
          <SubmitButton submitting={form.formState.isSubmitting}>
            {t("general.save")}
          </SubmitButton>
        </Grid>
      </Fieldset>
    </Grid>
  );
};

export default React.memo(EditFirmForm);

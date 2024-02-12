import React from "react";
import { Autocomplete, FormControl, FormLabel, Grid } from "@mui/joy";
import { useTranslation } from "react-i18next";
import Fieldset from "components/v2/Fieldset/Fieldset";
import Input from "components/v2/Input/Input";
import FileUploader from "components/v2/FileUploader/FileUploader";
import Typography from "components/v2/Typography/Typography";
import PhoneInput from "components/v2/PhoneInput/PhoneInput";
import ChipsInput from "components/v2/ChipsInput/ChipsInput";
import useFormContext from "lib/hooks/useFormContext";
import ImagePreviewFields from "components/shared/ImagePreviewFields";
import { capitalize } from "lib/utils/capitalize";
import SubmitButton from "components/shared/SubmitButton";
import Editor from "components/v2/Editor";

interface EditFirmFormProps {
  simple?: boolean;
}

const EditFirmForm = ({ simple = false }: EditFirmFormProps) => {
  const form = useFormContext();
  const paymentTypesField = form.useFormField("paymentTypes");
  const availablePaymentMethodsField = form.useFormField(
    "availablePaymentMethods"
  );
  const imageField = form.useFormField("image");
  const descriptionField = form.useFormField("description");
  const contractAddressField = form.useFormField("contractAddress");
  const includingCrypto = React.useMemo(
    () => paymentTypesField.value.includes("crypto"),
    [paymentTypesField]
  );
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} lg={6} md={12} sm={12}>
      <Fieldset>
        <Grid lg={simple ? 12 : 6} md={simple ? 12 : 6} sm={12} xs={12}>
          <Input
            {...form.useFormField("title")}
            label={t("models.firm.attributes.title")}
          />
        </Grid>
        {!simple && (
          <>
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
          </>
        )}
      </Fieldset>

      <Fieldset>
        <Grid xs={12} p={1}>
          <Typography level="title-lg">
            {t("forms.editFirm.paymentInformation")}
          </Typography>
        </Grid>
        <Grid lg={simple ? 12 : 6} md={simple ? 12 : 6} sm={12} xs={12}>
          <FormControl>
            <FormLabel>{t("models.firm.attributes.paymentType")}</FormLabel>
            <Autocomplete
              disableClearable
              multiple
              placeholder={t("models.firm.attributes.paymentType")}
              options={availablePaymentMethodsField.value.map((v) => ({
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
          </FormControl>
        </Grid>
        {includingCrypto && (
          <Grid md={simple ? 12 : 6} sm={12}>
            <Input
              {...contractAddressField}
              label={t("models.firm.attributes.contractAddress")}
            />
          </Grid>
        )}
      </Fieldset>

      <Fieldset>
        <Grid xs={12}>
          <Typography level="title-lg">
            {t("forms.editFirm.contactInformation")}
          </Typography>
        </Grid>
        <Grid lg={simple ? 12 : 6} md={simple ? 12 : 6} sm={12} xs={12}>
          <Input
            {...form.useFormField("primaryEmail")}
            label={t("models.firm.attributes.primaryEmail")}
          />
        </Grid>
        {!simple && (
          <>
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
          </>
        )}
      </Fieldset>

      {!simple && (
        <Fieldset>
          <Grid xs={12}>
            <Typography level="title-lg">
              {t("models.firm.attributes.description")}
            </Typography>
          </Grid>
          <Grid xs={12}>
            <Editor
              errorMessage={descriptionField.error?.message}
              value={descriptionField.value}
              onChange={descriptionField.onChange}
            />
          </Grid>
        </Fieldset>
      )}

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

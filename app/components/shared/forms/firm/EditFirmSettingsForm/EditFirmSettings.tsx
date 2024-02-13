import { Autocomplete, FormControl, FormLabel, Grid } from "@mui/joy";
import useFormContext from "lib/hooks/useFormContext";
import Fieldset from "components/v2/Fieldset";
import React from "react";
import Input from "components/v2/Input/Input";
import { useTranslation } from "react-i18next";
import SubmitButton from "components/shared/SubmitButton";
import { capitalize } from "lib/utils/capitalize";

const EditFirmSettingsForm = () => {
  const { t } = useTranslation();
  const form = useFormContext();
  const availablePaymentMethodsField = form.useFormField(
    "availablePaymentMethods"
  );

  return (
    <Grid container spacing={2} lg={6} md={12} sm={12} xs={12}>
      <Fieldset>
        <Grid xs={12}>
          <Input
            {...form.useFormField("margin")}
            label={t("models.firm.attributes.margin")}
          />
        </Grid>
        <Grid xs={12}>
          <FormControl>
            <FormLabel>
              {t("models.firm.attributes.availablePaymentMethods")}
            </FormLabel>
            <Autocomplete
              disableClearable
              multiple
              placeholder={t("models.firm.attributes.availablePaymentMethods")}
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

                availablePaymentMethodsField.onChange(newValue);
              }}
              getOptionLabel={(option) => option.label}
              value={availablePaymentMethodsField.value.map((val: string) => ({
                label: capitalize(val),
                value: val.toLowerCase(),
              }))}
            />
          </FormControl>
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

export default React.memo(EditFirmSettingsForm);

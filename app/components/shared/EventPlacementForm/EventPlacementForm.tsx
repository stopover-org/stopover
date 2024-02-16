import { Grid } from "@mui/joy";
import { useTranslation } from "react-i18next";
import Input from "components/v2/Input";
import React from "react";
import Fieldset from "components/v2/Fieldset";
import useFormContext from "lib/hooks/useFormContext";

const EventPlacementForm = () => {
  const { t } = useTranslation();
  const form = useFormContext();
  return (
    <Grid container spacing={2} lg={12} md={12} sm={12}>
      <Fieldset>
        <Grid lg={12} sm={12} xs={12}>
          <Input
            {...form.useFormField("title")}
            label={t("models.eventPlacement.attributes.title")}
          />
        </Grid>
        <Grid lg={6} sm={12} xs={12}>
          <Input
            {...form.useFormField("widthPlaces")}
            label={t("models.eventPlacement.attributes.widthPlaces")}
          />
        </Grid>
        <Grid lg={6} sm={12} xs={12}>
          <Input
            {...form.useFormField("heightPlaces")}
            label={t("models.eventPlacement.attributes.heightPlaces")}
          />
        </Grid>
      </Fieldset>
    </Grid>
  );
};

export default React.memo(EventPlacementForm);

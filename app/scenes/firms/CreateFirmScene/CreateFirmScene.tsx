import React from "react";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "components/v2/Breadcrumbs";
import EditFirmForm from "components/shared/EditFirmForm";
import Typography from "components/v2/Typography";
import { useCreateFirmForm } from "./useCreateFirmForm";

const CreateFirmScene = () => {
  const form = useCreateFirmForm();
  const { t } = useTranslation();

  return (
    <>
      <Breadcrumbs items={[t("forms.editFirm.createYourFirm")]} />
      <Typography level="h1" component="h1">
        {t("forms.editFirm.createYourFirm")}
      </Typography>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit()}>
          <EditFirmForm simple />
        </form>
      </FormProvider>
    </>
  );
};

export default React.memo(CreateFirmScene);

import React from "react";
import { useTranslation } from "react-i18next";
import Typography from "components/v2/Typography";
import { FormProvider } from "react-hook-form";
import EditFirmForm from "components/shared/EditFirmForm";
import { useCreateFirmForm } from "./useCreateFirmForm";

const CreateFirmScene = () => {
  const form = useCreateFirmForm();
  const { t } = useTranslation();

  return (
    <>
      <Typography level="h3" component="h1" paddingLeft={2}>
        {t("forms.editFirm.newFirm")}
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

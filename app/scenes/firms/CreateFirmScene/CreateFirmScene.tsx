import React from "react";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useCreateFirmForm } from "./useCreateFirmForm";
import Breadcrumbs from "../../../components/v2/Breadcrumbs";
import EditFirmForm from "../../../components/shared/EditFirmForm";

const CreateFirmScene = () => {
  const form = useCreateFirmForm();
  const { t } = useTranslation();

  return (
    <>
      <Breadcrumbs items={[t("forms.editFirm.createYourFirm")]} />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit()}>
          <EditFirmForm simple />
        </form>
      </FormProvider>
    </>
  );
};

export default React.memo(CreateFirmScene);

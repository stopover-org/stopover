import React from "react";
import { FormProvider } from "react-hook-form";
import { useCreateFirmForm } from "./useCreateFirmForm";
import Breadcrumbs from "../../../components/v2/Breadcrumbs";
import EditFirmForm from "../../../lib/shared/EditFirmForm";

const CreateFirmScene = () => {
  const form = useCreateFirmForm();

  return (
    <>
      <Breadcrumbs items={["Create Your Firm"]} />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit()}>
          <EditFirmForm />
        </form>
      </FormProvider>
    </>
  );
};

export default React.memo(CreateFirmScene);

import React from "react";
import { graphql, useFragment } from "react-relay";
import { FormProvider } from "react-hook-form";
import { useUpdateFirmForm } from "./useUpdateFirmForm";
import { EditFirmScene_FirmFragment$key } from "./__generated__/EditFirmScene_FirmFragment.graphql";
import Breadcrumbs from "../../../components/v2/Breadcrumbs";
import EditFirmForm from "../../../components/shared/EditFirmForm";

const EditFirmScene = ({
  firmFragmentRef,
}: {
  firmFragmentRef: EditFirmScene_FirmFragment$key;
}) => {
  const firm = useFragment(
    graphql`
      fragment EditFirmScene_FirmFragment on Firm {
        ...useUpdateFirmForm_FirmFragment
      }
    `,
    firmFragmentRef
  );
  const form = useUpdateFirmForm(firm);

  return (
    <>
      <Breadcrumbs items={[{ title: "My Firm", href: "/my-firm" }, "Edit"]} />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit()}>
          <EditFirmForm />
        </form>
      </FormProvider>
    </>
  );
};

export default React.memo(EditFirmScene);

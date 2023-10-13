import React from "react";
import { graphql, useFragment } from "react-relay";
import { FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useUpdateFirmForm } from "./useUpdateFirmForm";
import { EditFirmScene_FirmFragment$key } from "../../../artifacts/EditFirmScene_FirmFragment.graphql";
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
  const { t } = useTranslation();

  return (
    <>
      <Breadcrumbs
        items={[
          { title: t("layout.header.myFirm"), href: "/my-firm" },
          t("general.edit"),
        ]}
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit()}>
          <EditFirmForm />
        </form>
      </FormProvider>
    </>
  );
};

export default React.memo(EditFirmScene);

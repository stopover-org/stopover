import { useTranslation } from "react-i18next";
import React from "react";
import { graphql, useFragment } from "react-relay";
import { SettingsScene_FirmFragment$key } from "artifacts/SettingsScene_FirmFragment.graphql";
import EditFirmSettings from "components/shared/forms/firm/EditFirmSettingsForm";
import Breadcrumbs from "components/v2/Breadcrumbs";
import { FormProvider } from "react-hook-form";
import { Sheet } from "@mui/joy";
import { useUpdateFirmSettings } from "./useUpdateFirmSettings";

interface SettingsSceneProps {
  firmFragmentRef: SettingsScene_FirmFragment$key;
}

const SettingsScene = ({ firmFragmentRef }: SettingsSceneProps) => {
  const firm = useFragment(
    graphql`
      fragment SettingsScene_FirmFragment on Firm {
        id
        ...useUpdateFirmSettings_FirmFragment
      }
    `,
    firmFragmentRef
  );
  const { t } = useTranslation();
  const form = useUpdateFirmSettings(firm);

  return (
    <Sheet>
      <Breadcrumbs
        items={[
          { title: t("layout.header.myFirm"), href: "/my-firm/dashboard" },
          t("general.settings"),
        ]}
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit()} style={{ width: "100%" }}>
          <EditFirmSettings />
        </form>
      </FormProvider>
    </Sheet>
  );
};

export default React.memo(SettingsScene);

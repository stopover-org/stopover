import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import React from "react";
import { Box } from "@mui/joy";
import Button from "components/v2/Button";
import { ResetOnboardingFirm_FirmFragment$key } from "artifacts/ResetOnboardingFirm_FirmFragment.graphql";
import ResetOnboardingFirmModal from "./ResetOnboardingFirmModal";

interface EditEventTourPlanProps {
  firmFragmentRef: ResetOnboardingFirm_FirmFragment$key;
}

const ResetOnboardingFirm = ({ firmFragmentRef }: EditEventTourPlanProps) => {
  const firm = useFragment<ResetOnboardingFirm_FirmFragment$key>(
    graphql`
      fragment ResetOnboardingFirm_FirmFragment on Firm {
        firmType
      }
    `,
    firmFragmentRef
  );
  const { t } = useTranslation();
  const [modalOpened, setModalOpened] = React.useState<boolean>(false);
  if (firm.firmType !== "onboarding") {
    return null;
  }
  return (
    <>
      <Box>
        <Button size="sm" color="danger" onClick={() => setModalOpened(true)}>
          {t("forms.resetOnboardingFirm.action")}
        </Button>
      </Box>
      <ResetOnboardingFirmModal
        open={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default React.memo(ResetOnboardingFirm);

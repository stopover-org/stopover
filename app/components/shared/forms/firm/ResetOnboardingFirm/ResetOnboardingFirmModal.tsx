import {
  DialogActions,
  DialogTitle,
  Divider,
  Grid,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from "@mui/joy";
import React from "react";
import { useTranslation } from "react-i18next";
import SubmitButton from "components/shared/SubmitButton";
import Button from "components/v2/Button/Button";
import { FormProvider } from "react-hook-form";
import { useResetOnboardingFirmForm } from "./useResetOnboardingFirmForm";

interface EditEventTourPlanModalProps {
  open: boolean;
  onClose: () => void;
}

const ResetOnboardingFirmModal = ({
  open,
  onClose,
}: EditEventTourPlanModalProps) => {
  const { t } = useTranslation();
  const form = useResetOnboardingFirmForm(onClose);

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <ModalClose />
        <DialogTitle sx={{ marginRight: "30px", marginLeft: "30px" }}>
          <Stack flexDirection="row" alignItems="center" useFlexGap spacing={1}>
            {t("forms.resetOnboardingFirm.modal.header")}
          </Stack>
        </DialogTitle>
        <Divider />
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit()}>
            <Grid container>
              <Grid xs={12} sm={12} md={12} lg={12}>
                {t("forms.resetOnboardingFirm.explanation")}
              </Grid>
            </Grid>
            <DialogActions>
              <SubmitButton
                size="sm"
                submitting={form.formState.isSubmitting}
                color="danger"
              >
                {t("forms.resetOnboardingFirm.action")}
              </SubmitButton>
              <Button variant="plain" color="neutral" onClick={() => onClose()}>
                {t("general.cancel")}
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </ModalDialog>
    </Modal>
  );
};

export default React.memo(ResetOnboardingFirmModal);

import { DialogActions, Divider, Modal, ModalDialog, Stack } from "@mui/joy";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import React from "react";
import { useTranslation } from "react-i18next";
import SubmitButton from "components/shared/SubmitButton";
import Button from "components/v2/Button";
import { useRemoveFirm } from "../useRemoveFirm";

interface RemoveFirmModalProps {
  open: boolean;
  onClose: () => void;
}

const RemoveFirmModal = ({ open, onClose }: RemoveFirmModalProps) => {
  const { t } = useTranslation();
  const form = useRemoveFirm();
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <Stack flexDirection="row" alignItems="center" useFlexGap spacing={1}>
          <WarningRoundedIcon color="error" />
          {t("forms.removeFirm.modal.header")}
        </Stack>
        <Divider />
        <DialogActions>
          <form onSubmit={form.handleSubmit()}>
            <SubmitButton
              color="danger"
              size="sm"
              variant="plain"
              submitting={form.formState.isSubmitting}
            >
              {t("forms.removeFirm.action")}
            </SubmitButton>
          </form>
          <Button variant="plain" color="neutral" onClick={() => onClose()}>
            {t("general.no")}
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default React.memo(RemoveFirmModal);

import { DialogActions, Divider, Modal, ModalDialog, Stack } from "@mui/joy";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import React from "react";
import { useTranslation } from "react-i18next";
import { graphql, useFragment } from "react-relay";
import Button from "components/v2/Button";
import SubmitButton from "components/shared/SubmitButton";
import { SyncStripeModal_EventFragment$key } from "artifacts/SyncStripeModal_EventFragment.graphql";
import { useSyncStripeForm } from "./useSyncStripeForm";

interface SyncStripeModalProps {
  eventFragmentRef: SyncStripeModal_EventFragment$key;
  open: boolean;
  onClose: () => void;
}

const SyncStripeModal = ({
  eventFragmentRef,
  open,
  onClose,
}: SyncStripeModalProps) => {
  const { t } = useTranslation();
  const event = useFragment(
    graphql`
      fragment SyncStripeModal_EventFragment on Event {
        ...useSyncStripeForm_EventFragment
      }
    `,
    eventFragmentRef
  );
  const form = useSyncStripeForm(event, onClose);
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <Stack flexDirection="row" alignItems="center" useFlexGap spacing={1}>
          <WarningRoundedIcon color="warning" />
          {t("forms.syncStripe.modal.header")}
        </Stack>
        <Divider />
        {event && (
          <DialogActions>
            <form onSubmit={form.handleSubmit()}>
              <SubmitButton size="sm" submitting={form.formState.isSubmitting}>
                {t("forms.syncStripe.action")}
              </SubmitButton>
            </form>
            <Button variant="plain" color="neutral" onClick={() => onClose()}>
              {t("general.cancel")}
            </Button>
          </DialogActions>
        )}
      </ModalDialog>
    </Modal>
  );
};

export default React.memo(SyncStripeModal);

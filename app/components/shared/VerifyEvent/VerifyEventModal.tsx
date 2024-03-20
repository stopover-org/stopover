import { DialogActions, Divider, Modal, ModalDialog, Stack } from "@mui/joy";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import React from "react";
import { useTranslation } from "react-i18next";
import { graphql, useFragment } from "react-relay";
import { VerifyEventModal_EventFragment$key } from "artifacts/VerifyEventModal_EventFragment.graphql";
import Button from "components/v2/Button";
import SubmitButton from "components/shared/SubmitButton";
import { useVerifyEvent } from "./useVerifyEvent";

interface VerifyEventProps {
  eventFragmentRef: VerifyEventModal_EventFragment$key;
  open: boolean;
  onClose: () => void;
}

const VerifyEvent = ({ eventFragmentRef, open, onClose }: VerifyEventProps) => {
  const { t } = useTranslation();
  const event = useFragment(
    graphql`
      fragment VerifyEventModal_EventFragment on Event {
        ...useVerifyEvent_EventFragment
      }
    `,
    eventFragmentRef
  );
  const form = useVerifyEvent(event, onClose);
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <Stack flexDirection="row" alignItems="center" useFlexGap spacing={1}>
          <WarningRoundedIcon color="warning" />
          {t("forms.verifyEvent.modal.header")}
        </Stack>
        <Divider />
        {event && (
          <DialogActions>
            <Button variant="plain" color="danger" onClick={() => onClose()}>
              {t("general.no")}
            </Button>
            <form onSubmit={form.handleSubmit()}>
              <SubmitButton
                size="sm"
                color="success"
                submitting={form.formState.isSubmitting}
              >
                {t("general.yes")}
              </SubmitButton>
            </form>
          </DialogActions>
        )}
      </ModalDialog>
    </Modal>
  );
};

export default React.memo(VerifyEvent);

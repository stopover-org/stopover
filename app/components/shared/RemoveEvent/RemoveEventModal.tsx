import {
  Box,
  DialogActions,
  DialogContent,
  Divider,
  Modal,
  ModalDialog,
  Stack,
} from "@mui/joy";
import { useTranslation } from "react-i18next";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { graphql, useFragment } from "react-relay";
import React from "react";
import Button from "../../v2/Button";
import SubmitButton from "../SubmitButton";
import { useRemoveEventForm } from "./useRemoveEventForm";
import { RemoveEventModal_EventFragment$key } from "../../../artifacts/RemoveEventModal_EventFragment.graphql";

interface RemoveEventModalProps {
  open: boolean;
  onClose: () => void;
  eventFragmentRef: RemoveEventModal_EventFragment$key;
}

const RemoveEventModal = ({
  open,
  onClose,
  eventFragmentRef,
}: RemoveEventModalProps) => {
  const { t } = useTranslation();
  const event = useFragment(
    graphql`
      fragment RemoveEventModal_EventFragment on Event {
        ...useRemoveEventForm_EventFragment
      }
    `,
    eventFragmentRef
  );
  const form = useRemoveEventForm(event, onClose);
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <Stack flexDirection="row" alignItems="center" useFlexGap spacing={1}>
          <WarningRoundedIcon color="warning" />
          {t("forms.removeEvent.modal.header")}
        </Stack>
        <Divider />
        {event && (
          <>
            <DialogContent>
              <Stack>
                <Box>{t("forms.removeEvent.modal.explanation")}</Box>
              </Stack>
            </DialogContent>
            <DialogActions>
              <form onSubmit={form.handleSubmit()}>
                <SubmitButton
                  size="sm"
                  submitting={form.formState.isSubmitting}
                  color="danger"
                >
                  {t("forms.removeEvent.action")}
                </SubmitButton>
              </form>
              <Button variant="plain" color="neutral" onClick={() => onClose()}>
                {t("general.cancel")}
              </Button>
            </DialogActions>
          </>
        )}
      </ModalDialog>
    </Modal>
  );
};

export default React.memo(RemoveEventModal);

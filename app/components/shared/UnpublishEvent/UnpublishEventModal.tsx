import {
  Box,
  DialogActions,
  DialogContent,
  Divider,
  Modal,
  ModalDialog,
  Stack,
} from "@mui/joy";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import React from "react";
import { useTranslation } from "react-i18next";
import { graphql, useFragment } from "react-relay";
import Button from "../../v2/Button";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useUnpublishEventForm } from "./useUnpublishEventForm";
import { UnpublishEventModal_EventFragment$key } from "../../../artifacts/UnpublishEventModal_EventFragment.graphql";

interface PublishEventModalProps {
  eventFragmentRef: UnpublishEventModal_EventFragment$key;
  open: boolean;
  onClose: () => void;
}

const UnpuhlishEventModal = ({
  eventFragmentRef,
  open,
  onClose,
}: PublishEventModalProps) => {
  const { t } = useTranslation();
  const event = useFragment(
    graphql`
      fragment UnpublishEventModal_EventFragment on Event {
        title
        recurringDaysWithTime
        singleDaysWithTime
        ...useUnpublishEventForm_EventFragment
      }
    `,
    eventFragmentRef
  );
  const form = useUnpublishEventForm(event);
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <Stack flexDirection="row" alignItems="center" useFlexGap spacing={1}>
          <WarningRoundedIcon color="warning" />
          {t("forms.publishEvent.modal.header")}
        </Stack>
        <Divider />
        {event && (
          <>
            <DialogContent>
              <Stack>
                <Box>{t("forms.unpublishEvent.modal.explanation")}</Box>
              </Stack>
            </DialogContent>
            <DialogActions>
              <form onSubmit={form.handleSubmit()}>
                <SubmitButton
                  size="sm"
                  submitting={form.formState.isSubmitting}
                >
                  {t("forms.unpublishEvent.action")}
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

export default React.memo(UnpuhlishEventModal);

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
import { useRescheduleEventForm } from "./useRescheduleEventForm";
import { RescheduleEventModal_EventFragment$key } from "../../../artifacts/RescheduleEventModal_EventFragment.graphql";

interface RescheduleEventModalProps {
  open: boolean;
  onClose: () => void;
  eventFragmentRef: RescheduleEventModal_EventFragment$key;
}

const RescheduleEventModal = ({
  open,
  onClose,
  eventFragmentRef,
}: RescheduleEventModalProps) => {
  const { t } = useTranslation();
  const event = useFragment(
    graphql`
      fragment RescheduleEventModal_EventFragment on Event {
        title
        recurringDaysWithTime
        singleDaysWithTime
        ...useRescheduleEventForm_EventFragment
      }
    `,
    eventFragmentRef
  );
  const form = useRescheduleEventForm(event, onClose);
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <Stack flexDirection="row" alignItems="center" useFlexGap spacing={1}>
          <WarningRoundedIcon color="warning" />
          {t("forms.rescheduleEvent.modal.header")}
        </Stack>
        <Divider />
        {event && (
          <>
            <DialogContent>
              <Stack>
                <Box>
                  {t("forms.rescheduleEvent.modal.explanation", {
                    days: [
                      ...event.recurringDaysWithTime,
                      ...event.singleDaysWithTime,
                    ].join(", "),
                    title: event.title,
                  })}
                </Box>
                <Box>
                  {t("forms.rescheduleEvent.modal.pastDatesExplanation")}
                </Box>
                <Box>
                  {t("forms.rescheduleEvent.modal.bookingsExplanation")}
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions>
              <form onSubmit={form.handleSubmit()}>
                <SubmitButton
                  size="sm"
                  submitting={form.formState.isSubmitting}
                >
                  {t("forms.rescheduleEvent.action")}
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

export default React.memo(RescheduleEventModal);

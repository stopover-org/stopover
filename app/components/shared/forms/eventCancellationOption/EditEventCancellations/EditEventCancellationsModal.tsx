import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import {
  DialogActions,
  DialogTitle,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from "@mui/joy";
import { FormProvider } from "react-hook-form";
import React from "react";
import SubmitButton from "components/shared/SubmitButton";
import Button from "components/v2/Button";
import BookingCancellationOptionsFieldset from "components/shared/BookingCancellationOptionsFieldset";
import { EditEventCancellationsModal_EventFragment$key } from "artifacts/EditEventCancellationsModal_EventFragment.graphql";
import { useEditEventCancellationsForm } from "./useEditEventCancellationsForm";

interface EditEventCancellationModalProps {
  eventFragmentRef: EditEventCancellationsModal_EventFragment$key;
  open: boolean;
  onClose: () => void;
}

const EditEventCancellationsModal = ({
  eventFragmentRef,
  open,
  onClose,
}: EditEventCancellationModalProps) => {
  const event = useFragment(
    graphql`
      fragment EditEventCancellationsModal_EventFragment on Event {
        ...useEditEventCancellationsForm_EventFragment
      }
    `,
    eventFragmentRef
  );
  const { t } = useTranslation();
  const form = useEditEventCancellationsForm(event, onClose);

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <ModalClose />
        <DialogTitle sx={{ marginRight: "30px", marginLeft: "30px" }}>
          <Stack flexDirection="row" alignItems="center" useFlexGap spacing={1}>
            {t("forms.editBookingCancellationsForm.modal.header")}
          </Stack>
        </DialogTitle>
        <Divider />
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit()}>
            <BookingCancellationOptionsFieldset />
            <DialogActions>
              <SubmitButton size="sm" submitting={form.formState.isSubmitting}>
                {t("forms.editBookingCancellationsForm.action")}
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

export default React.memo(EditEventCancellationsModal);

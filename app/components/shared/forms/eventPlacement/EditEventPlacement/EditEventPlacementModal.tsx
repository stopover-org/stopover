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
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import React from "react";
import { FormProvider } from "react-hook-form";
import EventPlacementForm from "components/shared/EventPlacementForm";
import SubmitButton from "components/shared/SubmitButton";
import Button from "components/v2/Button/Button";
import { EditEventPlacementModal_EventPlacementFragment$key } from "artifacts/EditEventPlacementModal_EventPlacementFragment.graphql";
import { useEditEventPlacementForm } from "./useEditEventPlacementForm";

interface EditEventPlacementModalProps {
  eventPlacementFragmentRef: EditEventPlacementModal_EventPlacementFragment$key;
  open: boolean;
  onClose: () => void;
}

const EditEventPlacementModal = ({
  eventPlacementFragmentRef,
  open,
  onClose,
}: EditEventPlacementModalProps) => {
  const eventPlacement =
    useFragment<EditEventPlacementModal_EventPlacementFragment$key>(
      graphql`
        fragment EditEventPlacementModal_EventPlacementFragment on EventPlacement {
          ...useEditEventPlacementForm_EventPlacementFragment
        }
      `,
      eventPlacementFragmentRef
    );
  const { t } = useTranslation();
  const form = useEditEventPlacementForm(eventPlacement, onClose);

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <ModalClose />
        <DialogTitle sx={{ marginRight: "30px", marginLeft: "30px" }}>
          <Stack flexDirection="row" alignItems="center" useFlexGap spacing={1}>
            <BusinessRoundedIcon color="warning" />
            {t("forms.editEventPlacement.modal.header")}
          </Stack>
        </DialogTitle>
        <Divider />
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit()} style={{ width: "100%" }}>
            <EventPlacementForm />
            <DialogActions>
              <SubmitButton size="sm" submitting={form.formState.isSubmitting}>
                {t("general.save")}
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

export default React.memo(EditEventPlacementModal);

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
import { CreateEventPlacementModal_EventFragment$key } from "artifacts/CreateEventPlacementModal_EventFragment.graphql";
import { useCreateEventPlacementForm } from "./useCreateEventPlacementForm";
import SubmitButton from "../../../SubmitButton/SubmitButton";
import Button from "../../../../v2/Button/Button";

interface CreateEventPlacementModalProps {
  eventFragmentRef: CreateEventPlacementModal_EventFragment$key;
  open: boolean;
  onClose: () => void;
}

const CreateEventPlacementModal = ({
  eventFragmentRef,
  open,
  onClose,
}: CreateEventPlacementModalProps) => {
  const event = useFragment<CreateEventPlacementModal_EventFragment$key>(
    graphql`
      fragment CreateEventPlacementModal_EventFragment on Event {
        ...useCreateEventPlacementForm_EventFragment
      }
    `,
    eventFragmentRef
  );
  const { t } = useTranslation();
  const form = useCreateEventPlacementForm(event, onClose);

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <ModalClose />
        <DialogTitle sx={{ marginRight: "30px", marginLeft: "30px" }}>
          <Stack flexDirection="row" alignItems="center" useFlexGap spacing={1}>
            <BusinessRoundedIcon color="warning" />
            {t("forms.createEventPlacement.modal.header")}
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

export default React.memo(CreateEventPlacementModal);

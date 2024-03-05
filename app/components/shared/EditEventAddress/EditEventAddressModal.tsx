import { graphql, useFragment } from "react-relay";
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
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import { useTranslation } from "react-i18next";
import AddressFieldset from "components/shared/AddressFieldset";
import SubmitButton from "components/shared/SubmitButton";
import Button from "components/v2/Button/Button";
import { FormProvider } from "react-hook-form";
import { EditEventAddressModal_EventFragment$key } from "artifacts/EditEventAddressModal_EventFragment.graphql";
import { useEditEventAddressForm } from "./useEditEventAddressForm";

interface EditAddressModalProps {
  eventFragmentRef: EditEventAddressModal_EventFragment$key;
  open: boolean;
  onClose: () => void;
}

const EditEventAddressModal = ({
  eventFragmentRef,
  open,
  onClose,
}: EditAddressModalProps) => {
  const event = useFragment(
    graphql`
      fragment EditEventAddressModal_EventFragment on Event {
        ...useEditEventAddressForm_EventFragment
      }
    `,
    eventFragmentRef
  );
  const { t } = useTranslation();
  const form = useEditEventAddressForm(event, onClose);

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <ModalClose />
        <DialogTitle sx={{ marginRight: "10px", marginLeft: "10px" }}>
          <Stack flexDirection="row" alignItems="center" useFlexGap spacing={1}>
            <BusinessRoundedIcon color="warning" />
            {t("forms.editFirmAddress.modal.header")}
          </Stack>
        </DialogTitle>
        <Divider />
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit()}>
            <Grid container>
              <AddressFieldset variant="plain" withHeader={false} />
            </Grid>
            <DialogActions>
              <SubmitButton size="sm" submitting={form.formState.isSubmitting}>
                {t("forms.editFirmAddress.action")}
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

export default React.memo(EditEventAddressModal);

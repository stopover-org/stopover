import { graphql, useFragment } from "react-relay";
import { DialogActions, Divider, Modal, ModalDialog, Stack } from "@mui/joy";
import React from "react";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import { useTranslation } from "react-i18next";
import AddressFieldset from "components/shared/AddressFieldset";
import SubmitButton from "components/shared/SubmitButton";
import Button from "components/v2/Button/Button";
import { EditFirmAddressModal_AddressFragment$key } from "artifacts/EditFirmAddressModal_AddressFragment.graphql";
import { FormProvider } from "react-hook-form";
import { useEditFirmAddressForm } from "./useEditFirmAddressForm";

interface EditAddressModalProps {
  addressFragmentRef: EditFirmAddressModal_AddressFragment$key;
  open: boolean;
  onClose: () => void;
}

const EditFirmAddressModal = ({
  addressFragmentRef,
  open,
  onClose,
}: EditAddressModalProps) => {
  const address = useFragment(
    graphql`
      fragment EditFirmAddressModal_AddressFragment on Address {
        ...useEditFirmAddressForm_AddressFragment
      }
    `,
    addressFragmentRef
  );
  const { t } = useTranslation();
  const form = useEditFirmAddressForm(address, onClose);

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <Stack flexDirection="row" alignItems="center" useFlexGap spacing={1}>
          <BusinessRoundedIcon color="warning" />
          {t("forms.editFirmAddress.modal.header")}
        </Stack>
        <Divider />
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit()}>
            <AddressFieldset variant="plain" withHeader={false} />
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

export default React.memo(EditFirmAddressModal);

import { Divider, Grid, Modal, ModalDialog, Stack } from "@mui/joy";
import React from "react";
import { useTranslation } from "react-i18next";
import SubmitButton from "components/shared/SubmitButton";
import Input from "components/v2/Input";
import { useInviteUser } from "./useInviteUser";

interface VerifyEventProps {
  open: boolean;
  onClose: () => void;
}

const InviteUserModal = ({ open, onClose }: VerifyEventProps) => {
  const { t } = useTranslation();
  const form = useInviteUser(onClose);
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog" minWidth="600px">
        <Stack flexDirection="row" alignItems="center" useFlexGap spacing={1}>
          {t("forms.inviteUser.modal.header")}
        </Stack>
        <Divider />
        <form onSubmit={form.handleSubmit()}>
          <Grid container alignItems="flex-end" spacing={2}>
            <Grid xs={8}>
              <Input
                {...form.useFormField("email")}
                label={t("models.user.attributes.email")}
              />
            </Grid>
            <Grid xs={4}>
              <SubmitButton
                size="sm"
                color="primary"
                submitting={form.formState.isSubmitting}
              >
                {t("forms.inviteUser.action")}
              </SubmitButton>
            </Grid>
          </Grid>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default React.memo(InviteUserModal);

import { useTranslation } from "react-i18next";
import { graphql, useFragment } from "react-relay";
import {
  DialogActions,
  Divider,
  Grid,
  Modal,
  ModalDialog,
  Stack,
} from "@mui/joy";
import React from "react";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import { CreateNotificationModal_BookingFragment$key } from "artifacts/CreateNotificationModal_BookingFragment.graphql";
import Input from "components/v2/Input/Input";
import { FormProvider } from "react-hook-form";
import TextArea from "components/v2/TextArea";
import SubmitButton from "components/shared/SubmitButton";
import Button from "components/v2/Button/Button";
import { useCreateNotificationForm } from "./useCreateNotificationForm";

interface CreateNotificationModalProps {
  bookingFragmentRef: CreateNotificationModal_BookingFragment$key;
  open: boolean;
  onClose: () => void;
}

const CreateNotificationModal = ({
  bookingFragmentRef,
  open,
  onClose,
}: CreateNotificationModalProps) => {
  const { t } = useTranslation();
  const booking = useFragment<CreateNotificationModal_BookingFragment$key>(
    graphql`
      fragment CreateNotificationModal_BookingFragment on Booking {
        ...useCreateNotificationForm_BookingFragment
      }
    `,
    bookingFragmentRef
  );
  const form = useCreateNotificationForm(booking, onClose);
  const onCloseCb = React.useCallback(() => {
    form.reset();

    onClose();
  }, [onClose, form.reset]);
  return (
    <Modal open={open} onClose={onCloseCb}>
      <ModalDialog
        variant="outlined"
        role="alertdialog"
        sx={{ maxWidth: "512px", width: "100%" }}
      >
        <Stack flexDirection="row" alignItems="center" useFlexGap spacing={1}>
          <NotificationAddIcon />
          {t("forms.createNotification.modal.header")}
        </Stack>
        <Divider />
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit()} style={{ width: "100%" }}>
            <Grid container spacing={2} width="100%">
              <Grid xs={12} sm={12} md={12} lg={12}>
                <Input
                  label={t("models.notification.attributes.subject")}
                  fullWidth
                  {...form.useFormField("subject")}
                />
              </Grid>
              <Grid xs={12} sm={12} md={12} lg={12}>
                <TextArea
                  label={t("models.notification.attributes.content")}
                  minRows={6}
                  {...form.useFormField("content")}
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button variant="plain" color="neutral" onClick={() => onClose()}>
                {t("general.cancel")}
              </Button>
              <SubmitButton size="sm" submitting={form.formState.isSubmitting}>
                {t("forms.createNotification.send")}
              </SubmitButton>
            </DialogActions>
          </form>
        </FormProvider>
      </ModalDialog>
    </Modal>
  );
};

export default React.memo(CreateNotificationModal);

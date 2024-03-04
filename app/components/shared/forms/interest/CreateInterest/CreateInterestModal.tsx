import { useTranslation } from "react-i18next";
import {
  DialogActions,
  DialogTitle,
  Divider,
  FormHelperText,
  Grid,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
} from "@mui/joy";
import React from "react";
import SubmitButton from "components/shared/SubmitButton";
import Button from "components/v2/Button/Button";
import Input from "components/v2/Input";
import FileUploader from "components/v2/FileUploader/FileUploader";
import { FormProvider } from "react-hook-form";
import { useCreateInterestForm } from "./useCreateInterestForm";
import ImagePreviewFields from "../../../ImagePreviewFields/ImagePreviewFields";

interface CreateInterestModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateInterestModal = ({ open, onClose }: CreateInterestModalProps) => {
  const { t } = useTranslation();
  const form = useCreateInterestForm(onClose);
  const imageField = form.useFormField("preview");

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <ModalClose />
        <DialogTitle>
          <Stack flexDirection="row" alignItems="center" useFlexGap spacing={1}>
            {t("forms.createInterest.modal.header")}
          </Stack>
        </DialogTitle>
        <Divider />
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit()}>
            <Grid container spacing={2}>
              <Grid xs={12} sm={12} md={6} lg={6}>
                <Input
                  {...form.useFormField("title")}
                  label={t("models.interest.attributes.title")}
                />
              </Grid>
              <Grid xs={12} sm={12} md={6} lg={6}>
                <Input
                  {...form.useFormField("slug")}
                  label={t("models.interest.attributes.slug")}
                />
              </Grid>
              <Grid xs={12}>
                <FileUploader
                  onChange={(images) => imageField.onChange(images[0])}
                  pickerOptions={{ maxFiles: 1 }}
                />
                {imageField.error && (
                  <FormHelperText>
                    <Typography fontSize="sm" color="danger">
                      {imageField.error?.message}
                    </Typography>
                  </FormHelperText>
                )}
              </Grid>
              <Grid xs={12}>
                <ImagePreviewFields field="preview" />
              </Grid>
            </Grid>
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

export default React.memo(CreateInterestModal);

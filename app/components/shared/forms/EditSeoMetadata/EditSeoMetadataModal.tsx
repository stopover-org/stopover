import {
  DialogActions,
  DialogTitle,
  Divider,
  Grid,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Stack,
} from "@mui/joy";
import React from "react";
import { useTranslation } from "react-i18next";
import SubmitButton from "components/shared/SubmitButton";
import Button from "components/v2/Button/Button";
import { FormProvider } from "react-hook-form";
import { useEditSeoMetadataForm_SeoMetadatumFragment$key } from "artifacts/useEditSeoMetadataForm_SeoMetadatumFragment.graphql";
import Input from "components/v2/Input";
import Select from "components/v2/Select";
import TextArea from "components/v2/TextArea";
import { useEditSeoMetadataForm } from "./useEditSeoMetadataForm";

interface EditSeoMetadataFirmModalProps {
  open: boolean;
  onClose: () => void;
  seoMetadatumFragmentRef: useEditSeoMetadataForm_SeoMetadatumFragment$key;
}

const EditSeoMetadataModal = ({
  open,
  onClose,
  seoMetadatumFragmentRef,
}: EditSeoMetadataFirmModalProps) => {
  const { t } = useTranslation();
  const form = useEditSeoMetadataForm(seoMetadatumFragmentRef, onClose);
  const languageField = form.useFormField("language");

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <ModalClose />
        <DialogTitle>
          <Stack flexDirection="row" alignItems="center" useFlexGap spacing={1}>
            {t("forms.editSeoMetadata.modal.header")}
          </Stack>
        </DialogTitle>
        <Divider />
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit()}
            style={{ overflowY: "auto", width: "768px", maxWidth: "100%" }}
          >
            <Grid container spacing={2} sx={{ width: "100%" }}>
              <Grid xs={12} sm={12} md={8} lg={8}>
                <Input
                  {...form.useFormField("title")}
                  label={t("models.seoMetadatum.attributes.title")}
                  hint={t("forms.editEvent.hints.title")}
                />
              </Grid>
              <Grid xs={12} sm={12} md={4} lg={4}>
                <Select
                  placeholder={t("languages.action")}
                  sx={{ width: "100%" }}
                  name={languageField.value}
                  onChange={languageField.onChange}
                  value={languageField.value}
                  defaultValue="en"
                  hint={t("forms.editEvent.hints.language")}
                  label={t("models.seoMetadatum.attributes.language")}
                >
                  <Option value="ru">{t("languages.russian")}</Option>
                  <Option value="en">{t("languages.english")}</Option>
                </Select>
              </Grid>
              <Grid xs={12} sm={12} md={12} lg={12}>
                <TextArea
                  {...form.useFormField("description")}
                  label={t("models.seoMetadatum.attributes.description")}
                  hint={t("forms.editEvent.hints.title")}
                  minRows={6}
                />
              </Grid>
              <Grid xs={12} sm={12} md={12} lg={12}>
                <TextArea
                  {...form.useFormField("keywords")}
                  label={t("models.seoMetadatum.attributes.keywords")}
                  hint={t("forms.editEvent.hints.title")}
                  minRows={3}
                />
              </Grid>
            </Grid>
            <DialogActions>
              <SubmitButton
                size="sm"
                submitting={form.formState.isSubmitting}
                color="primary"
              >
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

export default React.memo(EditSeoMetadataModal);

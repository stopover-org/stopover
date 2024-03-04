import { useTranslation } from "react-i18next";
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
import SubmitButton from "components/shared/SubmitButton";
import Button from "components/v2/Button/Button";
import Input from "components/v2/Input";
import { FormProvider } from "react-hook-form";
import { graphql, useFragment } from "react-relay";
import { CreateEventOptionModal_EventFragment$key } from "artifacts/CreateEventOptionModal_EventFragment.graphql";
import Checkbox from "components/v2/Checkbox/Checkbox";
import { useCreateEventOptionForm } from "./useCreateEventOptionForm";

interface CreateEventOptionModalProps {
  eventFragmentRef: CreateEventOptionModal_EventFragment$key;
  open: boolean;
  onClose: () => void;
}

const CreateEventOptionModal = ({
  eventFragmentRef,
  open,
  onClose,
}: CreateEventOptionModalProps) => {
  const event = useFragment(
    graphql`
      fragment CreateEventOptionModal_EventFragment on Event {
        ...useCreateEventOptionForm_EventFragment
      }
    `,
    eventFragmentRef
  );
  const { t } = useTranslation();
  const form = useCreateEventOptionForm(event, onClose);
  const eventOptionsField = form.useFormField("eventOptions");
  const eventOptionValue =
    eventOptionsField.value[eventOptionsField.value.length - 1];

  const onChange = React.useCallback(
    (field: string, value: any) => {
      const newValue = { ...eventOptionValue, [field]: value };
      eventOptionsField.onChange([
        ...eventOptionsField.value.slice(0, eventOptionsField.value.length - 1),
        newValue,
      ]);
    },
    [eventOptionValue, eventOptionsField]
  );

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <ModalClose />
        <DialogTitle>
          <Stack flexDirection="row" alignItems="center" useFlexGap spacing={1}>
            {t("forms.createEventOption.modal.header")}
          </Stack>
        </DialogTitle>
        <Divider />
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit()}>
            <Grid container spacing={2}>
              <Grid xs={12} sm={12} md={6} lg={6}>
                <Input
                  value={eventOptionValue.title}
                  label={t("models.eventOption.attributes.title")}
                  onChange={(value) => onChange("title", value)}
                  error={
                    form.formState.errors?.eventOptions?.[
                      eventOptionsField.value.length - 1
                    ]?.title
                  }
                />
              </Grid>
              <Grid xs={12} sm={12} md={6} lg={6}>
                <Input
                  placeholder={t(
                    "models.eventOption.attributes.organizerPrice"
                  )}
                  startDecorator="RSD"
                  value={eventOptionValue.organizerPriceCents.toString()}
                  type="number"
                  label={t("models.eventOption.attributes.organizerPrice")}
                  onChange={(value) => onChange("organizerPriceCents", value)}
                  error={
                    form.formState.errors?.eventOptions?.[
                      eventOptionsField.value.length - 1
                    ]?.organizerPriceCents
                  }
                />
              </Grid>
              <Grid xs={12}>
                <Checkbox
                  checked={eventOptionValue.builtIn}
                  onChange={() =>
                    onChange("builtIn", !eventOptionValue.builtIn)
                  }
                  label={t("models.eventOption.attributes.builtIn")}
                />
              </Grid>
              <Grid xs={12}>
                <Checkbox
                  checked={eventOptionValue.forAttendee}
                  onChange={() =>
                    onChange("forAttendee", !eventOptionValue.forAttendee)
                  }
                  label={t("models.eventOption.attributes.forAttendee")}
                />
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

export default React.memo(CreateEventOptionModal);

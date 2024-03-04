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
import { useTranslation } from "react-i18next";
import SubmitButton from "components/shared/SubmitButton";
import Button from "components/v2/Button/Button";
import { FormProvider } from "react-hook-form";
import { EditEventTourPlanModal_EventFragment$key } from "artifacts/EditEventTourPlanModal_EventFragment.graphql";
import TourPlanFieldset from "components/shared/fieldsets/tourPlan/TourPlanFieldset";
import { useEditEventTourPlanForm } from "./useEditEventTourPlanForm";

interface EditEventTourPlanModalProps {
  eventFragmentRef: EditEventTourPlanModal_EventFragment$key;
  open: boolean;
  onClose: () => void;
}

const EditEventTourPlanModal = ({
  eventFragmentRef,
  open,
  onClose,
}: EditEventTourPlanModalProps) => {
  const event = useFragment<EditEventTourPlanModal_EventFragment$key>(
    graphql`
      fragment EditEventTourPlanModal_EventFragment on Event {
        ...useEditEventTourPlanForm_EventFragment
      }
    `,
    eventFragmentRef
  );
  const { t } = useTranslation();
  const form = useEditEventTourPlanForm(event, onClose);

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <ModalClose />
        <DialogTitle sx={{ marginRight: "30px", marginLeft: "30px" }}>
          <Stack flexDirection="row" alignItems="center" useFlexGap spacing={1}>
            {t("forms.editEventTourPlan.modal.header")}
          </Stack>
        </DialogTitle>
        <Divider />
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit()}
            style={{ overflowY: "scroll", width: "768px", maxWidth: "100%" }}
          >
            <Grid container>
              <TourPlanFieldset />
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

export default React.memo(EditEventTourPlanModal);

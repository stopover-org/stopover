import {
  Box,
  DialogActions,
  DialogContent,
  Divider,
  Modal,
  ModalDialog,
  Stack,
} from "@mui/joy";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import React from "react";
import { useTranslation } from "react-i18next";
import { graphql, useFragment } from "react-relay";
import Button from "../../v2/Button";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useChangeEventOptionAvailabilityForm } from "./useChangeEventOptionAvailabilityForm";
import { ChangeEventOptionAvailabilityModal_EventOptionFragment$key } from "../../../artifacts/ChangeEventOptionAvailabilityModal_EventOptionFragment.graphql";

interface ChangeEventOptionAvailabilityModalProps {
  eventOptionFragmentRef: ChangeEventOptionAvailabilityModal_EventOptionFragment$key;
  open: boolean;
  onClose: () => void;
}

const ChangeEventOptionAvailabilityModal = ({
  eventOptionFragmentRef,
  open,
  onClose,
}: ChangeEventOptionAvailabilityModalProps) => {
  const { t } = useTranslation();
  const eventOption =
    useFragment<ChangeEventOptionAvailabilityModal_EventOptionFragment$key>(
      graphql`
        fragment ChangeEventOptionAvailabilityModal_EventOptionFragment on EventOption {
          status
          ...useChangeEventOptionAvailabilityForm_EventOption
        }
      `,
      eventOptionFragmentRef
    );
  const form = useChangeEventOptionAvailabilityForm(eventOption, onClose);
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <Stack flexDirection="row" alignItems="center" useFlexGap spacing={1}>
          <WarningRoundedIcon color="warning" />
          {t("forms.changeOptionAvailability.modal.header")}
        </Stack>
        <Divider />
        {eventOption && (
          <>
            <DialogContent>
              <Stack>
                <Box>
                  {eventOption.status === "available"
                    ? t(
                        "forms.changeOptionAvailability.modal.toUnavailable.baseOptionExplanation"
                      )
                    : t(
                        "forms.changeOptionAvailability.modal.toAvailable.baseOptionExplanation"
                      )}
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions>
              <form onSubmit={form.handleSubmit()}>
                <SubmitButton
                  size="sm"
                  submitting={form.formState.isSubmitting}
                >
                  {t("forms.changeOptionAvailability.action")}
                </SubmitButton>
              </form>
              <Button variant="plain" color="neutral" onClick={() => onClose()}>
                {t("general.cancel")}
              </Button>
            </DialogActions>
          </>
        )}
      </ModalDialog>
    </Modal>
  );
};

export default React.memo(ChangeEventOptionAvailabilityModal);

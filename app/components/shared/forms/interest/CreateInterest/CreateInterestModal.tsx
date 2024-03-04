import { useTranslation } from "react-i18next";
import {
  DialogTitle,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from "@mui/joy";
import React from "react";

interface CreateInterestModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateInterestModal = ({ open, onClose }: CreateInterestModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <ModalClose />
        <DialogTitle sx={{ marginRight: "30px", marginLeft: "30px" }}>
          <Stack flexDirection="row" alignItems="center" useFlexGap spacing={1}>
            {t("forms.createInterest.modal.header")}
          </Stack>
        </DialogTitle>
        <Divider />
      </ModalDialog>
    </Modal>
  );
};

export default React.memo(CreateInterestModal);

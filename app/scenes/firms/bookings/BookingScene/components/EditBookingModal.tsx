import { graphql, useFragment } from "react-relay";
import {
  useBookingDisabled,
  useBookingDisabledReason,
} from "lib/hooks/useBookingStates";
import {
  Box,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Stack,
} from "@mui/joy";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { useTranslation } from "react-i18next";
import React from "react";
import { EditBookingModal_FirmBookingFragment$key } from "artifacts/EditBookingModal_FirmBookingFragment.graphql";
import BookingEditForm from "./BookingEditForm";

interface EditBookingModalProps {
  bookingFragmentRef: EditBookingModal_FirmBookingFragment$key;
  opened: boolean;
  onClose: () => void;
}

const EditBookingModal = ({
  opened,
  onClose,
  bookingFragmentRef,
}: EditBookingModalProps) => {
  const booking = useFragment(
    graphql`
      fragment EditBookingModal_FirmBookingFragment on Booking {
        ...BookingEditForm_FirmBookingFragment
        ...useBookingDatesEditForm_FirmBookingFragment
        ...useBookingStates_BookingFragment
        ...useBookingStates_ReasonBookingFragment
      }
    `,
    bookingFragmentRef
  );
  const disabled = useBookingDisabled(booking);
  const reason = useBookingDisabledReason(booking);
  const { t } = useTranslation();

  return (
    <Modal open={opened} onClose={onClose}>
      <ModalDialog
        variant="outlined"
        role="alertdialog"
        sx={{ width: { xs: "100%", sm: "100%", md: "unset", lg: "unset" } }}
      >
        <ModalClose />
        <DialogTitle sx={{ marginRight: "30px" }}>
          <Stack flexDirection="row" alignItems="center" spacing={2} useFlexGap>
            <WarningRoundedIcon />
            {t("scenes.attendees.trips.tripScene.editBookingModal.title")}
          </Stack>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ overflowX: "hidden" }}>
          {disabled && (
            <Sheet color="warning" variant="soft">
              <Box p={2}>
                {reason}
                <br />
                {t(
                  "scenes.attendees.trips.tripScene.editBookingModal.callSupport"
                )}
              </Box>
            </Sheet>
          )}
          <BookingEditForm bookingFragmentRef={booking} onClose={onClose} />
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default React.memo(EditBookingModal);

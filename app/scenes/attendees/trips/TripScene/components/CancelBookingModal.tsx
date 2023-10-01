import { Box, Divider, Modal, ModalDialog, Stack, DialogTitle, DialogContent, DialogActions } from "@mui/joy";
import React, { useTransition } from "react";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { graphql, useFragment } from "react-relay";
import CancelBookingForm from "../../../../../components/shared/CancelBooking/CancelBookingForm";
import Button from "../../../../../components/v2/Button";
import { CancelBookingModal_BookingFragment$key } from "../../../../../artifacts/CancelBookingModal_BookingFragment.graphql";
import { getCurrencyFormat } from "../../../../../lib/utils/currencyFormatter";
import Typography from "../../../../../components/v2/Typography";
import { useTranslation } from "react-i18next";

interface CancelBookingModalProps {
  open: boolean;
  onClose: () => void;
  bookingFragmentRef: CancelBookingModal_BookingFragment$key;
}

const CancelBookingModal = ({
  open,
  onClose,
  bookingFragmentRef,
}: CancelBookingModalProps) => {
  const { t } = useTranslation()
  const booking = useFragment(
    graphql`
      fragment CancelBookingModal_BookingFragment on Booking {
        cancellationTerms
        possibleRefundAmount {
          cents
          currency {
            name
          }
        }
        possiblePenaltyAmount {
          cents
          currency {
            name
          }
        }
        ...CancelBookingForm_BookingFragment
      }
    `,
    bookingFragmentRef
  );

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <Stack flexDirection="row" alignItems="center">
            <WarningRoundedIcon /> {t('scenes.attendees.trips.tripScene.cancelBookingModal.title')}
          </Stack>
        </DialogTitle>
        <Divider />
        {booking && (
          <>
            <DialogContent>
              <Stack>
                <Box>
                  <Typography level="h4">
                    {booking.cancellationTerms}
                  </Typography>
                </Box>
                <Divider />
                <Box>
                   {t('scenes.attendees.trips.tripScene.cancelBookingModal.refundAmount')}:{" "}
                  {getCurrencyFormat(
                    booking.possibleRefundAmount?.cents,
                    booking.possibleRefundAmount?.currency?.name
                  )}
                </Box>
                <Box>
                  {t('scenes.attendees.trips.tripScene.cancelBookingModal.penaltyAmount')}:{" "}
                  {getCurrencyFormat(
                    booking.possiblePenaltyAmount?.cents,
                    booking.possiblePenaltyAmount?.currency?.name
                  )}
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions>
              <CancelBookingForm
                bookingFragmentRef={booking}
                onSuccess={onClose}
              />
              <Button variant="plain" color="neutral" onClick={() => onClose()}>
                {t('scenes.attendees.trips.tripScene.cancelBookingModal.close')}
              </Button>
            </DialogActions>
          </>
        )}
      </ModalDialog>
    </Modal>
  );
};

export default React.memo(CancelBookingModal);
